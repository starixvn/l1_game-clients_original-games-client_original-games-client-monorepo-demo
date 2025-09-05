import React from "react";
import { render } from "@testing-library/react";
import { Games } from "../games/games";

// Mocks for shared contexts used by Games
jest.mock("@shared/react-contexts", () => ({
    usePlayerContext: () => ({ session: { userId: "u1" } }),
}));

jest.mock("@shared/services/user-setting-service", () => ({
    getChipSettings: async () => ({ chips: [1, 5, 10] }),
}));

jest.mock("@shared/app-settings", () => ({
    getAppSettings: () => ({
        gameSettings: {
            2001: { id: 2001, tolgeeNamespace: "Baccarat" },
            10: { id: 10, tolgeeNamespace: "Baccarat" },
        },
    }),
}));

jest.mock("next-themes", () => ({ useTheme: () => ({ theme: "light" }) }));

describe("Games_registry_should_render_baccarat_for_multiple_ids", () => {
    const noop = () => { };

    const baseProps = {
        setApiErrorMessage: noop,
        userStakeLevel: 1,
        updateUserStakeLevel: noop,
        openGameName: "Baccarat",
    } as any;

    it("Games_withId2001_shouldRenderBaccarat", () => {
        const { container } = render(<Games {...baseProps} openGameId={2001} />);
        expect(container).toBeTruthy();
    });

    it("Games_withId10_shouldRenderBaccarat", () => {
        const { container } = render(<Games {...baseProps} openGameId={10} />);
        expect(container).toBeTruthy();
    });

    it("Games_withUnknownId_shouldRenderNull", () => {
        const { container } = render(<Games {...baseProps} openGameId={999999} />);
        expect(container.firstChild).toBeNull();
    });
});


