var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { renderHook } from "@testing-library/react";
import { useTranslator, parseTranslationKey, useCommonTranslate, useSNTranslate } from "../use-translator";
import { useTranslate } from "@tolgee/react";
import { ResourceTypes } from "../../resources";
// Mock @tolgee/react
jest.mock("@tolgee/react", function () { return ({
    useTranslate: jest.fn(),
}); });
describe("use-translator", function () {
    describe("parseTranslationKey", function () {
        test("should parse key with namespace correctly", function () {
            // Arrange
            var input = "namespace.testKey";
            // Act
            var result = parseTranslationKey(input);
            // Assert
            expect(result).toEqual({
                ns: "namespace",
                key: "testKey",
            });
        });
        test("should handle key without namespace", function () {
            // Arrange
            var input = "simpleKey";
            // Act
            var result = parseTranslationKey(input);
            // Assert
            expect(result).toEqual({
                key: "simpleKey",
            });
        });
    });
    describe("useTranslator", function () {
        var mockTranslate = jest.fn();
        beforeEach(function () {
            jest.clearAllMocks();
            useTranslate.mockReturnValue({
                t: mockTranslate,
            });
        });
        test("should use default namespaces when no gameNamespaces provided", function () {
            // Arrange
            var expectedNamespaces = [ResourceTypes.SABA_NUMBER, ResourceTypes.COMMON];
            // Act
            var result = renderHook(function () { return useTranslator(); }, {
                wrapper: function (_a) {
                    var children = _a.children;
                    return children;
                },
            }).result;
            // Assert
            expect(useTranslate).toHaveBeenCalledWith(expectedNamespaces);
        });
        test("should combine game namespaces with default namespaces", function () {
            // Arrange
            var gameNamespace = "game-namespace";
            var expectedNamespaces = [gameNamespace, ResourceTypes.SABA_NUMBER, ResourceTypes.COMMON];
            // Act
            var result = renderHook(function () { return useTranslator([gameNamespace]); }, {
                wrapper: function (_a) {
                    var children = _a.children;
                    return children;
                },
            }).result;
            // Assert
            expect(useTranslate).toHaveBeenCalledWith(expectedNamespaces);
        });
        test("should translate key with namespace correctly", function () {
            // Arrange
            var key = "namespace.translationKey";
            var params = { value: "test-value" };
            var options = { count: 1 };
            mockTranslate.mockReturnValue("translated text");
            var result = renderHook(function () { return useTranslator(); }, {
                wrapper: function (_a) {
                    var children = _a.children;
                    return children;
                },
            }).result;
            // Act
            result.current.t(key, params, options);
            // Assert
            var _a = parseTranslationKey(key), parsedKey = _a.key, ns = _a.ns;
            expect(mockTranslate).toHaveBeenCalledWith(__assign({ key: parsedKey, ns: ns, params: params }, options));
        });
    });
    describe("useCommonTranslate", function () {
        test("should initialize with COMMON namespace", function () {
            // Arrange & Act
            var result = renderHook(function () { return useCommonTranslate(); }, {
                wrapper: function (_a) {
                    var children = _a.children;
                    return children;
                },
            }).result;
            // Assert
            expect(useTranslate).toHaveBeenCalledWith(ResourceTypes.COMMON);
        });
    });
    describe("useSNTranslate", function () {
        test("should initialize with SABA_NUMBER namespace", function () {
            // Arrange & Act
            var result = renderHook(function () { return useSNTranslate(); }, {
                wrapper: function (_a) {
                    var children = _a.children;
                    return children;
                },
            }).result;
            // Assert
            expect(useTranslate).toHaveBeenCalledWith(ResourceTypes.SABA_NUMBER);
        });
    });
});
