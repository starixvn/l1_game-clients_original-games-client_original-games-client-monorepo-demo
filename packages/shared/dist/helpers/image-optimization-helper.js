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
var ImageOptimizationHelper = /** @class */ (function () {
    function ImageOptimizationHelper() {
        this.canvas = null;
        this.ctx = null;
        if (typeof window !== 'undefined') {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
        }
    }
    ImageOptimizationHelper.getInstance = function () {
        if (!ImageOptimizationHelper.instance) {
            ImageOptimizationHelper.instance = new ImageOptimizationHelper();
        }
        return ImageOptimizationHelper.instance;
    };
    // Check if WebP is supported
    ImageOptimizationHelper.prototype.isWebPSupported = function () {
        if (typeof window === 'undefined') {
            return false;
        }
        var canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };
    // Check if AVIF is supported
    ImageOptimizationHelper.prototype.isAVIFSupported = function () {
        if (typeof window === 'undefined') {
            return false;
        }
        var canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
    };
    // Get optimal format based on browser support
    ImageOptimizationHelper.prototype.getOptimalFormat = function () {
        if (this.isAVIFSupported()) {
            return 'avif';
        }
        if (this.isWebPSupported()) {
            return 'webp';
        }
        return 'jpeg';
    };
    // Optimize image URL with format and quality parameters
    ImageOptimizationHelper.prototype.optimizeImageUrl = function (url, _options) {
        if (_options === void 0) { _options = {}; }
        // For local images, return as-is (server-side optimization would be needed)
        return url;
    };
    // Create responsive image URLs
    ImageOptimizationHelper.prototype.createResponsiveImageUrls = function (baseUrl, sizes) {
        var _this = this;
        return sizes.map(function (size) { return _this.optimizeImageUrl(baseUrl, { width: size }); });
    };
    // Optimize image data using canvas
    ImageOptimizationHelper.prototype.optimizeImageData = function (imageData_1) {
        return __awaiter(this, arguments, void 0, function (imageData, options) {
            var _a, quality, tempCanvas, tempCtx, mimeType, optimizedDataUrl, originalSize, optimizedSize, compressionRatio;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_b) {
                if (!this.canvas || !this.ctx) {
                    throw new Error('Canvas not available');
                }
                _a = options.quality, quality = _a === void 0 ? 85 : _a;
                // Set canvas dimensions
                this.canvas.width = imageData.width;
                this.canvas.height = imageData.height;
                // Clear canvas
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                tempCanvas = document.createElement('canvas');
                tempCanvas.width = imageData.width;
                tempCanvas.height = imageData.height;
                tempCtx = tempCanvas.getContext('2d');
                if (!tempCtx) {
                    throw new Error('Canvas 2D context not available');
                }
                tempCtx.putImageData(imageData, 0, 0);
                // Draw and scale if needed
                this.ctx.drawImage(tempCanvas, 0, 0, this.canvas.width, this.canvas.height);
                mimeType = "image/webp";
                optimizedDataUrl = this.canvas.toDataURL(mimeType, quality / 100);
                originalSize = imageData.data.length;
                optimizedSize = Math.ceil(optimizedDataUrl.length * 0.75);
                compressionRatio = ((originalSize - optimizedSize) / originalSize) * 100;
                return [2 /*return*/, {
                        originalSize: originalSize,
                        optimizedSize: optimizedSize,
                        compressionRatio: Math.round(compressionRatio),
                        format: 'webp',
                        url: optimizedDataUrl
                    }];
            });
        });
    };
    // Preload optimized images
    ImageOptimizationHelper.prototype.preloadOptimizedImages = function (imageUrls_1) {
        return __awaiter(this, arguments, void 0, function (imageUrls, options) {
            var optimalFormat, optimizedUrls, promises;
            var _this = this;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        optimalFormat = this.getOptimalFormat();
                        optimizedUrls = imageUrls.map(function (url) {
                            return _this.optimizeImageUrl(url, __assign(__assign({}, options), { format: optimalFormat }));
                        });
                        console.log("[ImageOptimization] Preloading ".concat(optimizedUrls.length, " optimized images with format: ").concat(optimalFormat));
                        promises = optimizedUrls.map(function (url) { return _this.preloadImage(url); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Preload single image
    ImageOptimizationHelper.prototype.preloadImage = function (url) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.onload = function () { return resolve(); };
            img.onerror = function () { return reject(new Error("Failed to load image: ".concat(url))); };
            img.src = url;
        });
    };
    // Get image dimensions
    ImageOptimizationHelper.prototype.getImageDimensions = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var img = new Image();
                        img.onload = function () {
                            resolve({ width: img.naturalWidth, height: img.naturalHeight });
                        };
                        img.onerror = function () { return reject(new Error("Failed to get dimensions for: ".concat(url))); };
                        img.src = url;
                    })];
            });
        });
    };
    // Calculate optimal quality based on image size
    ImageOptimizationHelper.prototype.calculateOptimalQuality = function (width, height) {
        var totalPixels = width * height;
        if (totalPixels > 2000000) {
            return 75; // Large images
        }
        if (totalPixels > 500000) {
            return 80; // Medium images
        }
        return 85; // Small images
    };
    // Generate srcset for responsive images
    ImageOptimizationHelper.prototype.generateSrcSet = function (baseUrl, sizes) {
        var _this = this;
        var optimalFormat = this.getOptimalFormat();
        return sizes
            .map(function (size) {
            var optimizedUrl = _this.optimizeImageUrl(baseUrl, {
                width: size,
                format: optimalFormat
            });
            return "".concat(optimizedUrl, " ").concat(size, "w");
        })
            .join(', ');
    };
    // Get compression statistics
    ImageOptimizationHelper.prototype.getCompressionStats = function (originalUrls, optimizedUrls) {
        // This is a simplified calculation - in real implementation, 
        // you'd need to actually measure file sizes
        var formatUsed = this.getOptimalFormat();
        var estimatedCompressionRatio = formatUsed === 'avif' ? 50 :
            formatUsed === 'webp' ? 30 : 10;
        return {
            totalOriginalSize: originalUrls.length * 100000, // Estimated
            totalOptimizedSize: Math.round(originalUrls.length * 100000 * (1 - estimatedCompressionRatio / 100)),
            averageCompressionRatio: estimatedCompressionRatio,
            formatUsed: formatUsed
        };
    };
    return ImageOptimizationHelper;
}());
// Export singleton instance
export var imageOptimizationHelper = ImageOptimizationHelper.getInstance();
// Utility functions
export var optimizeImageUrl = function (url, options) {
    return imageOptimizationHelper.optimizeImageUrl(url, options);
};
export var createResponsiveImageUrls = function (baseUrl, sizes) {
    return imageOptimizationHelper.createResponsiveImageUrls(baseUrl, sizes);
};
export var getOptimalFormat = function () {
    return imageOptimizationHelper.getOptimalFormat();
};
export var isWebPSupported = function () {
    return imageOptimizationHelper.isWebPSupported();
};
export var isAVIFSupported = function () {
    return imageOptimizationHelper.isAVIFSupported();
};
export default imageOptimizationHelper;
