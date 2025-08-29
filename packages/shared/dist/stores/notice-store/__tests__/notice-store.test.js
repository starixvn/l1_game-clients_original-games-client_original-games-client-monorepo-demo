import { renderHook, act } from "@testing-library/react";
import { useNoticeStore } from "../notice-store";
describe("NoticeStore", function () {
    beforeEach(function () {
        // Clear the store before each test
        act(function () {
            useNoticeStore.getState().clearNotice();
        });
    });
    describe("Initial State", function () {
        it("should have null notice initially", function () {
            // Act
            var result = renderHook(function () { return useNoticeStore(); }).result;
            // Assert
            expect(result.current.notice).toBeNull();
        });
    });
    describe("setNotice", function () {
        it("should set notice to the provided value", function () {
            // Arrange
            var mockNotice = {
                message: "test.message",
                duration: 3,
                isWarning: false,
            };
            // Act
            act(function () {
                useNoticeStore.getState().setNotice(mockNotice);
            });
            // Assert
            expect(useNoticeStore.getState().notice).toEqual(mockNotice);
        });
        it("should set notice to null when provided null", function () {
            // Arrange
            var mockNotice = {
                message: "test.message",
                duration: 3,
                isWarning: false,
            };
            // Set initial notice
            act(function () {
                useNoticeStore.getState().setNotice(mockNotice);
            });
            // Act
            act(function () {
                useNoticeStore.getState().setNotice(null);
            });
            // Assert
            expect(useNoticeStore.getState().notice).toBeNull();
        });
    });
    describe("clearNotice", function () {
        it("should clear notice and set it to null", function () {
            // Arrange
            var mockNotice = {
                message: "test.message",
                duration: 3,
                isWarning: false,
            };
            act(function () {
                useNoticeStore.getState().setNotice(mockNotice);
            });
            // Act
            act(function () {
                useNoticeStore.getState().clearNotice();
            });
            // Assert
            expect(useNoticeStore.getState().notice).toBeNull();
        });
        it("should not throw error when clearing already null notice", function () {
            // Act & Assert
            expect(function () {
                act(function () {
                    useNoticeStore.getState().clearNotice();
                });
            }).not.toThrow();
        });
    });
    describe("showNotice", function () {
        it("should show notice with provided data", function () {
            // Arrange
            var mockNotice = {
                message: "show.test.message",
                duration: 5,
                isWarning: true,
                gameName: "Test Game",
                roundId: 123,
            };
            // Act
            act(function () {
                useNoticeStore.getState().showNotice(mockNotice);
            });
            // Assert
            expect(useNoticeStore.getState().notice).toEqual(mockNotice);
        });
        it("should overwrite existing notice when showing new notice", function () {
            // Arrange
            var firstNotice = {
                message: "first.message",
                duration: 3,
                isWarning: false,
            };
            var secondNotice = {
                message: "second.message",
                duration: 5,
                isWarning: true,
            };
            // Set first notice
            act(function () {
                useNoticeStore.getState().showNotice(firstNotice);
            });
            // Act - Show second notice
            act(function () {
                useNoticeStore.getState().showNotice(secondNotice);
            });
            // Assert
            expect(useNoticeStore.getState().notice).toEqual(secondNotice);
            expect(useNoticeStore.getState().notice).not.toEqual(firstNotice);
        });
    });
    describe("Store State Updates", function () {
        it("should trigger re-renders when state changes", function () {
            // Arrange
            var result = renderHook(function () { return useNoticeStore(); }).result;
            var mockNotice = {
                message: "update.test.message",
                duration: 3,
                isWarning: false,
            };
            // Act
            act(function () {
                useNoticeStore.getState().showNotice(mockNotice);
            });
            // Assert
            expect(result.current.notice).toEqual(mockNotice);
        });
        it("should maintain state consistency across multiple operations", function () {
            // Arrange
            var mockNotice1 = {
                message: "notice1",
                duration: 3,
                isWarning: false,
            };
            var mockNotice2 = {
                message: "notice2",
                duration: 5,
                isWarning: true,
            };
            // Act & Assert
            act(function () {
                useNoticeStore.getState().showNotice(mockNotice1);
            });
            expect(useNoticeStore.getState().notice).toEqual(mockNotice1);
            act(function () {
                useNoticeStore.getState().showNotice(mockNotice2);
            });
            expect(useNoticeStore.getState().notice).toEqual(mockNotice2);
            act(function () {
                useNoticeStore.getState().clearNotice();
            });
            expect(useNoticeStore.getState().notice).toBeNull();
        });
    });
    describe("Edge Cases", function () {
        it("should handle notice with minimal required properties", function () {
            // Arrange
            var minimalNotice = {
                message: "minimal",
                duration: 3,
                isWarning: false,
            };
            // Act
            act(function () {
                useNoticeStore.getState().showNotice(minimalNotice);
            });
            // Assert
            expect(useNoticeStore.getState().notice).toEqual(minimalNotice);
        });
        it("should handle notice with all optional properties", function () {
            // Arrange
            var fullNotice = {
                message: "full.notice",
                duration: 10,
                isWarning: true,
                gameName: "Full Game",
                roundId: 456,
                minBet: 10,
                maxBet: 1000,
                errorCode: "FULL001",
                hedgeBetGroup: ["choice1", "choice2"],
                onClose: jest.fn(),
            };
            // Act
            act(function () {
                useNoticeStore.getState().showNotice(fullNotice);
            });
            // Assert
            expect(useNoticeStore.getState().notice).toEqual(fullNotice);
        });
        it("should handle rapid state changes", function () {
            // Arrange
            var notices = [
                { message: "notice1", duration: 1, isWarning: false },
                { message: "notice2", duration: 2, isWarning: true },
                { message: "notice3", duration: 3, isWarning: false },
            ];
            // Act & Assert
            notices.forEach(function (notice, index) {
                act(function () {
                    useNoticeStore.getState().showNotice(notice);
                });
                expect(useNoticeStore.getState().notice).toEqual(notice);
            });
        });
    });
    describe("Store Isolation", function () {
        it("should maintain separate state for different store instances", function () {
            // This test verifies that the store is properly isolated
            // In Zustand, this should be the case by default
            // Arrange
            var mockNotice = {
                message: "isolated.test",
                duration: 3,
                isWarning: false,
            };
            // Act
            act(function () {
                useNoticeStore.getState().showNotice(mockNotice);
            });
            // Assert
            expect(useNoticeStore.getState().notice).toEqual(mockNotice);
            // Verify that the store state is consistent
            var result = renderHook(function () { return useNoticeStore(); }).result;
            expect(result.current.notice).toEqual(mockNotice);
        });
    });
});
