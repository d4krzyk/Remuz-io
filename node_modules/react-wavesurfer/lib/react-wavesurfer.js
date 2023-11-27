(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("wavesurfer.js"), require("react"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["wavesurfer", "react", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["Wavesurfer"] = factory(require("wavesurfer.js"), require("react"), require("prop-types"));
	else
		root["Wavesurfer"] = factory(root["WaveSurfer"], root["React"], root["prop-types"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(WaveSurfer) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _deepAssign = __webpack_require__(4);

var _deepAssign2 = _interopRequireDefault(_deepAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EVENTS = ['audioprocess', 'error', 'finish', 'loading', 'mouseup', 'pause', 'play', 'ready', 'scroll', 'seek', 'zoom'];

/**
 * @description Capitalise the first letter of a string
 */
function capitaliseFirstLetter(string) {
  return string.split('-').map(function (part) {
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join('');
}

/**
 * @description Throws an error if the prop is defined and not an integer or not positive
 */
function positiveIntegerProptype(props, propName, componentName) {
  var n = props[propName];
  if (n !== undefined && (typeof n !== 'number' || n !== parseInt(n, 10) || n < 0)) {
    return new Error('Invalid ' + propName + ' supplied to ' + componentName + ',\n      expected a positive integer');
  }

  return null;
}

var resizeThrottler = function resizeThrottler(fn) {
  return function () {
    var resizeTimeout = void 0;

    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        fn();
      }, 66);
    }
  };
};

var Wavesurfer = function (_Component) {
  _inherits(Wavesurfer, _Component);

  function Wavesurfer(props) {
    _classCallCheck(this, Wavesurfer);

    var _this = _possibleConstructorReturn(this, (Wavesurfer.__proto__ || Object.getPrototypeOf(Wavesurfer)).call(this, props));

    _this.state = {
      isReady: false
    };

    if ((typeof WaveSurfer === 'undefined' ? 'undefined' : _typeof(WaveSurfer)) === undefined) {
      throw new Error('WaveSurfer is undefined!');
    }

    _this._wavesurfer = Object.create(WaveSurfer);
    _this._loadMediaElt = _this._loadMediaElt.bind(_this);
    _this._loadAudio = _this._loadAudio.bind(_this);
    _this._seekTo = _this._seekTo.bind(_this);

    if (_this.props.responsive) {
      _this._handleResize = resizeThrottler(function () {
        // pause playback for resize operation
        if (_this.props.playing) {
          _this._wavesurfer.pause();
        }

        // resize the waveform
        _this._wavesurfer.drawBuffer();

        // We allow resize before file isloaded, since we can get wave data from outside,
        // so there might not be a file loaded when resizing
        if (_this.state.isReady) {
          // restore previous position
          _this._seekTo(_this.props.pos);
        }

        // restore playback
        if (_this.props.playing) {
          _this._wavesurfer.play();
        }
      });
    }
    return _this;
  }

  _createClass(Wavesurfer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var options = (0, _deepAssign2.default)({}, this.props.options, {
        container: this.wavesurferEl
      });

      // media element loading is only supported by MediaElement backend
      if (this.props.mediaElt) {
        options.backend = 'MediaElement';
      }

      this._wavesurfer.init(options);

      // file was loaded, wave was drawn
      this._wavesurfer.on('ready', function () {
        _this2.setState({
          isReady: true,
          pos: _this2.props.pos
        });

        // set initial position
        if (_this2.props.pos) {
          _this2._seekTo(_this2.props.pos);
        }

        // set initial volume
        if (_this2.props.volume) {
          _this2._wavesurfer.setVolume(_this2.props.volume);
        }

        // set initial playing state
        if (_this2.props.playing) {
          _this2._wavesurfer.play();
        }

        // set initial zoom
        if (_this2.props.zoom) {
          _this2._wavesurfer.zoom(_this2.props.zoom);
        }
      });

      this._wavesurfer.on('audioprocess', function (pos) {
        _this2.setState({
          pos: pos
        });
        _this2.props.onPosChange({
          wavesurfer: _this2._wavesurfer,
          originalArgs: [pos]
        });
      });

      // `audioprocess` is not fired when seeking, so we have to plug into the
      // `seek` event and calculate the equivalent in seconds (seek event
      // receives a position float 0-1) – See the README.md for explanation why we
      // need this
      this._wavesurfer.on('seek', function (pos) {
        if (_this2.state.isReady) {
          var formattedPos = _this2._posToSec(pos);
          _this2.setState({
            formattedPos: formattedPos
          });
          _this2.props.onPosChange({
            wavesurfer: _this2._wavesurfer,
            originalArgs: [formattedPos]
          });
        }
      });

      // hook up events to callback handlers passed in as props
      EVENTS.forEach(function (e) {
        var propCallback = _this2.props['on' + capitaliseFirstLetter(e)];
        var wavesurfer = _this2._wavesurfer;
        if (propCallback) {
          _this2._wavesurfer.on(e, function () {
            for (var _len = arguments.length, originalArgs = Array(_len), _key = 0; _key < _len; _key++) {
              originalArgs[_key] = arguments[_key];
            }

            propCallback({
              wavesurfer: wavesurfer,
              originalArgs: originalArgs
            });
          });
        }
      });

      // if audioFile prop, load file
      if (this.props.audioFile) {
        this._loadAudio(this.props.audioFile, this.props.audioPeaks);
      }

      // if mediaElt prop, load media Element
      if (this.props.mediaElt) {
        this._loadMediaElt(this.props.mediaElt, this.props.audioPeaks);
      }

      if (this.props.responsive) {
        window.addEventListener('resize', this._handleResize, false);
      }
    }

    // update wavesurfer rendering manually

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var newSource = false;
      var seekToInNewFile = void 0;

      // update audioFile
      if (this.props.audioFile !== nextProps.audioFile) {
        this.setState({
          isReady: false
        });
        this._loadAudio(nextProps.audioFile, nextProps.audioPeaks);
        newSource = true;
      }

      // update mediaElt
      if (this.props.mediaElt !== nextProps.mediaElt) {
        this.setState({
          isReady: false
        });
        this._loadMediaElt(nextProps.mediaElt, nextProps.audioPeaks);
        newSource = true;
      }

      // update peaks
      if (this.props.audioPeaks !== nextProps.audioPeaks) {
        if (nextProps.mediaElt) {
          this._loadMediaElt(nextProps.mediaElt, nextProps.audioPeaks);
        } else {
          this._loadAudio(nextProps.audioFile, nextProps.audioPeaks);
        }
      }

      // update position
      if (nextProps.pos !== undefined && this.state.isReady && nextProps.pos !== this.props.pos && nextProps.pos !== this.state.pos) {
        if (newSource) {
          seekToInNewFile = this._wavesurfer.on('ready', function () {
            _this3._seekTo(nextProps.pos);
            seekToInNewFile.un();
          });
        } else {
          this._seekTo(nextProps.pos);
        }
      }

      // update playing state
      if (!newSource && (this.props.playing !== nextProps.playing || this._wavesurfer.isPlaying() !== nextProps.playing)) {
        if (nextProps.playing) {
          this._wavesurfer.play();
        } else {
          this._wavesurfer.pause();
        }
      }

      // update volume
      if (this.props.volume !== nextProps.volume) {
        this._wavesurfer.setVolume(nextProps.volume);
      }

      // update volume
      if (this.props.zoom !== nextProps.zoom) {
        this._wavesurfer.zoom(nextProps.zoom);
      }

      // update audioRate
      if (this.props.options.audioRate !== nextProps.options.audioRate) {
        this._wavesurfer.setPlaybackRate(nextProps.options.audioRate);
      }

      // turn responsive on
      if (nextProps.responsive && this.props.responsive !== nextProps.responsive) {
        window.addEventListener('resize', this._handleResize, false);
      }

      // turn responsive off
      if (!nextProps.responsive && this.props.responsive !== nextProps.responsive) {
        window.removeEventListener('resize', this._handleResize);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this4 = this;

      // remove listeners
      EVENTS.forEach(function (e) {
        _this4._wavesurfer.un(e);
      });

      // destroy wavesurfer instance
      this._wavesurfer.destroy();

      if (this.props.responsive) {
        window.removeEventListener('resize', this._handleResize);
      }
    }

    // receives seconds and transforms this to the position as a float 0-1

  }, {
    key: '_secToPos',
    value: function _secToPos(sec) {
      return 1 / this._wavesurfer.getDuration() * sec;
    }

    // receives position as a float 0-1 and transforms this to seconds

  }, {
    key: '_posToSec',
    value: function _posToSec(pos) {
      return pos * this._wavesurfer.getDuration();
    }

    // pos is in seconds, the 0-1 proportional position we calculate here …

  }, {
    key: '_seekTo',
    value: function _seekTo(sec) {
      var pos = this._secToPos(sec);
      if (this.props.options.autoCenter) {
        this._wavesurfer.seekAndCenter(pos);
      } else {
        this._wavesurfer.seekTo(pos);
      }
    }

    // load a media element selector or HTML element
    // if selector, get the HTML element for it
    // and pass to _loadAudio

  }, {
    key: '_loadMediaElt',
    value: function _loadMediaElt(selectorOrElt, audioPeaks) {
      if (selectorOrElt instanceof window.HTMLElement) {
        this._loadAudio(selectorOrElt, audioPeaks);
      } else {
        if (!window.document.querySelector(selectorOrElt)) {
          throw new Error('Media Element not found!');
        }

        this._loadAudio(window.document.querySelector(selectorOrElt), audioPeaks);
      }
    }

    // pass audio data to wavesurfer

  }, {
    key: '_loadAudio',
    value: function _loadAudio(audioFileOrElt, audioPeaks) {
      if (audioFileOrElt instanceof window.HTMLElement) {
        // media element
        this._wavesurfer.loadMediaElement(audioFileOrElt, audioPeaks);
      } else if (typeof audioFileOrElt === 'string') {
        // bog-standard string is handled by load method and ajax call
        this._wavesurfer.load(audioFileOrElt, audioPeaks);
      } else if (audioFileOrElt instanceof window.Blob || audioFileOrElt instanceof window.File) {
        // blob or file is loaded with loadBlob method
        this._wavesurfer.loadBlob(audioFileOrElt, audioPeaks);
      } else {
        throw new Error('Wavesurfer._loadAudio expects prop audioFile\n        to be either HTMLElement, string or file/blob');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var childrenWithProps = this.props.children ? _react2.default.Children.map(this.props.children, function (child) {
        return _react2.default.cloneElement(child, {
          wavesurfer: _this5._wavesurfer,
          isReady: _this5.state.isReady
        });
      }) : false;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', {
          ref: function ref(c) {
            _this5.wavesurferEl = c;
          }
        }),
        childrenWithProps
      );
    }
  }]);

  return Wavesurfer;
}(_react.Component);

Wavesurfer.propTypes = {
  playing: _propTypes2.default.bool,
  pos: _propTypes2.default.number,
  audioFile: function audioFile(props, propName, componentName) {
    var prop = props[propName];
    if (prop && typeof prop !== 'string' && !(prop instanceof window.Blob) && !(prop instanceof window.File)) {
      return new Error('Invalid ' + propName + ' supplied to ' + componentName + '\n        expected either string or file/blob');
    }

    return null;
  },

  mediaElt: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(window.HTMLElement)]),
  audioPeaks: _propTypes2.default.array,
  volume: _propTypes2.default.number,
  zoom: _propTypes2.default.number,
  responsive: _propTypes2.default.bool,
  onPosChange: _propTypes2.default.func,
  children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.array]),
  options: _propTypes2.default.shape({
    audioRate: _propTypes2.default.number,
    backend: _propTypes2.default.oneOf(['WebAudio', 'MediaElement']),
    barWidth: function barWidth(props, propName, componentName) {
      var prop = props[propName];
      if (prop !== undefined && typeof prop !== 'number') {
        return new Error('Invalid ' + propName + ' supplied to ' + componentName + '\n          expected either undefined or number');
      }

      return null;
    },

    cursorColor: _propTypes2.default.string,
    cursorWidth: positiveIntegerProptype,
    dragSelection: _propTypes2.default.bool,
    fillParent: _propTypes2.default.bool,
    height: positiveIntegerProptype,
    hideScrollbar: _propTypes2.default.bool,
    interact: _propTypes2.default.bool,
    loopSelection: _propTypes2.default.bool,
    mediaControls: _propTypes2.default.bool,
    minPxPerSec: positiveIntegerProptype,
    normalize: _propTypes2.default.bool,
    pixelRatio: _propTypes2.default.number,
    progressColor: _propTypes2.default.string,
    scrollParent: _propTypes2.default.bool,
    skipLength: _propTypes2.default.number,
    waveColor: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(window.CanvasGradient)]),
    autoCenter: _propTypes2.default.bool
  })
};

Wavesurfer.defaultProps = {
  playing: false,
  pos: 0,
  options: WaveSurfer.defaultParams,
  responsive: true,
  onPosChange: function onPosChange() {}
};

exports.default = Wavesurfer;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObj = __webpack_require__(5);
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Sources cannot be null or undefined');
	}

	return Object(val);
}

function assignKey(to, from, key) {
	var val = from[key];

	if (val === undefined || val === null) {
		return;
	}

	if (hasOwnProperty.call(to, key)) {
		if (to[key] === undefined || to[key] === null) {
			throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
		}
	}

	if (!hasOwnProperty.call(to, key) || !isObj(val)) {
		to[key] = val;
	} else {
		to[key] = assign(Object(to[key]), from[key]);
	}
}

function assign(to, from) {
	if (to === from) {
		return to;
	}

	from = Object(from);

	for (var key in from) {
		if (hasOwnProperty.call(from, key)) {
			assignKey(to, from, key);
		}
	}

	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(from);

		for (var i = 0; i < symbols.length; i++) {
			if (propIsEnumerable.call(from, symbols[i])) {
				assignKey(to, from, symbols[i]);
			}
		}
	}

	return to;
}

module.exports = function deepAssign(target) {
	target = toObject(target);

	for (var s = 1; s < arguments.length; s++) {
		assign(target, arguments[s]);
	}

	return target;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=react-wavesurfer.js.map