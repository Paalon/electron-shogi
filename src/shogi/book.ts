import Graph from "graphology";
import { Position } from "./position";
import { Move, parseUSIMove } from "./move";

/**
 * 定跡を表すクラス
 */
export class Book {
  // SFEN をノードの ID として使用する。
  public graph = new Graph({
    multi: false,
    allowSelfLoops: false,
    type: "directed",
  });
  // constructor() {}

  /**
   * SFEN から局面を追加する。
   */
  addPositionBySFEN(sfen: string) {
    this.graph.addNode(sfen);
  }
  
  /**
   * SFEN で指定された局面とその局面に接続する指し手を削除する。
   */
  removePositionBySFEN(sfen: string) {
    this.graph.dropNode(sfen);
  }
  
  /**
   * 局面を追加する。
   * 既に同じ局面が存在するときは何もしない。
   */
  addPosition(position: Position) {
    const sfen = position.sfen;
    this.addPositionBySFEN(sfen);
  }
  
  /**
   * 局面を削除する。
   */
  removePosition(position: Position) {
    const sfen = position.sfen;
    this.removePositionBySFEN(sfen);
  }

  /**
   * USI 形式で指定された局面と指し手から指し手を追加する。
   */
  addMoveByUSI(sfenString: string, usiMoveString: string) {
    const sourceSfen = sfenString;
    const position = Position.newBySFEN(sourceSfen);
    if (position === null) {
      return false;
    }
    const parsed = parseUSIMove(usiMoveString);
    if (parsed === null) {
      return false;
    }
    const move = position.createMove(parsed.from, parsed.to);
    if (move === null) {
      return false;
    }
    this.addMove(position, move);
    return true;
  }

  /**
   * 指し手を追加する。
   */
  addMove(position: Position, move: Move) {
    const sourceSfen = position.sfen;
    const targetPosition = position.clone();
    targetPosition.doMove(move, { ignoreValidation: false });
    const targetSfen = targetPosition.sfen;
    this.graph.addEdge(sourceSfen, targetSfen, { usi: move.usi, weight: 1 });
  }

  /**
   * 指し手を削除する。
   */
  removeMove(position: Position, move: Move) {
    const sourceSfen = position.sfen;
    const targetPosition = position.clone();
    targetPosition.doMove(move, { ignoreValidation: false });
    const targetSfen = targetPosition.sfen;
    this.graph.dropEdge(sourceSfen, targetSfen);
  }

  /**
   * 複製する。
   */
  copy(): Book {
    const book = new Book();
    book.graph = this.graph.copy();
    return book;
  }

}
