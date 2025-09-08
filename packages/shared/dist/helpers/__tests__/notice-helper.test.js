import { GetLocalizedErrorMessage, broadcastNotice, createNoticeFromErrorCode } from "../notice-helper";
import { useNoticeStore } from '@shared/stores/notice-store/notice-store";
// Mock the notice store
jest.mock("../../stores/notice-store/notice-store", function () { return ({
    useNoticeStore: {
        getState: jest.fn(),
    },
}); });
describe("NoticeHelper", function () {
    var mockGetState = useNoticeStore.getState;
    var mockShowNotice = jest.fn();
    var mockClearNotice = jest.fn();
    beforeEach(function () {
        jest.clearAllMocks();
        mockGetState.mockReturnValue({
            showNotice: mockShowNotice,
            clearNotice: mockClearNotice,
            notice: null,
            setNotice: jest.fn(),
        });
    });
    describe("GetLocalizedErrorMessage", function () {
        it("should return error message for known error code", function () {
            // Arrange
            var errorCode = "SB1907";
            // Act
            var result = GetLocalizedErrorMessage(errorCode);
            // Assert
            expect(result).toBeDefined();
            expect(typeof result).toBe("string");
        });
        it("should return default error message for unknown error code", function () {
            // Arrange
            var errorCode = "UNKNOWN_ERROR_CODE";
            // Act
            var result = GetLocalizedErrorMessage(errorCode);
            // Assert
            expect(result).toBe("Common.message_error_occurred");
        });
        it("should return place bet failed message when isPlaceBet is true", function () {
            // Arrange
            var errorCode = "UNKNOWN_ERROR_CODE";
            // Act
            var result = GetLocalizedErrorMessage(errorCode, true);
            // Assert
            expect(result).toBe("Common.message_placebet_failed");
        });
        it("should return default error message when isPlaceBet is false", function () {
            // Arrange
            var errorCode = "UNKNOWN_ERROR_CODE";
            // Act
            var result = GetLocalizedErrorMessage(errorCode, false);
            // Assert
            expect(result).toBe("Common.message_error_occurred");
        });
    });
    describe("broadcastNotice", function () {
        it("should call showNotice when notice is provided", function () {
            // Arrange
            var mockNotice = {
                message: "test.message",
                duration: 3,
                isWarning: false,
            };
            // Act
            broadcastNotice(mockNotice);
            // Assert
            expect(mockShowNotice).toHaveBeenCalledWith(mockNotice);
        });
        it("should call clearNotice when notice is null", function () {
            // Act
            broadcastNotice(null);
            // Assert
            expect(mockClearNotice).toHaveBeenCalled();
        });
        it("should call clearNotice when notice is undefined", function () {
            // Act
            broadcastNotice(undefined);
            // Assert
            expect(mockClearNotice).toHaveBeenCalled();
        });
        it("should handle notice with all properties", function () {
            // Arrange
            var mockNotice = {
                message: "full.notice",
                duration: 10,
                isWarning: true,
                gameName: "Test Game",
                roundId: 123,
                minBet: 10,
                maxBet: 1000,
                errorCode: "TEST001",
                hedgeBetGroup: ["choice1", "choice2"],
                onClose: jest.fn(),
            };
            // Act
            broadcastNotice(mockNotice);
            // Assert
            expect(mockShowNotice).toHaveBeenCalledWith(mockNotice);
        });
    });
    describe("createNoticeFromErrorCode", function () {
        it("should create notice with basic properties", function () {
            // Arrange
            var errorCode = "TEST001";
            var gameName = "Test Game";
            var roundId = 123;
            // Act
            var result = createNoticeFromErrorCode(errorCode, { gameName: gameName, roundId: roundId });
            // Assert
            expect(result).toEqual({
                message: expect.any(String),
                duration: 3,
                isWarning: false,
                gameName: "Test Game",
                roundId: 123,
                errorCode: "TEST001",
                minBet: undefined,
                maxBet: undefined,
                onClose: undefined,
                hedgeBetGroup: undefined,
                adjustBetNoticePosition: false,
            });
        });
        it("should create notice with custom duration", function () {
            // Arrange
            var errorCode = "TEST002";
            var gameName = "Test Game";
            var roundId = 456;
            var duration = 5;
            // Act
            var result = createNoticeFromErrorCode(errorCode, { gameName: gameName, roundId: roundId, duration: duration });
            // Assert
            expect(result.duration).toBe(5);
        });
        it("should create notice with bet limits", function () {
            // Arrange
            var errorCode = "TEST003";
            var gameName = "Test Game";
            var roundId = 789;
            var minBet = 10;
            var maxBet = 1000;
            // Act
            var result = createNoticeFromErrorCode(errorCode, { gameName: gameName, roundId: roundId, minBet: minBet, maxBet: maxBet });
            // Assert
            expect(result.minBet).toBe(10);
            expect(result.maxBet).toBe(1000);
        });
        it("should create notice with onClose callback", function () {
            // Arrange
            var errorCode = "TEST004";
            var gameName = "Test Game";
            var roundId = 101;
            var onClose = jest.fn();
            // Act
            var result = createNoticeFromErrorCode(errorCode, { gameName: gameName, roundId: roundId, onClose: onClose });
            // Assert
            expect(result.onClose).toBe(onClose);
        });
        it("should create notice with hedge bet group", function () {
            // Arrange
            var errorCode = "TEST005";
            var gameName = "Test Game";
            var roundId = 202;
            var hedgeBetGroup = ["player", "banker"];
            // Act
            var result = createNoticeFromErrorCode(errorCode, { gameName: gameName, roundId: roundId, hedgeBetGroup: hedgeBetGroup });
            // Assert
            expect(result.hedgeBetGroup).toEqual(["player", "banker"]);
        });
        it("should create warning notice when isWarning is true", function () {
            // Arrange
            var errorCode = "TEST006";
            var gameName = "Test Game";
            var roundId = 303;
            // Act
            var result = createNoticeFromErrorCode(errorCode, { gameName: gameName, roundId: roundId, isWarning: true });
            // Assert
            expect(result.isWarning).toBe(true);
        });
        it("should create error notice when isWarning is false", function () {
            // Arrange
            var errorCode = "TEST007";
            var gameName = "Test Game";
            var roundId = 404;
            // Act
            var result = createNoticeFromErrorCode(errorCode, { gameName: gameName, roundId: roundId, isWarning: false });
            // Assert
            expect(result.isWarning).toBe(false);
        });
        it("should handle undefined parameters gracefully", function () {
            // Arrange
            var errorCode = "TEST008";
            // Act
            var result = createNoticeFromErrorCode(errorCode);
            // Assert
            expect(result).toEqual({
                message: expect.any(String),
                duration: 3,
                isWarning: false,
                gameName: undefined,
                roundId: undefined,
                errorCode: "TEST008",
                minBet: undefined,
                maxBet: undefined,
                onClose: undefined,
                hedgeBetGroup: undefined,
                adjustBetNoticePosition: false,
            });
        });
        it("should handle empty string parameters", function () {
            // Arrange
            var errorCode = "";
            var gameName = "";
            // Act
            var result = createNoticeFromErrorCode(errorCode, { gameName: gameName });
            // Assert
            expect(result).toEqual({
                message: expect.any(String),
                duration: 3,
                isWarning: false,
                gameName: "",
                roundId: undefined,
                errorCode: "",
                minBet: undefined,
                maxBet: undefined,
                onClose: undefined,
                hedgeBetGroup: undefined,
                adjustBetNoticePosition: false,
            });
        });
    });
    describe("Integration Tests", function () {
        it("should work together with broadcastNotice and createNoticeFromErrorCode", function () {
            // Arrange
            var errorCode = "INTEGRATION_TEST";
            var gameName = "Integration Game";
            var roundId = 999;
            // Act
            var notice = createNoticeFromErrorCode(errorCode, { gameName: gameName, roundId: roundId });
            broadcastNotice(notice);
            // Assert
            expect(mockShowNotice).toHaveBeenCalledWith(notice);
            expect(notice.errorCode).toBe("INTEGRATION_TEST");
            expect(notice.gameName).toBe("Integration Game");
            expect(notice.roundId).toBe(999);
        });
        it("should handle error message localization with notice creation", function () {
            // Arrange
            var errorCode = "LOCALIZATION_TEST";
            // Act
            var localizedMessage = GetLocalizedErrorMessage(errorCode);
            var notice = createNoticeFromErrorCode(errorCode, { gameName: "Test Game", roundId: 123 });
            broadcastNotice(notice);
            // Assert
            expect(mockShowNotice).toHaveBeenCalledWith(notice);
            expect(notice.errorCode).toBe("LOCALIZATION_TEST");
        });
    });
});
