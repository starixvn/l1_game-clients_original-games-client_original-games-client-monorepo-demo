var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useMemoriedImage } from "../use-memoried-image";
import { downloadAndCacheImage, imageCache } from "../../helpers/image-cache-controller";
import { act, waitFor, renderHook } from "@testing-library/react";
// Mock the image cache controller
jest.mock("../../helpers/image-cache-controller");
var mockedDownloadAndCacheImage = downloadAndCacheImage;
describe("useMemoriedImage", function () {
    beforeEach(function () {
        jest.clearAllMocks();
        // Clear the imageCache
        Object.keys(imageCache).forEach(function (key) { return delete imageCache[key]; });
    });
    test("should handle successful image loading", function () { return __awaiter(void 0, void 0, void 0, function () {
        var imagePath, expectedBase64, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imagePath = "https://example.com/test-image.jpg";
                    expectedBase64 = "base64EncodedImageData";
                    mockedDownloadAndCacheImage.mockResolvedValueOnce({
                        imageBase64: expectedBase64,
                        valid: true,
                        path: imagePath,
                    });
                    result = renderHook(function () { return useMemoriedImage(imagePath); }).result;
                    // Assert initial state
                    expect(result.current.isLoading).toBe(true);
                    expect(result.current.data).toBe(null);
                    expect(result.current.error).toBeNull();
                    // Wait for the async operation to complete with timeout
                    return [4 /*yield*/, waitFor(function () {
                            expect(result.current.isLoading).toBe(false);
                        }, { timeout: 3000 })];
                case 1:
                    // Wait for the async operation to complete with timeout
                    _a.sent();
                    // Assert final state
                    expect(result.current.data).toBe(expectedBase64);
                    expect(result.current.error).toBeNull();
                    expect(mockedDownloadAndCacheImage).toHaveBeenCalledWith(imagePath);
                    return [2 /*return*/];
            }
        });
    }); });
    test("should handle invalid image response", function () { return __awaiter(void 0, void 0, void 0, function () {
        var imagePath, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imagePath = "https://example.com/invalid-image.jpg";
                    mockedDownloadAndCacheImage.mockResolvedValueOnce({
                        imageBase64: "",
                        valid: false,
                        path: imagePath,
                    });
                    result = renderHook(function () { return useMemoriedImage(imagePath); }).result;
                    // Assert initial state
                    expect(result.current.isLoading).toBe(true);
                    expect(result.current.data).toBe(null);
                    expect(result.current.error).toBeNull();
                    // Wait for the async operation to complete with timeout
                    return [4 /*yield*/, waitFor(function () {
                            expect(result.current.isLoading).toBe(false);
                        }, { timeout: 3000 })];
                case 1:
                    // Wait for the async operation to complete with timeout
                    _a.sent();
                    // Assert final state
                    expect(result.current.data).toBe(null);
                    expect(result.current.error).toBeInstanceOf(Error);
                    expect(result.current.error.message).toBe("Network response was not ok");
                    return [2 /*return*/];
            }
        });
    }); });
    test("should handle network error", function () { return __awaiter(void 0, void 0, void 0, function () {
        var imagePath, expectedError, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imagePath = "https://example.com/error-image.jpg";
                    expectedError = new Error("Network error");
                    mockedDownloadAndCacheImage.mockRejectedValueOnce(expectedError);
                    result = renderHook(function () { return useMemoriedImage(imagePath); }).result;
                    // Assert initial state
                    expect(result.current.isLoading).toBe(true);
                    expect(result.current.data).toBe(null);
                    expect(result.current.error).toBeNull();
                    // Wait for the async operation to complete with timeout
                    return [4 /*yield*/, waitFor(function () {
                            expect(result.current.isLoading).toBe(false);
                        }, { timeout: 3000 })];
                case 1:
                    // Wait for the async operation to complete with timeout
                    _a.sent();
                    // Assert final state
                    expect(result.current.data).toBe(null);
                    expect(result.current.error).toBe(expectedError);
                    expect(mockedDownloadAndCacheImage).toHaveBeenCalledTimes(1);
                    return [2 /*return*/];
            }
        });
    }); });
    test("should use cached image when available", function () {
        // Arrange
        var imagePath = "https://example.com/cached-image.jpg";
        var cachedBase64 = "cachedBase64EncodedData";
        imageCache[imagePath] = {
            data: cachedBase64,
            timestamp: Date.now(),
            size: cachedBase64.length
        };
        // Act
        var result = renderHook(function () { return useMemoriedImage(imagePath); }).result;
        // Assert
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toBe(cachedBase64);
        expect(result.current.error).toBeNull();
        expect(mockedDownloadAndCacheImage).not.toHaveBeenCalled();
    });
    test("should handle invalid path", function () {
        var _a;
        // Arrange & Act
        var result = renderHook(function () { return useMemoriedImage(null); }).result;
        // Assert
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toBe(null);
        expect(result.current.error).toBeInstanceOf(Error);
        expect((_a = result.current.error) === null || _a === void 0 ? void 0 : _a.message).toBe("Invalid image path");
        expect(mockedDownloadAndCacheImage).not.toHaveBeenCalled();
    });
    test("should handle empty path", function () {
        var _a;
        // Arrange & Act
        var result = renderHook(function () { return useMemoriedImage(""); }).result;
        // Assert
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toBe(null);
        expect(result.current.error).toBeInstanceOf(Error);
        expect((_a = result.current.error) === null || _a === void 0 ? void 0 : _a.message).toBe("Invalid image path");
        expect(mockedDownloadAndCacheImage).not.toHaveBeenCalled();
    });
    test("should update when path changes", function () { return __awaiter(void 0, void 0, void 0, function () {
        var initialPath, newPath, initialBase64, newBase64, _a, result, rerender;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    initialPath = "https://example.com/initial-image.jpg";
                    newPath = "https://example.com/new-image.jpg";
                    initialBase64 = "initialBase64EncodedData";
                    newBase64 = "newBase64EncodedData";
                    mockedDownloadAndCacheImage
                        .mockResolvedValueOnce({
                        imageBase64: initialBase64,
                        valid: true,
                        path: initialPath,
                    })
                        .mockResolvedValueOnce({
                        imageBase64: newBase64,
                        valid: true,
                        path: newPath,
                    });
                    _a = renderHook(function (path) { return useMemoriedImage(path); }, { initialProps: initialPath }), result = _a.result, rerender = _a.rerender;
                    // Wait for first load
                    return [4 /*yield*/, waitFor(function () {
                            expect(result.current.isLoading).toBe(false);
                        }, { timeout: 3000 })];
                case 1:
                    // Wait for first load
                    _b.sent();
                    expect(result.current.data).toBe(initialBase64);
                    // Change the path
                    act(function () {
                        delete imageCache[newPath];
                        rerender(newPath);
                    });
                    // Assert loading state after path change
                    expect(result.current.isLoading).toBe(true);
                    // Wait for second load with timeout
                    return [4 /*yield*/, waitFor(function () {
                            expect(result.current.isLoading).toBe(false);
                        }, { timeout: 3000 })];
                case 2:
                    // Wait for second load with timeout
                    _b.sent();
                    // Assert final state
                    expect(result.current.data).toBe(newBase64);
                    expect(result.current.error).toBeNull();
                    expect(mockedDownloadAndCacheImage).toHaveBeenCalledTimes(2);
                    expect(mockedDownloadAndCacheImage).toHaveBeenNthCalledWith(1, initialPath);
                    expect(mockedDownloadAndCacheImage).toHaveBeenNthCalledWith(2, newPath);
                    return [2 /*return*/];
            }
        });
    }); });
});
