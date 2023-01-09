import Graph from "graphology";
import { Position } from "./position";
import { Move, parseUSIMove } from "./move";

/**
 * SFEN から手数を消した文字列を返す。
 */
function removePly(sfen: string) {
  return sfen.split(" ").slice(0, 4).join(" ");
}

/**
 * 定跡を表すクラス
 */
export class Book {
  // SFEN の手数抜きを graphology の Graph のノードの id として使用する。
  public graph = new Graph({
    multi: false,
    allowSelfLoops: false,
    type: "directed",
  });

  /**
   * 局面を追加する。
   */
  addPosition(position: Position) {
    this.addPositionByUSI(position.sfen);
  }

  /**
   * SFEN から局面を追加する。
   */
  addPositionByUSI(sfen: string) {
    this.graph.mergeNode(removePly(sfen));
  }

  /**
   * 局面を削除する。
   */
  removePosition(position: Position) {
    this.removePositionByUSI(position.sfen);
  }

  /**
   * SFEN で指定された局面とその局面に接続する指し手を削除する。
   */
  removePositionByUSI(sfen: string) {
    this.graph.dropNode(removePly(sfen));
  }

  /**
   * 指し手を追加する。
   */
  addMove(position: Position, move: Move) {
    const position0 = position;
    const sfen0 = position0.sfen;
    const position1 = position.clone();
    position1.doMove(move, { ignoreValidation: false });
    const sfen1 = position1.sfen;
    this.graph.mergeEdge(removePly(sfen0), removePly(sfen1), {
      usiMove: move.usi,
    });
  }

  /**
   * USI 形式で指定された局面と指し手から指し手を追加する。
   */
  addMoveByUSI(sfen: string, usiMove: string) {
    const sfen0 = sfen;
    const position0 = Position.newBySFEN(sfen);
    if (position0 === null) {
      throw "error";
    }
    const position1 = position0.clone();
    const parsed = parseUSIMove(usiMove);
    if (parsed === null) {
      throw "error";
    }
    const move = position0.createMove(parsed.from, parsed.to);
    if (move === null) {
      throw "error";
    }
    position1.doMove(move);
    const sfen1 = position1.sfen;
    this.graph.mergeEdge(removePly(sfen0), removePly(sfen1), {
      usiMove: usiMove,
    });
  }

  /**
   * 指し手を削除する。
   */
  removeMove(position: Position, move: Move) {
    const position0 = position;
    const sfen0 = position0.sfen;
    const position1 = position.clone();
    position1.doMove(move, { ignoreValidation: false });
    const sfen1 = position1.sfen;
    this.graph.dropEdge(removePly(sfen0), removePly(sfen1));
  }

  /**
   * 複製する。
   */
  clone(): Book {
    const book = new Book();
    book.graph = this.graph.copy();
    return book;
  }

  /**
   * ノード数を返す。
   */
  get numberOfNodes(): number {
    return this.getNumberOfNodes();
  }

  getNumberOfNodes(): number {
    return this.graph.order;
  }

  /**
   * エッジ数を返す。
   */
  get numberOfEdges(): number {
    return this.getNumberOfEdges();
  }

  getNumberOfEdges(): number {
    return this.graph.size;
  }
}
