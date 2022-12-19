import Graph from "graphology";
import { Position } from "./position";
import { Move, parseUSIMove } from "./move";

export class Book {
  public graph = new Graph({
    multi: false,
    allowSelfLoops: false,
    type: "directed"
  });
  constructor() {}
  addPositionBySFEN(sfen: string) {
    this.graph.addNode(sfen);
  };
  removePositionBySFEN(sfen: string) {
    this.graph.dropNode(sfen);
  }
  addPosition(position: Position) {
    const sfen = position.sfen;
    this.addPositionBySFEN(sfen);
  }
  removePosition(position: Position) {
    const sfen = position.sfen;
    this.removePositionBySFEN(sfen);
  }
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
  addMove(position: Position, move: Move) {
    const sourceSfen = position.sfen;
    const targetPosition = position.clone();
    targetPosition.doMove(move, {ignoreValidation: false});
    const targetSfen = targetPosition.sfen;
    this.graph.addEdge(sourceSfen, targetSfen, {move: move.usi, weight: 1});
  }
  removeMove(position: Position, move: Move) {
    const sourceSfen = position.sfen;
    const targetPosition = position.clone();
    targetPosition.doMove(move, { ignoreValidation: false });
    const targetSfen = targetPosition.sfen;
    this.graph.dropEdge(sourceSfen, targetSfen);
  }
  copy(): Book {
    const book = new Book()
    book.graph = this.graph.copy();
    return book;
  }
}
