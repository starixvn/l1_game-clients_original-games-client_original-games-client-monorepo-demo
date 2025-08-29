import { renderHook, act } from "@testing-library/react";
import useDebounce from "./use-debounce";
jest.useFakeTimers();
describe("useDebounce", function () {
    afterEach(function () {
        jest.clearAllTimers();
        jest.clearAllMocks();
    });
    afterAll(function () {
        jest.useRealTimers();
    });
    it("should return the initial value immediately", function () {
        var result = renderHook(function () { return useDebounce("initial", 500); }).result;
        // Initially, the value should match the input immediately
        expect(result.current).toBe("initial");
    });
    it("should update the value after the delay", function () {
        var _a = renderHook(function (_a) {
            var value = _a.value, delay = _a.delay;
            return useDebounce(value, delay);
        }, {
            initialProps: { value: "initial", delay: 500 },
        }), result = _a.result, rerender = _a.rerender;
        // Initially, the value should be the initial value
        expect(result.current).toBe("initial");
        // Change the value
        rerender({ value: "updated", delay: 500 });
        // The value should remain unchanged before the delay
        expect(result.current).toBe("initial");
        // Fast-forward time
        act(function () {
            jest.advanceTimersByTime(500);
        });
        // Now the value should update
        expect(result.current).toBe("updated");
    });
    it("should not update the value before the delay", function () {
        var _a = renderHook(function (_a) {
            var value = _a.value, delay = _a.delay;
            return useDebounce(value, delay);
        }, {
            initialProps: { value: "initial", delay: 500 },
        }), result = _a.result, rerender = _a.rerender;
        rerender({ value: "updated", delay: 500 });
        // Move time slightly forward, but not enough for the delay
        act(function () {
            jest.advanceTimersByTime(300);
        });
        // The value should still not have changed
        expect(result.current).toBe("initial");
    });
    it("should clear the timeout on unmount", function () {
        var unmount = renderHook(function () { return useDebounce("initial", 500); }).unmount;
        // Arrange
        jest.spyOn(global, "clearTimeout");
        // Unmount the hook
        unmount();
        // Check that all timers are cleared
        expect(global.clearTimeout).toHaveBeenCalledTimes(1);
    });
});
