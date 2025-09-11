import {
    SeDieBetOptions,
    SeDieChoices,
    mainChoices,
    topChoices,
    bottomChoices,
    SeDieStatisticColors,
    SeDieBetOptionsPercentageColor,
} from "../sedie-multiplayer-constants";

describe("SeDie Constants", () => {
    test("SeDieBetOptions should contain expected bet options", () => {
        expect(SeDieBetOptions.ODD).toBe("odd");
        expect(SeDieBetOptions.EVEN).toBe("even");
        expect(SeDieBetOptions.RED2).toBe("red2");
        expect(SeDieBetOptions.RED3).toBe("red3");
        expect(SeDieBetOptions.RED4).toBe("red4");
        expect(SeDieBetOptions.WHITE3).toBe("white3");
        expect(SeDieBetOptions.WHITE4).toBe("white4");
    });

    test("SeDieChoices should contain expected choices", () => {
        expect(SeDieChoices.odd).toBe("odd");
        expect(SeDieChoices.even).toBe("even");
        expect(SeDieChoices.red2).toBe("red2");
        expect(SeDieChoices.red3).toBe("red3");
        expect(SeDieChoices.red4).toBe("red4");
        expect(SeDieChoices.white3).toBe("white3");
        expect(SeDieChoices.white4).toBe("white4");
    });

    test("mainChoices should contain odd and even", () => {
        expect(mainChoices).toEqual(["even", "odd"]);
    });

    test("topChoices should contain red4, red3, red2", () => {
        expect(topChoices).toEqual(["red4", "red3", "red2"]);
    });

    test("bottomChoices should contain white4 and white3", () => {
        expect(bottomChoices).toEqual(["white4", "white3"]);
    });

    test("SeDieStatisticColors should have correct colors", () => {
        expect(SeDieStatisticColors.even).toBe("#1E5AEF");
        expect(SeDieStatisticColors.odd).toBe("#D5102B");
    });

    test("SeDieBetOptionsPercentageColor should have correct colors", () => {
        expect(SeDieBetOptionsPercentageColor.odd).toBe("#84C6FF");
        expect(SeDieBetOptionsPercentageColor.even).toBe("#FF9090");
    });
});
