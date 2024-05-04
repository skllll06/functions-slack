"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
var ts_custom_error_1 = require("ts-custom-error");
var error_1 = require("../consts/error");
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError(_a) {
        var code = _a.code, message = _a.message;
        var _this = _super.call(this) || this;
        _this._message = error_1.httpErrorMessages[code];
        _this._customMessage = message;
        _this.code = code;
        return _this;
    }
    Object.defineProperty(HttpError.prototype, "message", {
        get: function () {
            var _a;
            return (_a = this._customMessage) !== null && _a !== void 0 ? _a : this._message;
        },
        enumerable: false,
        configurable: true
    });
    return HttpError;
}(ts_custom_error_1.CustomError));
exports.HttpError = HttpError;
