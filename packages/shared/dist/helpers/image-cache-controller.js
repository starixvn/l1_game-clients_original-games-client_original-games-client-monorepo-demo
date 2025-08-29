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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import axios from "axios";
import "./string-helper";
export var imageCache = {};
var MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB limit
var CACHE_TTL = 30 * 60 * 1000; // 30 minutes
var currentCacheSize = 0;
// Clean up cache when it gets too large
var cleanupCache = function () {
    var now = Date.now();
    var entries = Object.entries(imageCache);
    // Remove expired entries
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var _a = entries_1[_i], key = _a[0], entry = _a[1];
        if (now - entry.timestamp > CACHE_TTL) {
            currentCacheSize -= entry.size;
            delete imageCache[key];
        }
    }
    // If still too large, remove oldest entries
    if (currentCacheSize > MAX_CACHE_SIZE) {
        var sortedEntries = entries
            .filter(function (_a) {
            var _ = _a[0], entry = _a[1];
            return now - entry.timestamp <= CACHE_TTL;
        })
            .sort(function (a, b) { return a[1].timestamp - b[1].timestamp; });
        for (var _b = 0, sortedEntries_1 = sortedEntries; _b < sortedEntries_1.length; _b++) {
            var _c = sortedEntries_1[_b], key = _c[0], entry = _c[1];
            currentCacheSize -= entry.size;
            delete imageCache[key];
            if (currentCacheSize <= MAX_CACHE_SIZE * 0.8) { // Leave 20% buffer
                break;
            }
        }
    }
};
// Optimized base64 conversion
var arrayBufferToBase64 = function (buffer) {
    var bytes = new Uint8Array(buffer);
    var binary = '';
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};
// Fetch image with timeout and retry logic
var fetchImageBase64 = function (imageUrl_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([imageUrl_1], args_1, true), void 0, function (imageUrl, retries) {
        var controller, timeoutId, response, contentType, base64, error_1;
        var _a;
        if (retries === void 0) { retries = 2; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    controller = new AbortController();
                    timeoutId = setTimeout(function () { return controller.abort(); }, 10000);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 6]);
                    imageUrl = imageUrl.removeBuildVersion().appendBuildVersion();
                    return [4 /*yield*/, axios.get(imageUrl, {
                            responseType: "arraybuffer",
                            signal: controller.signal,
                            timeout: 10000
                        })];
                case 2:
                    response = _b.sent();
                    clearTimeout(timeoutId);
                    contentType = ((_a = response.headers["content-type"]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || 'image/png';
                    base64 = arrayBufferToBase64(response.data);
                    return [2 /*return*/, "data:".concat(contentType, ";base64,").concat(base64)];
                case 3:
                    error_1 = _b.sent();
                    clearTimeout(timeoutId);
                    if (!(retries > 0 && !axios.isCancel(error_1))) return [3 /*break*/, 5];
                    // Retry with exponential backoff
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000 * (3 - retries)); })];
                case 4:
                    // Retry with exponential backoff
                    _b.sent();
                    return [2 /*return*/, fetchImageBase64(imageUrl, retries - 1)];
                case 5: throw new Error("Failed to fetch image: ".concat(imageUrl, " - ").concat(error_1));
                case 6: return [2 /*return*/];
            }
        });
    });
};
// Calculate approximate size of base64 string
var calculateBase64Size = function (base64) {
    // Base64 is roughly 4/3 the size of the original data
    return Math.ceil(base64.length * 0.75);
};
export var downloadAndCacheImage = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var cleanPath, entry, now, imageBase64, size, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cleanPath = path.removeBuildVersion();
                // Check cache first
                if (imageCache[cleanPath]) {
                    entry = imageCache[cleanPath];
                    now = Date.now();
                    // Check if entry is still valid
                    if (now - entry.timestamp <= CACHE_TTL) {
                        return [2 /*return*/, { path: cleanPath, imageBase64: entry.data, valid: true }];
                    }
                    else {
                        // Remove expired entry
                        currentCacheSize -= entry.size;
                        delete imageCache[cleanPath];
                    }
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                // Clean up cache if needed
                if (currentCacheSize > MAX_CACHE_SIZE) {
                    cleanupCache();
                }
                return [4 /*yield*/, fetchImageBase64(cleanPath)];
            case 2:
                imageBase64 = _a.sent();
                size = calculateBase64Size(imageBase64);
                // Only cache if it's not too large
                if (size < MAX_CACHE_SIZE * 0.1) { // Don't cache if single image is >10% of max cache
                    imageCache[cleanPath] = {
                        data: imageBase64,
                        timestamp: Date.now(),
                        size: size
                    };
                    currentCacheSize += size;
                }
                return [2 /*return*/, { path: cleanPath, imageBase64: imageBase64, valid: true }];
            case 3:
                error_2 = _a.sent();
                console.warn("Failed to download and cache image: ".concat(cleanPath), error_2);
                return [2 /*return*/, { path: cleanPath, imageBase64: '', valid: false }];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Export cache for debugging/monitoring
export var getCacheStats = function () { return ({
    size: currentCacheSize,
    maxSize: MAX_CACHE_SIZE,
    entryCount: Object.keys(imageCache).length,
    utilization: (currentCacheSize / MAX_CACHE_SIZE) * 100
}); };
// Clear cache manually if needed
export var clearImageCache = function () {
    Object.keys(imageCache).forEach(function (key) { return delete imageCache[key]; });
    currentCacheSize = 0;
};
