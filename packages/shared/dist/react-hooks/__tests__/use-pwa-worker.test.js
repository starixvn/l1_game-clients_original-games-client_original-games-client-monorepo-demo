import { renderHook, cleanup } from "@testing-library/react";
import { usePWAWoker } from "../use-pwa-worker";
describe("usePWAWorker", function () {
    // Mock setup
    var mockTerminate = jest.fn();
    var mockPostMessage = jest.fn();
    var mockWorker;
    beforeEach(function () {
        // Arrange: Reset mocks and setup Worker
        mockWorker = {
            terminate: mockTerminate,
            postMessage: mockPostMessage,
            onmessage: null,
        };
        // Mock Worker constructor
        global.Worker = jest.fn().mockImplementation(function () { return mockWorker; });
        global.window = {
            Worker: global.Worker,
        };
        jest.clearAllMocks();
    });
    afterEach(function () {
        cleanup();
    });
    test("should initialize worker when browser supports Web Workers", function () {
        // Arrange
        var workerUrl = "/worker.js";
        var workerOptions = { type: "module" };
        // Act
        var result = renderHook(function () { return usePWAWoker(); }).result;
        // Assert
        expect(global.Worker).toHaveBeenCalledWith(workerUrl, workerOptions);
        expect(result.current.current).toBe(mockWorker);
    });
    test("should handle worker messages correctly", function () {
        // Arrange
        var testData = { type: "TEST_MESSAGE", payload: "test" };
        // Act
        renderHook(function () { return usePWAWoker(); });
        mockWorker.onmessage({ data: testData });
        // Assert
        expect(mockPostMessage).toHaveBeenCalledWith(testData);
    });
    test("should handle worker initialization errors", function () {
        // Arrange
        var consoleSpy = jest.spyOn(console, "log");
        var mockError = new Error("Worker initialization failed");
        global.Worker = jest.fn().mockImplementation(function () {
            throw mockError;
        });
        // Act
        renderHook(function () { return usePWAWoker(); });
        // Assert
        expect(consoleSpy).toHaveBeenCalledWith(mockError);
    });
    test("should terminate worker on cleanup", function () {
        // Arrange
        var unmount = renderHook(function () { return usePWAWoker(); }).unmount;
        // Act
        unmount();
        // Assert
        expect(mockTerminate).toHaveBeenCalled();
    });
});
