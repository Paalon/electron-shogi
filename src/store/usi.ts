import { ImmutablePosition, Move, Position } from "@/shogi";

export enum USIInfoSender {
  BLACK_PLAYER = "blackPlayer",
  WHITE_PLAYER = "whitePlayer",
  RESEARCHER = "researcher",
}

export function stringifyUSIInfoSender(sender: USIInfoSender): string {
  switch (sender) {
    case USIInfoSender.BLACK_PLAYER:
      return "先手";
    case USIInfoSender.WHITE_PLAYER:
      return "後手";
    case USIInfoSender.RESEARCHER:
      return "検討";
  }
}

export type InfoCommand = {
  depth?: number;
  seldepth?: number;
  timeMs?: number;
  nodes?: number;
  pv?: string[];
  multipv?: number;
  scoreCP?: number;
  scoreMate?: number;
  lowerbound?: boolean;
  upperbound?: boolean;
  currmove?: string;
  hashfullPerMill?: number;
  nps?: number;
  string?: string;
};

export type USIIteration = {
  position: string;
  depth?: number;
  selectiveDepth?: number;
  timeMs?: number;
  score?: number;
  scoreMate?: number;
  lowerBound?: boolean;
  upperBound?: boolean;
  multiPV?: number;
  pv?: string[];
  text?: string;
};

function formatPV(position: ImmutablePosition, pv: string[]): string {
  const p = position.clone();
  let prev: Move | undefined;
  let result = "";
  for (const sfen of pv) {
    const move = p.createMoveBySFEN(sfen);
    if (!move) {
      break;
    }
    p.doMove(move, {
      ignoreValidation: true,
    });
    result += move.getDisplayText(prev);
    prev = move;
  }
  return result;
}

export class USIPlayerMonitor {
  public nodes?: number;
  public nps?: number;
  public iterates: USIIteration[];
  public hashfull?: number;
  public currentMove?: string;
  public currentMoveText?: string;

  constructor(
    public sessionID: number,
    public name: string,
    public sfen: string
  ) {
    this.iterates = [];
  }

  update(sfen: string, update: InfoCommand): void {
    const position = Position.newBySFEN(sfen);
    const iterate: USIIteration = {
      position: sfen,
    };
    if (update.depth !== undefined) {
      iterate.depth = update.depth;
    }
    if (update.seldepth !== undefined) {
      iterate.selectiveDepth = update.seldepth;
    }
    if (update.timeMs !== undefined) {
      iterate.timeMs = update.timeMs;
    }
    if (update.nodes !== undefined) {
      this.nodes = update.nodes;
    }
    if (update.pv) {
      iterate.pv = update.pv;
      iterate.text = position ? formatPV(position, update.pv) : "";
    }
    if (update.multipv !== undefined) {
      iterate.multiPV = update.multipv;
    }
    if (update.scoreCP !== undefined) {
      iterate.score = update.scoreCP;
    }
    if (update.scoreMate !== undefined) {
      iterate.scoreMate = update.scoreMate;
    }
    if (update.lowerbound !== undefined) {
      iterate.lowerBound = update.lowerbound;
    }
    if (update.upperbound !== undefined) {
      iterate.upperBound = update.upperbound;
    }
    if (update.currmove !== undefined) {
      this.currentMove = update.currmove;
      const move = position && position.createMoveBySFEN(update.currmove);
      if (move) {
        this.currentMoveText = move.getDisplayText();
      }
    }
    if (update.hashfullPerMill !== undefined) {
      this.hashfull = update.hashfullPerMill / 1000;
    }
    if (update.nps !== undefined) {
      this.nps = update.nps;
    }
    if (update.string) {
      iterate.text = update.string;
    }
    if (Object.keys(iterate).length !== 0) {
      this.iterates.unshift(iterate);
    }
  }
}

type USIUpdate = {
  sessionID: number;
  sfen: string;
  sender: USIInfoSender;
  name: string;
  info: InfoCommand;
};

export class USIMonitor {
  private _blackPlayer?: USIPlayerMonitor;
  private _whitePlayer?: USIPlayerMonitor;
  private _researcher?: USIPlayerMonitor;
  private updateQueue: USIUpdate[];
  private timeoutHandle?: number;

  constructor() {
    this.updateQueue = [];
  }

  get blackPlayer(): USIPlayerMonitor | undefined {
    return this._blackPlayer;
  }

  get whitePlayer(): USIPlayerMonitor | undefined {
    return this._whitePlayer;
  }

  get researcher(): USIPlayerMonitor | undefined {
    return this._researcher;
  }

  update(
    sessionID: number,
    position: ImmutablePosition,
    sender: USIInfoSender,
    name: string,
    info: InfoCommand
  ): void {
    this.updateQueue.push({
      sessionID: sessionID,
      sfen: position.sfen,
      sender: sender,
      name: name,
      info: info,
    });
    if (!this.timeoutHandle) {
      this.timeoutHandle = window.setTimeout(() => {
        this.dequeue();
      }, 100);
    }
  }

  private dequeue() {
    for (const update of this.updateQueue) {
      this._update(update);
    }
    this.updateQueue = [];
    this.timeoutHandle = undefined;
  }

  private _update(update: USIUpdate) {
    switch (update.sender) {
      case USIInfoSender.BLACK_PLAYER:
        if (
          !this._blackPlayer ||
          this._blackPlayer.sessionID !== update.sessionID ||
          this._blackPlayer.sfen !== update.sfen
        ) {
          this._blackPlayer = new USIPlayerMonitor(
            update.sessionID,
            update.name,
            update.sfen
          );
        }
        this._blackPlayer.update(update.sfen, update.info);
        this._researcher = undefined;
        break;
      case USIInfoSender.WHITE_PLAYER:
        if (
          !this._whitePlayer ||
          this._whitePlayer.sessionID !== update.sessionID ||
          this._whitePlayer.sfen !== update.sfen
        ) {
          this._whitePlayer = new USIPlayerMonitor(
            update.sessionID,
            update.name,
            update.sfen
          );
        }
        this._whitePlayer.update(update.sfen, update.info);
        this._researcher = undefined;
        break;
      case USIInfoSender.RESEARCHER:
        if (
          !this._researcher ||
          this._researcher.sessionID !== update.sessionID ||
          this._researcher.sfen !== update.sfen
        ) {
          this._researcher = new USIPlayerMonitor(
            update.sessionID,
            update.name,
            update.sfen
          );
        }
        this._researcher.update(update.sfen, update.info);
        this._blackPlayer = undefined;
        this._whitePlayer = undefined;
        break;
    }
  }
}
