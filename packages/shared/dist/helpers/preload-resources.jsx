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
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { getAppSettings } from "../app-settings";
import { imageOptimizationHelper, optimizeImageUrl } from "./image-optimization-helper";
var DEFAULT_PROGRESS_BAR_ID = "progress-bar";
export var DURATION_HOLD_SPLASH_SCREEN = 1000;
var analyticsData = [];
// Critical image paths that should be loaded first
var CRITICAL_IMAGE_PATHS = ["/ball/", "/anim/ball-middle/"];
// Progressive loading priorities
var ImagePriority;
(function (ImagePriority) {
    ImagePriority[ImagePriority["CRITICAL"] = 1] = "CRITICAL";
    ImagePriority[ImagePriority["HIGH"] = 2] = "HIGH";
    ImagePriority[ImagePriority["MEDIUM"] = 3] = "MEDIUM";
    ImagePriority[ImagePriority["LOW"] = 4] = "LOW";
})(ImagePriority || (ImagePriority = {}));
// Global preload manager to prevent multiple simultaneous preloads
var PreloadManager = /** @class */ (function () {
    function PreloadManager() {
        this.activePreloads = new Map();
        this.preloadCallbacks = new Map();
        this.analytics = new Map();
    }
    PreloadManager.getInstance = function () {
        if (!PreloadManager.instance) {
            PreloadManager.instance = new PreloadManager();
        }
        return PreloadManager.instance;
    };
    PreloadManager.prototype.startPreload = function (gameId, locale, gameIdsIcon, bannerId, onComplete, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var preloadKey, analytics, cbSet, preloadPromise, finalAnalytics, callbacks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        preloadKey = getRequestKey(gameId, locale, gameIdsIcon, bannerId);
                        analytics = {
                            gameId: gameId,
                            startTime: Date.now(),
                            totalImages: 0,
                            criticalImages: 0,
                            loadedImages: 0,
                            failedImages: 0,
                            apiResponseTime: 0,
                            totalLoadTime: 0,
                            cacheHits: 0,
                            compressionRatio: 0,
                        };
                        this.analytics.set(preloadKey, analytics);
                        // Register callback for this preload
                        if (!this.preloadCallbacks.has(preloadKey)) {
                            this.preloadCallbacks.set(preloadKey, new Set());
                        }
                        cbSet = this.preloadCallbacks.get(preloadKey);
                        if (cbSet) {
                            cbSet.add(onComplete);
                        }
                        if (!this.activePreloads.has(preloadKey)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.activePreloads.get(preloadKey)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        preloadPromise = this.executePreload(gameId, locale, gameIdsIcon, bannerId, preloadKey, onProgress);
                        this.activePreloads.set(preloadKey, preloadPromise);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, , 5, 6]);
                        return [4 /*yield*/, preloadPromise];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        finalAnalytics = this.analytics.get(preloadKey);
                        if (finalAnalytics) {
                            finalAnalytics.endTime = Date.now();
                            finalAnalytics.totalLoadTime = finalAnalytics.endTime - finalAnalytics.startTime;
                            this.logAnalytics(finalAnalytics);
                            analyticsData.push(finalAnalytics);
                        }
                        // Clean up
                        this.activePreloads.delete(preloadKey);
                        this.analytics.delete(preloadKey);
                        callbacks = this.preloadCallbacks.get(preloadKey);
                        if (callbacks) {
                            callbacks.forEach(function (callback) { return callback(); });
                            this.preloadCallbacks.delete(preloadKey);
                        }
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PreloadManager.prototype.executePreload = function (gameId, locale, gameIdsIcon, bannerId, preloadKey, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var imagePaths, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetchImagesFromAPI(gameId, locale, gameIdsIcon, bannerId, preloadKey)];
                    case 1:
                        imagePaths = _a.sent();
                        // Progressive loading with priority
                        return [4 /*yield*/, loadImagesProgressive(imagePaths, gameId, preloadKey, onProgress)];
                    case 2:
                        // Progressive loading with priority
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("[PreloadManager] Preload failed for key: ".concat(preloadKey, ":"), error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PreloadManager.prototype.logAnalytics = function (analytics) {
        // Analytics logging removed
        // Send analytics to monitoring service
        this.sendAnalyticsToService(analytics);
    };
    PreloadManager.prototype.sendAnalyticsToService = function (analytics) {
        // Send to analytics service (e.g., Google Analytics, custom endpoint)
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "preload_completed", {
                game_id: analytics.gameId,
                total_time: analytics.totalLoadTime,
                api_time: analytics.apiResponseTime,
                images_loaded: analytics.loadedImages,
                images_total: analytics.totalImages,
                cache_hits: analytics.cacheHits,
                compression_ratio: analytics.compressionRatio,
            });
        }
        // Send to custom analytics endpoint
        fetch("/api/analytics/preload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(analytics),
        }).catch(function (error) {
            console.warn("[PreloadManager] Failed to send analytics:", error);
        });
    };
    PreloadManager.prototype.cancelPreload = function (gameId, locale, gameIdsIcon, bannerId) {
        var preloadKey = getRequestKey(gameId, locale, gameIdsIcon, bannerId);
        // Remove callbacks
        this.preloadCallbacks.delete(preloadKey);
        this.analytics.delete(preloadKey);
        // Note: We can't easily cancel the actual preload promise, but we can prevent new callbacks
    };
    PreloadManager.prototype.getAnalytics = function () {
        return __spreadArray([], analyticsData, true);
    };
    return PreloadManager;
}());
// Enhanced global cache with request deduplication
var loadedGamesCache = {};
var imageLoadingPromises = {};
var activeRequests = {};
var requestTimestamps = {};
// Request deduplication helper
var getRequestKey = function (gameId, locale, gameIdsIcon, bannerId) {
    return "".concat(gameId, "-").concat(locale, "-").concat(JSON.stringify(gameIdsIcon), "-").concat(bannerId);
};
// Cleanup old requests (older than 30 seconds)
var cleanupOldRequests = function () {
    var now = Date.now();
    var thirtySecondsAgo = now - 30000;
    Object.keys(activeRequests).forEach(function (key) {
        if (requestTimestamps[key] && requestTimestamps[key] < thirtySecondsAgo) {
            delete activeRequests[key];
            delete requestTimestamps[key];
        }
    });
};
// CDN URL generation - removed for future implementation
// const getCDNUrl = (path: string): string => {
//     return path;
// };
// Image compression detection
var isCompressedImage = function (path) {
    return path.includes(".webp") || path.includes("compressed") || path.includes("optimized");
};
// Progressive image prioritization with optimization
var prioritizeImages = function (imagePaths) {
    var optimalFormat = imageOptimizationHelper.getOptimalFormat();
    return imagePaths
        .map(function (path) {
        var priority = ImagePriority.LOW;
        var isCompressed = isCompressedImage(path);
        // Optimize the URL with the best format
        var optimizedUrl = optimizeImageUrl(path, {
            format: optimalFormat,
            quality: 85,
        });
        // Critical images (UI elements, game mechanics)
        if (CRITICAL_IMAGE_PATHS.some(function (criticalPath) { return path.includes(criticalPath); })) {
            priority = ImagePriority.CRITICAL;
        }
        // High priority (frequently used)
        else if (path.includes("/ball/")) {
            priority = ImagePriority.HIGH;
        }
        // Medium priority (game-specific assets)
        else if (path.includes("/number/")) {
            priority = ImagePriority.MEDIUM;
        }
        return {
            path: optimizedUrl,
            priority: priority,
            isCompressed: isCompressed || optimizedUrl !== path,
        };
    })
        .sort(function (a, b) { return a.priority - b.priority; });
};
// Fetch images from API with request deduplication and analytics
var fetchImagesFromAPI = function (gameId, locale, gameIdsIcon, bannerId, preloadKey) { return __awaiter(void 0, void 0, void 0, function () {
    var requestKey, error_2, requestPromise;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestKey = getRequestKey(gameId, locale, gameIdsIcon || [], bannerId || 0);
                if (!activeRequests[requestKey]) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, activeRequests[requestKey]];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_2 = _a.sent();
                console.error("[fetchImagesFromAPI] Reused request failed:", error_2);
                // Remove failed request from cache
                delete activeRequests[requestKey];
                delete requestTimestamps[requestKey];
                throw error_2;
            case 4:
                // Cleanup old requests periodically
                cleanupOldRequests();
                requestPromise = (function () { return __awaiter(void 0, void 0, void 0, function () {
                    var startTime, response, endTime, imagePaths, apiResponseTime, preloadManager, analytics, error_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, 3, 4]);
                                startTime = Date.now();
                                return [4 /*yield*/, axios.post("/api/preload-images", {
                                        gameId: gameId,
                                        locale: locale,
                                        gameIdsIcon: gameIdsIcon,
                                        bannerId: bannerId,
                                    }, {
                                        timeout: 10000, // 10 second timeout
                                    })];
                            case 1:
                                response = _a.sent();
                                endTime = Date.now();
                                imagePaths = (response === null || response === void 0 ? void 0 : response.data) || [];
                                apiResponseTime = endTime - startTime;
                                preloadManager = PreloadManager.getInstance();
                                analytics = preloadManager["analytics"].get(preloadKey);
                                if (analytics) {
                                    analytics.apiResponseTime = apiResponseTime;
                                    analytics.totalImages = imagePaths.length;
                                    analytics.criticalImages = imagePaths.filter(function (path) {
                                        return CRITICAL_IMAGE_PATHS.some(function (criticalPath) { return path.includes(criticalPath); });
                                    }).length;
                                }
                                return [2 /*return*/, imagePaths];
                            case 2:
                                error_3 = _a.sent();
                                console.error("[fetchImagesFromAPI] Failed to fetch image paths:", error_3);
                                throw error_3;
                            case 3:
                                // Clean up the request from active requests
                                delete activeRequests[requestKey];
                                delete requestTimestamps[requestKey];
                                return [7 /*endfinally*/];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })();
                // Store the request promise and timestamp
                activeRequests[requestKey] = requestPromise;
                requestTimestamps[requestKey] = Date.now();
                return [2 /*return*/, requestPromise];
        }
    });
}); };
// Progressive image loading with priority
var loadImagesProgressive = function (imagePaths, gameId, preloadKey, onProgress) { return __awaiter(void 0, void 0, void 0, function () {
    var prioritizedImages, preloadManager, analytics, totalImages, loadedImages, updateProgress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (imagePaths.length === 0) {
                    return [2 /*return*/];
                }
                prioritizedImages = prioritizeImages(imagePaths);
                preloadManager = PreloadManager.getInstance();
                analytics = preloadManager["analytics"].get(preloadKey);
                totalImages = prioritizedImages.length;
                loadedImages = 0;
                updateProgress = function () {
                    var progress = Math.min((loadedImages / totalImages) * 100, 100);
                    onProgress === null || onProgress === void 0 ? void 0 : onProgress(progress);
                    updateProgressBar(progress, DEFAULT_PROGRESS_BAR_ID);
                };
                // Initial progress (API call completed)
                updateProgress();
                // Load critical images first
                return [4 /*yield*/, loadImagesByPriority(prioritizedImages, ImagePriority.CRITICAL, analytics, function () {
                        loadedImages += prioritizedImages.filter(function (img) { return img.priority === ImagePriority.CRITICAL; }).length;
                        updateProgress();
                    })];
            case 1:
                // Load critical images first
                _a.sent();
                // Load high priority images
                return [4 /*yield*/, loadImagesByPriority(prioritizedImages, ImagePriority.HIGH, analytics, function () {
                        loadedImages += prioritizedImages.filter(function (img) { return img.priority === ImagePriority.HIGH; }).length;
                        updateProgress();
                    })];
            case 2:
                // Load high priority images
                _a.sent();
                // Load medium priority images
                return [4 /*yield*/, loadImagesByPriority(prioritizedImages, ImagePriority.MEDIUM, analytics, function () {
                        loadedImages += prioritizedImages.filter(function (img) { return img.priority === ImagePriority.MEDIUM; }).length;
                        updateProgress();
                    })];
            case 3:
                // Load medium priority images
                _a.sent();
                // Load low priority images
                return [4 /*yield*/, loadImagesByPriority(prioritizedImages, ImagePriority.LOW, analytics, function () {
                        loadedImages += prioritizedImages.filter(function (img) { return img.priority === ImagePriority.LOW; }).length;
                        updateProgress();
                    })];
            case 4:
                // Load low priority images
                _a.sent();
                // Mark game as loaded in cache
                loadedGamesCache[gameId] = true;
                // Calculate final analytics
                if (analytics) {
                    analytics.compressionRatio = Math.round((prioritizedImages.filter(function (img) { return img.isCompressed; }).length / prioritizedImages.length) * 100);
                }
                return [2 /*return*/];
        }
    });
}); };
// Load images by priority level
var loadImagesByPriority = function (prioritizedImages, priority, analytics, onBatchComplete) { return __awaiter(void 0, void 0, void 0, function () {
    var imagesToLoad, batchSize, batches, i, _i, batches_1, batch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imagesToLoad = prioritizedImages.filter(function (img) { return img.priority === priority; });
                if (imagesToLoad.length === 0) {
                    return [2 /*return*/];
                }
                batchSize = priority === ImagePriority.CRITICAL ? 5 : 15;
                batches = [];
                for (i = 0; i < imagesToLoad.length; i += batchSize) {
                    batches.push(imagesToLoad.slice(i, i + batchSize));
                }
                _i = 0, batches_1 = batches;
                _a.label = 1;
            case 1:
                if (!(_i < batches_1.length)) return [3 /*break*/, 4];
                batch = batches_1[_i];
                // Load batch in parallel
                return [4 /*yield*/, Promise.all(batch.map(function (imageData) { return __awaiter(void 0, void 0, void 0, function () {
                        var error_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, loadAndCacheImageOptimized(imageData.path)];
                                case 1:
                                    _a.sent();
                                    if (analytics) {
                                        analytics.loadedImages++;
                                        if (imageData.isCompressed) {
                                            analytics.compressionRatio++;
                                        }
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_4 = _a.sent();
                                    console.warn("[loadImagesByPriority] Failed to load image: ".concat(imageData.path), error_4);
                                    if (analytics) {
                                        analytics.failedImages++;
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                // Load batch in parallel
                _a.sent();
                // Progress update for critical images
                if (priority === ImagePriority.CRITICAL) {
                    // Progress calculation removed as it's not used
                }
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                // Call progress callback when batch is complete
                onBatchComplete === null || onBatchComplete === void 0 ? void 0 : onBatchComplete();
                return [2 /*return*/];
        }
    });
}); };
// Optimized image loading with caching and analytics
var loadAndCacheImageOptimized = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var loadingPromise, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!imageLoadingPromises[path]) return [3 /*break*/, 2];
                return [4 /*yield*/, imageLoadingPromises[path]];
            case 1:
                _a.sent();
                return [2 /*return*/];
            case 2:
                loadingPromise = (function () { return __awaiter(void 0, void 0, void 0, function () {
                    var img;
                    return __generator(this, function (_a) {
                        img = new Image();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                img.onload = function () {
                                    resolve();
                                };
                                img.onerror = function () {
                                    console.warn("[loadAndCacheImageOptimized] Image failed to load: ".concat(path));
                                    resolve(); // Continue even if image fails
                                };
                                img.src = path;
                            })];
                    });
                }); })();
                imageLoadingPromises[path] = loadingPromise;
                return [4 /*yield*/, loadingPromise];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.warn("[loadAndCacheImageOptimized] Failed to load image: ".concat(path), error_5);
                throw error_5;
            case 5: return [2 /*return*/];
        }
    });
}); };
export var getAndHandleBannerOffer = function (authorizeInfo, lobbyConfigs, callbackFn) {
    // Custom version: No banner functionality since lobby is removed
    return;
};
export var updateProgressBar = function (percentage, progressBarId) {
    if (progressBarId === void 0) { progressBarId = DEFAULT_PROGRESS_BAR_ID; }
    var progressBars = document.querySelectorAll("#".concat(progressBarId));
    progressBars.forEach(function (progressBar) {
        if (progressBar instanceof HTMLElement) {
            progressBar.style.width = "".concat(percentage, "%");
        }
    });
};
var PreloadResources = function (_a) {
    var _b;
    var setIsDonePreload = _a.setIsDonePreload, gameId = _a.gameId, _c = _a.locale, locale = _c === void 0 ? "en" : _c, cancelPreload = _a.cancelPreload, _d = _a.progressBarId, progressBarId = _d === void 0 ? DEFAULT_PROGRESS_BAR_ID : _d, onProgressUpdate = _a.onProgressUpdate;
    var router = useRouter();
    var componentId = useRef("preload-".concat(gameId, "-").concat(Date.now(), "-").concat(Math.random()));
    var enablePreloadResource = (_b = getAppSettings().enablePreloadResource) !== null && _b !== void 0 ? _b : true;
    // Game settings and cache paths removed as they're not used
    // Main preload effect using the global manager
    useEffect(function () {
        if (!(router === null || router === void 0 ? void 0 : router.isReady) || !enablePreloadResource || gameId < 0) {
            updateProgressBar(100, progressBarId);
            setIsDonePreload();
            return undefined;
        }
        // Check if game is already loaded
        if (loadedGamesCache[gameId]) {
            updateProgressBar(100, progressBarId);
            setIsDonePreload();
            return undefined;
        }
        var isMounted = true;
        var startPreload = function () { return __awaiter(void 0, void 0, void 0, function () {
            var preloadManager, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        preloadManager = PreloadManager.getInstance();
                        return [4 /*yield*/, preloadManager.startPreload(gameId, locale, [], 0, function () {
                                if (isMounted) {
                                    updateProgressBar(100, progressBarId);
                                    setIsDonePreload();
                                }
                            }, function (progress) {
                                if (isMounted && onProgressUpdate) {
                                    onProgressUpdate(progress);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        if (isMounted) {
                            console.error("[PreloadResources:".concat(componentId.current, "] Preload failed:"), error_6);
                            setIsDonePreload();
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        startPreload();
        return function () {
            isMounted = false;
            // Cancel preload if component unmounts
            if (enablePreloadResource && gameId >= 0) {
                var preloadManager = PreloadManager.getInstance();
                preloadManager.cancelPreload(gameId, locale, [], 0);
            }
        };
    }, [router === null || router === void 0 ? void 0 : router.isReady, gameId, enablePreloadResource, locale, progressBarId, setIsDonePreload]);
    // Handle cancel preload
    useEffect(function () {
        if (cancelPreload) {
            var preloadManager = PreloadManager.getInstance();
            preloadManager.cancelPreload(gameId, locale, [], 0);
            setIsDonePreload();
        }
    }, [cancelPreload, gameId, locale, setIsDonePreload]);
    // Render nothing
    return null;
};
export default PreloadResources;
