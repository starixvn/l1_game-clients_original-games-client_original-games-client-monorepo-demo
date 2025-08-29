import { RoundState } from "../../../components/game-base/type";
import { isHighLightWinningResult, isShowHighlightPrevResult } from "../use-high-light";
describe("use-high-light", function () {
    describe("isHighLightWinningResult", function () {
        it("should return true when all conditions are met for highlighting winning result", function () {
            // Arrange
            var props = {
                betChoice: "player",
                roundState: RoundState.DisplayResult,
                showResultInfo: true,
                settlementResult: {
                    banker: false,
                    player: true,
                },
            };
            // Act
            var result = isHighLightWinningResult(props);
            // Assert
            expect(result).toBe(true);
        });
        it("should return false when round state is not DisplayResult", function () {
            // Arrange
            var props = {
                betChoice: "player",
                roundState: RoundState.InRound,
                showResultInfo: true,
                settlementResult: {
                    player: true,
                },
            };
            // Act
            var result = isHighLightWinningResult(props);
            // Assert
            expect(result).toBe(false);
        });
        it("should return false when showResultInfo is false", function () {
            // Arrange
            var props = {
                betChoice: "player",
                roundState: RoundState.DisplayResult,
                showResultInfo: false,
                settlementResult: {
                    player: true,
                },
            };
            // Act
            var result = isHighLightWinningResult(props);
            // Assert
            expect(result).toBe(false);
        });
        it("should return false when settlementResult for betChoice is false", function () {
            // Arrange
            var props = {
                betChoice: "player",
                roundState: RoundState.DisplayResult,
                showResultInfo: true,
                settlementResult: {
                    player: false,
                },
            };
            // Act
            var result = isHighLightWinningResult(props);
            // Assert
            expect(result).toBe(false);
        });
    });
    describe("isShowHighlightPrevResult", function () {
        it("should return true when previous round exists and was won", function () {
            // Arrange
            var props = {
                betChoice: "player",
                roundState: RoundState.SwitchRound,
                roundHistory: [
                    {
                        settlementResult: {
                            player: true,
                        },
                    },
                ],
            };
            // Act
            var result = isShowHighlightPrevResult(props);
            // Assert
            expect(result).toBe(true);
        });
        it("should return false when round history is empty", function () {
            // Arrange
            var props = {
                betChoice: "player",
                roundState: RoundState.InRound,
                roundHistory: [],
            };
            // Act
            var result = isShowHighlightPrevResult(props);
            // Assert
            expect(result).toBe(false);
        });
        it("should return false when round state is not valid", function () {
            // Arrange
            var props = {
                betChoice: "player",
                roundState: RoundState.DisplayResult,
                roundHistory: [
                    {
                        settlementResult: {
                            player: true,
                        },
                    },
                ],
            };
            // Act
            var result = isShowHighlightPrevResult(props);
            // Assert
            expect(result).toBe(false);
        });
        it("should return false when previous round was lost", function () {
            // Arrange
            var props = {
                betChoice: "player",
                roundState: RoundState.InRound,
                roundHistory: [
                    {
                        settlementResult: {
                            player: false,
                        },
                    },
                ],
            };
            // Act
            var result = isShowHighlightPrevResult(props);
            // Assert
            expect(result).toBe(false);
        });
    });
});
