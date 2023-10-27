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
exports.createExtraClient = void 0;
var supabase_js_1 = require("@supabase/supabase-js");
var axios_1 = require("axios");
var SupabaseExtraClient = /** @class */ (function (_super) {
    __extends(SupabaseExtraClient, _super);
    function SupabaseExtraClient(url, key, backApiUrl, options) {
        var _this = _super.call(this, url, key, options) || this;
        _this.backApi = axios_1.default.create({
            baseURL: backApiUrl,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + key,
            },
        });
        _this.auth.onAuthStateChange(function (event, session) {
            var token = (session === null || session === void 0 ? void 0 : session.access_token) || key;
            _this.backApi.defaults.headers.Authorization =
                "Bearer " + token;
        });
        return _this;
    }
    return SupabaseExtraClient;
}(supabase_js_1.SupabaseClient));
var createExtraClient = function (url, key, options, backApiUrl) {
    return new SupabaseExtraClient(url, key, backApiUrl, options);
};
exports.createExtraClient = createExtraClient;
