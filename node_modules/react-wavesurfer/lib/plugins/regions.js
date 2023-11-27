(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["plugins/regions"] = factory(require("react"), require("prop-types"));
	else
		root["Wavesurfer"] = root["Wavesurfer"] || {}, root["Wavesurfer"]["plugins/regions"] = factory(root["React"], root["prop-types"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var REGIONS_EVENTS = ['region-in', 'region-out', 'region-mouseenter', 'region-mouseleave', 'region-click', 'region-dblclick', 'region-updated', 'region-update-end', 'region-removed', 'region-play'];

var REGION_EVENTS = ['in', 'out', 'remove', 'update', 'click', 'dbclick', 'over', 'leave'];

/**
 * @description Capitalise the first letter of a string
 */
function capitaliseFirstLetter(string) {
  return string.split('-').map(function (part) {
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join('');
}

var Regions = function (_Component) {
  _inherits(Regions, _Component);

  function Regions(props) {
    _classCallCheck(this, Regions);

    // this is so that jscs does not force us to go functional
    var _this = _possibleConstructorReturn(this, (Regions.__proto__ || Object.getPrototypeOf(Regions)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Regions, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.isReady) {
        this._init.call(this);
      }

      this.props.wavesurfer.on('ready', this._init.bind(this));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // only update if the wavesurfer instance has been ready
      if (!this.props.isReady) {
        return;
      }

      // cache reference to old regions
      var oldRegions = Object.create(this.props.wavesurfer.regions.list);
      var newRegionId = void 0;
      var oldRegionId = void 0;

      for (newRegionId in nextProps.regions) {
        if ({}.hasOwnProperty.call(nextProps.regions, newRegionId)) {
          var newRegion = nextProps.regions[newRegionId];

          // remove from oldRegions
          delete oldRegions[newRegionId];

          // new regions
          if (!this.props.wavesurfer.regions.list[newRegionId]) {
            this._hookUpRegionEvents(nextProps.wavesurfer.addRegion(newRegion));

            // update regions
          } else if (oldRegions[newRegionId] && (oldRegions[newRegionId].start !== newRegion.start || oldRegions[newRegionId].end !== newRegion.end)) {
            nextProps.wavesurfer.regions.list[newRegionId].update({
              start: newRegion.start,
              end: newRegion.end
            });
          }
        }
      }

      // remove any old regions
      for (oldRegionId in oldRegions) {
        if ({}.hasOwnProperty.call(oldRegions, oldRegionId)) {
          nextProps.wavesurfer.regions.list[oldRegionId].remove();
        }
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      REGION_EVENTS.forEach(function (e) {
        _this2.props.wavesurfer.un(e);
      });
    }
  }, {
    key: '_init',
    value: function _init() {
      var _this3 = this;

      var _props = this.props,
          wavesurfer = _props.wavesurfer,
          regions = _props.regions;

      var newRegionId = void 0;

      REGIONS_EVENTS.forEach(function (e) {
        var propCallback = _this3.props['on' + capitaliseFirstLetter(e)];
        if (!propCallback) return;

        wavesurfer.on(e, function () {
          for (var _len = arguments.length, originalArgs = Array(_len), _key = 0; _key < _len; _key++) {
            originalArgs[_key] = arguments[_key];
          }

          propCallback({
            wavesurfer: wavesurfer,
            originalArgs: originalArgs
          });
        });
      });

      // add regions and hook up callbacks to region objects
      for (newRegionId in regions) {
        if ({}.hasOwnProperty.call(regions, newRegionId)) {
          this._hookUpRegionEvents(wavesurfer.addRegion(regions[newRegionId]));
        }
      }
    }
  }, {
    key: '_hookUpRegionEvents',
    value: function _hookUpRegionEvents(region) {
      var _this4 = this;

      REGION_EVENTS.forEach(function (e) {
        var propCallback = _this4.props['onSingleRegion' + capitaliseFirstLetter(e)];
        var wavesurfer = _this4.props.wavesurfer;

        if (propCallback) {
          region.on(e, function () {
            for (var _len2 = arguments.length, originalArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              originalArgs[_key2] = arguments[_key2];
            }

            propCallback({
              wavesurfer: wavesurfer,
              originalArgs: originalArgs,
              region: region
            });
          });
        }
      });

      region.on('remove', function () {
        REGION_EVENTS.forEach(function (e) {
          region.un(e);
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return false;
    }
  }]);

  return Regions;
}(_react.Component);

Regions.propTypes = {
  isReady: _propTypes2.default.bool,
  regions: _propTypes2.default.object,
  wavesurfer: _propTypes2.default.object
};

Regions.defaultProps = {
  regions: []
};

exports.default = Regions;

/***/ })
/******/ ]);
});
//# sourceMappingURL=regions.js.map