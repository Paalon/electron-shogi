import {
  Book,
  Position
} from "@/shogi";

describe("shogi/book", () => {
  it("Book", () => {
    const book = new Book();
    const position1 = Position.newBySFEN("lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1")!;
    const position2 = Position.newBySFEN("lnsgkgsnl/1r5b1/ppppppppp/9/9/7P1/PPPPPPP1P/1B5R1/LNSGKGSNL w - 2")!;
    const move1 = position1.createMoveBySFEN("2g2f")!;
    
    expect(book.graph.order).toBe(0);
    expect(book.graph.size).toBe(0);
    book.addPosition(position1);
    expect(book.graph.order).toBe(1);
    expect(book.graph.size).toBe(0);
    const book2 = book.copy();
    book.addPosition(position2);
    expect(book.graph.order).toBe(2);
    expect(book.graph.size).toBe(0);
    expect(book2.graph.order).toBe(1);
    book.addMove(position1, move1);
    expect(book.graph.order).toBe(2);
    expect(book.graph.size).toBe(1);
    
  });
});
