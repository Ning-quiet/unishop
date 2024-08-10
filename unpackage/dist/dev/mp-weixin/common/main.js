(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],[
/* 0 */
/*!*******************************!*\
  !*** D:/code/unishop/main.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, uni, createApp) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
__webpack_require__(/*! uni-pages */ 26);
var _requestMiniprogram = __webpack_require__(/*! @escook/request-miniprogram */ 27);
var _store = _interopRequireDefault(__webpack_require__(/*! ./store/store.js */ 28));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
__webpack_require__(/*! ./uni.promisify.adaptor */ 32);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
uni.$http = _requestMiniprogram.$http;
// 配置请求根路径
_requestMiniprogram.$http.baseUrl = 'https://www.uinav.com';

// 请求开始之前做一些事情
_requestMiniprogram.$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...'
  });
};

// 请求完成之后做一些事情
_requestMiniprogram.$http.afterRequest = function () {
  uni.hideLoading();
};
_vue.default.config.productionTip = false;
App.mpType = 'app';
var app = new _vue.default(_objectSpread(_objectSpread({}, App), {}, {
  store: _store.default
}));
createApp(app).$mount();

//项目vue2 ，微信基础库3.4.10
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createApp"]))

/***/ })
],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map