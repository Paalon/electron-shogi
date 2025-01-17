import { shallowMount } from "@vue/test-utils";
import BoardView from "@/renderer/view/primitive/BoardView.vue";
import { Position } from "@/common/shogi";
import { RectSize } from "@/common/graphics";
import {
  BoardImageType,
  BoardLabelType,
  KingPieceType,
  PieceStandImageType,
} from "@/common/settings/app";

describe("BoardView", () => {
  it("hitomoji", () => {
    const position = new Position();
    const wrapper = shallowMount(BoardView, {
      props: {
        boardImageType: BoardImageType.LIGHT,
        pieceStandImageType: PieceStandImageType.STANDARD,
        pieceImageBaseUrl: "./piece/hitomoji",
        kingPieceType: KingPieceType.GYOKU_AND_OSHO,
        boardLabelType: BoardLabelType.STANDARD,
        maxSize: new RectSize(800, 600),
        position,
      },
    });
    const imgs = wrapper.findAll("img");
    expect(
      imgs.filter((img) => img.attributes()["src"] === "./board/wood_light.png")
    ).toHaveLength(1);
    expect(
      imgs.filter(
        (img) => img.attributes()["src"] === "./piece/hitomoji/white_bishop.png"
      )
    ).toHaveLength(1);
    expect(
      imgs.filter(
        (img) => img.attributes()["src"] === "./piece/hitomoji/black_rook.png"
      )
    ).toHaveLength(1);
    expect(
      imgs.filter(
        (img) => img.attributes()["src"] === "./piece/hitomoji/black_gold.png"
      )
    ).toHaveLength(2);
    expect(
      imgs.filter(
        (img) =>
          img.attributes()["src"] === "./piece/hitomoji_gothic/black_gold.png"
      )
    ).toHaveLength(0);
  });
});
