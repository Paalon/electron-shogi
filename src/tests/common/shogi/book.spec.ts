import { Book, Position, Move } from "@/shogi";

describe("shogi/book", () => {
  it("Book", () => {
    const book = new Book();
    const position1 = Position.newBySFEN(
      "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1"
    ) as Position;
    const position2 = Position.newBySFEN(
      "lnsgkgsnl/1r5b1/ppppppppp/9/9/7P1/PPPPPPP1P/1B5R1/LNSGKGSNL w - 2"
    ) as Position;
    const move1 = position1.createMoveByUSI("2g2f") as Move;

    expect(book.numberOfNodes).toBe(0);
    expect(book.numberOfEdges).toBe(0);
    book.addPosition(position1);
    expect(book.numberOfNodes).toBe(1);
    expect(book.numberOfEdges).toBe(0);
    book.addMove(position1, move1);
    expect(book.numberOfNodes).toBe(2);
    expect(book.numberOfEdges).toBe(1);
    book.removePosition(position2);
    expect(book.numberOfNodes).toBe(1);
    expect(book.numberOfEdges).toBe(0);
  });
});
