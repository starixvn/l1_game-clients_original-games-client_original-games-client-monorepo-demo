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
var ServiceWorkerHelper = /** @class */ (function () {
    function ServiceWorkerHelper() {
        this.registration = null;
        this.isSupported = 'serviceWorker' in navigator;
        console.log('[ServiceWorkerHelper] Service Worker supported:', this.isSupported);
    }
    ServiceWorkerHelper.getInstance = function () {
        if (!ServiceWorkerHelper.instance) {
            ServiceWorkerHelper.instance = new ServiceWorkerHelper();
        }
        return ServiceWorkerHelper.instance;
    };
    ServiceWorkerHelper.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.isSupported) {
                            console.warn('[ServiceWorkerHelper] Service Worker not supported');
                            return [2 /*return*/, false];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        console.log('[ServiceWorkerHelper] Registering service worker...');
                        _a = this;
                        return [4 /*yield*/, navigator.serviceWorker.register('/sw.js', {
                                scope: '/'
                            })];
                    case 2:
                        _a.registration = _b.sent();
                        console.log('[ServiceWorkerHelper] Service Worker registered successfully:', this.registration);
                        // Handle service worker updates
                        this.registration.addEventListener('updatefound', function () {
                            console.log('[ServiceWorkerHelper] Service Worker update found');
                            var newWorker = _this.registration ? _this.registration.installing : null;
                            if (newWorker) {
                                newWorker.addEventListener('statechange', function () {
                                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                        console.log('[ServiceWorkerHelper] New service worker installed, ready to activate');
                                        _this.showUpdateNotification();
                                    }
                                });
                            }
                        });
                        // Handle service worker state changes
                        navigator.serviceWorker.addEventListener('controllerchange', function () {
                            console.log('[ServiceWorkerHelper] Service Worker controller changed');
                        });
                        return [2 /*return*/, true];
                    case 3:
                        error_1 = _b.sent();
                        console.error('[ServiceWorkerHelper] Failed to register service worker:', error_1);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiceWorkerHelper.prototype.unregister = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.registration) {
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.registration.unregister()];
                    case 2:
                        result = _a.sent();
                        console.log('[ServiceWorkerHelper] Service Worker unregistered:', result);
                        this.registration = null;
                        return [2 /*return*/, result];
                    case 3:
                        error_2 = _a.sent();
                        console.error('[ServiceWorkerHelper] Failed to unregister service worker:', error_2);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiceWorkerHelper.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.registration) {
                            console.warn('[ServiceWorkerHelper] No service worker registration found');
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        console.log('[ServiceWorkerHelper] Checking for service worker updates...');
                        return [4 /*yield*/, this.registration.update()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error('[ServiceWorkerHelper] Failed to update service worker:', error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiceWorkerHelper.prototype.skipWaiting = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.registration || !this.registration.waiting) {
                    return [2 /*return*/];
                }
                try {
                    console.log('[ServiceWorkerHelper] Skipping waiting...');
                    this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                }
                catch (error) {
                    console.error('[ServiceWorkerHelper] Failed to skip waiting:', error);
                }
                return [2 /*return*/];
            });
        });
    };
    ServiceWorkerHelper.prototype.clearCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.registration || !this.registration.active) {
                    return [2 /*return*/];
                }
                try {
                    console.log('[ServiceWorkerHelper] Clearing cache...');
                    if (this.registration.active) {
                        this.registration.active.postMessage({ type: 'CLEAR_CACHE' });
                    }
                }
                catch (error) {
                    console.error('[ServiceWorkerHelper] Failed to clear cache:', error);
                }
                return [2 /*return*/];
            });
        });
    };
    ServiceWorkerHelper.prototype.getCacheInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.registration || !this.registration.active) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, new Promise(function (resolve) {
                        var messageChannel = new MessageChannel();
                        messageChannel.port1.onmessage = function (event) {
                            console.log('[ServiceWorkerHelper] Cache info received:', event.data);
                            resolve(event.data);
                        };
                        try {
                            if (_this.registration && _this.registration.active) {
                                _this.registration.active.postMessage({ type: 'GET_CACHE_INFO' }, [messageChannel.port2]);
                            }
                            else {
                                resolve(null);
                                return;
                            }
                        }
                        catch (error) {
                            console.error('[ServiceWorkerHelper] Failed to get cache info:', error);
                            resolve(null);
                        }
                    })];
            });
        });
    };
    ServiceWorkerHelper.prototype.requestBackgroundSync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.registration || !('sync' in this.registration)) {
                            console.warn('[ServiceWorkerHelper] Background sync not supported');
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        console.log('[ServiceWorkerHelper] Requesting background sync...');
                        return [4 /*yield*/, this.registration.sync.register('background-sync')];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.error('[ServiceWorkerHelper] Failed to request background sync:', error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiceWorkerHelper.prototype.showUpdateNotification = function () {
        // Show a notification to the user about the update
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Game Assets Updated', {
                body: 'New game assets are available. Refresh to update.',
                icon: '/static/images/favicon.ico',
                badge: '/static/images/favicon.ico',
                tag: 'game-update'
            });
        }
        // You can also show an in-app notification here
        console.log('[ServiceWorkerHelper] Update notification shown');
    };
    ServiceWorkerHelper.prototype.isRegistered = function () {
        return this.registration !== null;
    };
    ServiceWorkerHelper.prototype.getRegistration = function () {
        return this.registration;
    };
    ServiceWorkerHelper.prototype.isServiceWorkerSupported = function () {
        return this.isSupported;
    };
    return ServiceWorkerHelper;
}());
// Export singleton instance
export var serviceWorkerHelper = ServiceWorkerHelper.getInstance();
// Auto-register service worker on module load
if (typeof window !== 'undefined') {
    serviceWorkerHelper.register().then(function (success) {
        if (success) {
            console.log('[ServiceWorkerHelper] Auto-registration successful');
        }
    });
}
export default serviceWorkerHelper;
