import React from "react";
import { render } from "@testing-library/react";
import BaccaratBettingBlock from "../betting-block/baccarat-betting-block";

jest.mock("@shared/react-contexts", () => ({
    useGameContext: () => ({ tolgeeNamespace: "Baccarat" }),
}));

describe("BaccaratBetOptions_layout_should_render", () => {
    it("BaccaratBettingBlock_basicRender_shouldWork", () => {
        const { container } = render(<BaccaratBettingBlock />);
        expect(container).toBeTruthy();
    });
});


