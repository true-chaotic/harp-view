// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"helpers/insertAfter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertAfter;

/**
 * insertAfter helper
 *
 * @param {Element} newNode
 * @param {Element} referenceNode
 */
function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
},{}],"helpers/translate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var translations = {
  'en': {
    'error.bad-tune': "Empty tune or unknown format",
    'play': 'Play',
    'pause': 'Pause',
    'stop': 'Stop'
  },
  'ru': {
    'error.bad-tune': 'Пустая мелодия или ошибка в записи',
    'play': 'Играть',
    'pause': 'Пауза',
    'stop': 'Остановить'
  }
};
var lang = 'en';
/**
 * Translate by key
 *
 * @param key
 * @returns {string}
 */

var translate = function translate(key) {
  return translations && translations[lang] && translations[lang][key] || key;
};

var _default = translate;
exports.default = _default;
},{}],"helpers/tuneValid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tuneValid;

/**
 * Validates tune
 *  - not empty
 *  @TODO: conforms to chosen standard (e.g. abc)
 *
 * @param {string} tune
 * @returns {boolean}
 */
function tuneValid(tune) {
  return Boolean(tune);
}
},{}],"helpers/createElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createElement;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Creates element with class and listeners
 *
 * @param {string} name
 * @param {string|array} [classes=[]]
 * @param {object} [listeners={}]
 * @returns {Element}
 */
function createElement(name) {
  var _element$classList;

  var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var listeners = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var element = document.createElement(name);
  var classesArray = typeof classes === 'string' ? [classes] : classes;

  (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(classesArray));

  Object.keys(listeners).forEach(function (event) {
    element.addEventListener(event, listeners[event]);
  });
  return element;
}
},{}],"../node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"viewer/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Viewer;

var _createElement = _interopRequireDefault(require("../helpers/createElement"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var styles = ".notes-viewer {\r\n  text-align: center;\r\n  padding: 5%;\r\n}\r\n\r\n.notes-viewer__column {\r\n  margin: 0;\r\n  padding: 0;\r\n  list-style: none;\r\n  width: 50%;\r\n  display: inline-block;\r\n  vertical-align: top;\r\n}\r\n\r\n.notes-viewer__container {\r\n  display: block;\r\n}\r\n\r\n.notes-viewer__note {\r\n  border: 1px solid black;\r\n  text-align: center;\r\n  min-width: 1em;\r\n  min-height: 1em;\r\n  line-height: 1;\r\n  display: inline-block;\r\n  padding: 0.5em;\r\n  border-radius: 50%;\r\n  margin: 5%;\r\n  font-size: 0.6em;\r\n}\r\n\r\n.notes-viewer__note_active {\r\n  background-color: green;\r\n  color: white;\r\n}\r\n\r\n";
var styleAdded = false;

var addStyles = function addStyles() {
  if (styleAdded) {
    return;
  }

  var style = document.createElement('style');
  style.innerHTML = styles;
  document.head.appendChild(style);
  styleAdded = true;
};

var getNoteModifier = function getNoteModifier(note) {
  return note.replace('\'', '-high').replace(',', '-low');
};

var baseContainerClass = 'notes-viewer__container';
var baseNoteClass = 'notes-viewer__note';
var activeClass = "".concat(baseNoteClass, "_active");

function Viewer() {
  // const notes = "F, C, D, E, F G A B c d e f | g a b c' d' e' f' g' a' x";
  var notes = "| e c a f D B G E, D, C, F, | a' g' f' d b g E C A F x |";
  var $el = (0, _createElement.default)('div', 'notes-viewer');
  addStyles();
  var $column;
  var elements = notes.split(' ').reduce(function (result, note, index, arr) {
    if (note === '|') {
      if ($column) {
        $el.appendChild($column);
      }

      if (index !== arr.length - 1) {
        $column = (0, _createElement.default)('ul', 'notes-viewer__column');
      }
    } else {
      var noteContainer = (0, _createElement.default)('li', [baseContainerClass, "".concat(baseContainerClass, "_").concat(getNoteModifier(note))]);
      var noteElement = (0, _createElement.default)('span', baseNoteClass);
      noteElement.innerText = note;
      noteContainer.appendChild(noteElement);
      $column.appendChild(noteContainer);
      result[note] = noteElement;
    }

    return result;
  }, {});
  var highLighted = new Set();

  function dim(note) {
    if (elements[note]) {
      elements[note].classList.remove(activeClass);
      highLighted.delete(note);
    }
  }

  function highLight(note) {
    if (elements[note]) {
      elements[note].classList.add(activeClass);
      highLighted.add(note);
    }
  }

  function dimAll() {
    _toConsumableArray(highLighted).forEach(dim);
  }

  return {
    $el: $el,
    highLight: highLight,
    dim: dim,
    dimAll: dimAll
  };
}
},{"../helpers/createElement":"helpers/createElement.js","fs":"../node_modules/parcel-bundler/src/builtins/_empty.js"}],"vendor/ion.sound.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Ion.Sound
 * version 3.0.7 Build 89
 * © Denis Ineshin, 2016
 *
 * Project page:    http://ionden.com/a/plugins/ion.sound/en.html
 * GitHub page:     https://github.com/IonDen/ion.sound
 *
 * Released under MIT licence:
 * http://ionden.com/a/plugins/licence-en.html
 */
;

(function (window, navigator, $, undefined) {
  "use strict";

  window.ion = window.ion || {};

  if (ion.sound) {
    return;
  }

  var warn = function warn(text) {
    if (!text) text = "undefined";

    if (window.console) {
      if (console.warn && typeof console.warn === "function") {
        console.warn(text);
      } else if (console.log && typeof console.log === "function") {
        console.log(text);
      }

      var d = $ && $("#debug");

      if (d && d.length) {
        var a = d.html();
        d.html(a + text + '<br/>');
      }
    }
  };

  var extend = function extend(parent, child) {
    var prop;
    child = child || {};

    for (prop in parent) {
      if (parent.hasOwnProperty(prop)) {
        child[prop] = parent[prop];
      }
    }

    return child;
  };
  /**
   * DISABLE for unsupported browsers
   */


  if (typeof Audio !== "function" && (typeof Audio === "undefined" ? "undefined" : _typeof(Audio)) !== "object") {
    var func = function func() {
      warn("HTML5 Audio is not supported in this browser");
    };

    ion.sound = func;
    ion.sound.play = func;
    ion.sound.stop = func;
    ion.sound.pause = func;
    ion.sound.preload = func;
    ion.sound.destroy = func;
    func();
    return;
  }
  /**
   * CORE
   * - creating sounds collection
   * - public methods
   */


  var is_iOS = /iPad|iPhone|iPod/.test(navigator.appVersion),
      sounds_num = 0,
      settings = {},
      sounds = {},
      i;

  if (!settings.supported && is_iOS) {
    settings.supported = ["mp3", "mp4", "aac"];
  } else if (!settings.supported) {
    settings.supported = ["mp3", "ogg", "mp4", "aac", "wav"];
  }

  var createSound = function createSound(obj) {
    var name = obj.alias || obj.name;

    if (!sounds[name]) {
      sounds[name] = new Sound(obj);
      sounds[name].init();
    }
  };

  ion.sound = function (options) {
    extend(options, settings);
    settings.path = settings.path || "";
    settings.volume = settings.volume || 1;
    settings.preload = settings.preload || false;
    settings.multiplay = settings.multiplay || false;
    settings.loop = settings.loop || false;
    settings.sprite = settings.sprite || null;
    settings.scope = settings.scope || null;
    settings.ready_callback = settings.ready_callback || null;
    settings.ended_callback = settings.ended_callback || null;
    sounds_num = settings.sounds.length;

    if (!sounds_num) {
      warn("No sound-files provided!");
      return;
    }

    for (i = 0; i < sounds_num; i++) {
      createSound(settings.sounds[i]);
    }
  };

  ion.sound.VERSION = "3.0.7";

  ion.sound._method = function (method, name, options) {
    if (name) {
      sounds[name] && sounds[name][method](options);
    } else {
      for (i in sounds) {
        if (!sounds.hasOwnProperty(i) || !sounds[i]) {
          continue;
        }

        sounds[i][method](options);
      }
    }
  };

  ion.sound.preload = function (name, options) {
    options = options || {};
    extend({
      preload: true
    }, options);

    ion.sound._method("init", name, options);
  };

  ion.sound.destroy = function (name) {
    ion.sound._method("destroy", name);

    if (name) {
      sounds[name] = null;
    } else {
      for (i in sounds) {
        if (!sounds.hasOwnProperty(i)) {
          continue;
        }

        if (sounds[i]) {
          sounds[i] = null;
        }
      }
    }
  };

  ion.sound.play = function (name, options) {
    ion.sound._method("play", name, options);
  };

  ion.sound.stop = function (name, options) {
    ion.sound._method("stop", name, options);
  };

  ion.sound.pause = function (name, options) {
    ion.sound._method("pause", name, options);
  };

  ion.sound.volume = function (name, options) {
    ion.sound._method("volume", name, options);
  };

  if ($) {
    $.ionSound = ion.sound;
  }
  /**
   * Web Audio API core
   * - for most advanced browsers
   */


  var AudioContext = window.AudioContext || window.webkitAudioContext,
      audio;

  if (AudioContext) {
    audio = new AudioContext();
  }

  var Sound = function Sound(options) {
    this.options = extend(settings);
    delete this.options.sounds;
    extend(options, this.options);
    this.request = null;
    this.streams = {};
    this.result = {};
    this.ext = 0;
    this.url = "";
    this.loaded = false;
    this.decoded = false;
    this.no_file = false;
    this.autoplay = false;
  };

  Sound.prototype = {
    init: function init(options) {
      if (options) {
        extend(options, this.options);
      }

      if (this.options.preload) {
        this.load();
      }
    },
    destroy: function destroy() {
      var stream;

      for (i in this.streams) {
        stream = this.streams[i];

        if (stream) {
          stream.destroy();
          stream = null;
        }
      }

      this.streams = {};
      this.result = null;
      this.options.buffer = null;
      this.options = null;

      if (this.request) {
        this.request.removeEventListener("load", this.ready.bind(this), false);
        this.request.removeEventListener("error", this.error.bind(this), false);
        this.request.abort();
        this.request = null;
      }
    },
    createUrl: function createUrl() {
      var no_cache = new Date().valueOf();
      this.url = this.options.path + encodeURIComponent(this.options.name) + "." + this.options.supported[this.ext] + "?" + no_cache;
    },
    load: function load() {
      if (this.no_file) {
        warn("No sources for \"" + this.options.name + "\" sound :(");
        return;
      }

      if (this.request) {
        return;
      }

      this.createUrl();
      this.request = new XMLHttpRequest();
      this.request.open("GET", this.url, true);
      this.request.responseType = "arraybuffer";
      this.request.addEventListener("load", this.ready.bind(this), false);
      this.request.addEventListener("error", this.error.bind(this), false);
      this.request.send();
    },
    reload: function reload() {
      this.ext++;

      if (this.options.supported[this.ext]) {
        this.load();
      } else {
        this.no_file = true;
        warn("No sources for \"" + this.options.name + "\" sound :(");
      }
    },
    ready: function ready(data) {
      this.result = data.target;

      if (this.result.readyState !== 4) {
        this.reload();
        return;
      }

      if (this.result.status !== 200 && this.result.status !== 0) {
        warn(this.url + " was not found on server!");
        this.reload();
        return;
      }

      this.request.removeEventListener("load", this.ready.bind(this), false);
      this.request.removeEventListener("error", this.error.bind(this), false);
      this.request = null;
      this.loaded = true; //warn("Loaded: " + this.options.name + "." + settings.supported[this.ext]);

      this.decode();
    },
    decode: function decode() {
      if (!audio) {
        return;
      }

      audio.decodeAudioData(this.result.response, this.setBuffer.bind(this), this.error.bind(this));
    },
    setBuffer: function setBuffer(buffer) {
      this.options.buffer = buffer;
      this.decoded = true; //warn("Decoded: " + this.options.name + "." + settings.supported[this.ext]);

      var config = {
        name: this.options.name,
        alias: this.options.alias,
        ext: this.options.supported[this.ext],
        duration: this.options.buffer.duration
      };

      if (this.options.ready_callback && typeof this.options.ready_callback === "function") {
        this.options.ready_callback.call(this.options.scope, config);
      }

      if (this.options.sprite) {
        for (i in this.options.sprite) {
          this.options.start = this.options.sprite[i][0];
          this.options.end = this.options.sprite[i][1];
          this.streams[i] = new Stream(this.options, i);
        }
      } else {
        this.streams[0] = new Stream(this.options);
      }

      if (this.autoplay) {
        this.autoplay = false;
        this.play();
      }
    },
    error: function error() {
      this.reload();
    },
    play: function play(options) {
      delete this.options.part;

      if (options) {
        extend(options, this.options);
      }

      if (!this.loaded) {
        this.autoplay = true;
        this.load();
        return;
      }

      if (this.no_file || !this.decoded) {
        return;
      }

      if (this.options.sprite) {
        if (this.options.part) {
          this.streams[this.options.part].play(this.options);
        } else {
          for (i in this.options.sprite) {
            this.streams[i].play(this.options);
          }
        }
      } else {
        this.streams[0].play(this.options);
      }
    },
    stop: function stop(options) {
      if (this.options.sprite) {
        if (options) {
          this.streams[options.part].stop();
        } else {
          for (i in this.options.sprite) {
            this.streams[i].stop();
          }
        }
      } else {
        this.streams[0].stop();
      }
    },
    pause: function pause(options) {
      if (this.options.sprite) {
        if (options) {
          this.streams[options.part].pause();
        } else {
          for (i in this.options.sprite) {
            this.streams[i].pause();
          }
        }
      } else {
        this.streams[0].pause();
      }
    },
    volume: function volume(options) {
      var stream;

      if (options) {
        extend(options, this.options);
      } else {
        return;
      }

      if (this.options.sprite) {
        if (this.options.part) {
          stream = this.streams[this.options.part];
          stream && stream.setVolume(this.options);
        } else {
          for (i in this.options.sprite) {
            stream = this.streams[i];
            stream && stream.setVolume(this.options);
          }
        }
      } else {
        stream = this.streams[0];
        stream && stream.setVolume(this.options);
      }
    }
  };

  var Stream = function Stream(options, sprite_part) {
    this.alias = options.alias;
    this.name = options.name;
    this.sprite_part = sprite_part;
    this.buffer = options.buffer;
    this.start = options.start || 0;
    this.end = options.end || this.buffer.duration;
    this.multiplay = options.multiplay || false;
    this.volume = options.volume || 1;
    this.scope = options.scope;
    this.ended_callback = options.ended_callback;
    this.setLoop(options);
    this.source = null;
    this.gain = null;
    this.playing = false;
    this.paused = false;
    this.time_started = 0;
    this.time_ended = 0;
    this.time_played = 0;
    this.time_offset = 0;
  };

  Stream.prototype = {
    destroy: function destroy() {
      this.stop();
      this.buffer = null;
      this.source = null;
      this.gain && this.gain.disconnect();
      this.source && this.source.disconnect();
      this.gain = null;
      this.source = null;
    },
    setLoop: function setLoop(options) {
      if (options.loop === true) {
        this.loop = 9999999;
      } else if (typeof options.loop === "number") {
        this.loop = +options.loop - 1;
      } else {
        this.loop = false;
      }
    },
    update: function update(options) {
      this.setLoop(options);

      if ("volume" in options) {
        this.volume = options.volume;
      }
    },
    play: function play(options) {
      if (options) {
        this.update(options);
      }

      if (!this.multiplay && this.playing) {
        return;
      }

      this.gain = audio.createGain();
      this.source = audio.createBufferSource();
      this.source.buffer = this.buffer;
      this.source.connect(this.gain);
      this.gain.connect(audio.destination);
      this.gain.gain.value = this.volume;
      this.source.onended = this.ended.bind(this);

      this._play();
    },
    _play: function _play() {
      var start, end;

      if (this.paused) {
        start = this.start + this.time_offset;
        end = this.end - this.time_offset;
      } else {
        start = this.start;
        end = this.end;
      }

      if (end <= 0) {
        this.clear();
        return;
      }

      if (typeof this.source.start === "function") {
        this.source.start(0, start, end);
      } else {
        this.source.noteOn(0, start, end);
      }

      this.playing = true;
      this.paused = false;
      this.time_started = new Date().valueOf();
    },
    stop: function stop() {
      if (this.playing && this.source) {
        if (typeof this.source.stop === "function") {
          this.source.stop(0);
        } else {
          this.source.noteOff(0);
        }
      }

      this.clear();
    },
    pause: function pause() {
      if (this.paused) {
        this.play();
        return;
      }

      if (!this.playing) {
        return;
      }

      this.source && this.source.stop(0);
      this.paused = true;
    },
    ended: function ended() {
      this.playing = false;
      this.time_ended = new Date().valueOf();
      this.time_played = (this.time_ended - this.time_started) / 1000;
      this.time_offset += this.time_played;

      if (this.time_offset >= this.end || this.end - this.time_offset < 0.015) {
        this._ended();

        this.clear();

        if (this.loop) {
          this.loop--;
          this.play();
        }
      }
    },
    _ended: function _ended() {
      var config = {
        name: this.name,
        alias: this.alias,
        part: this.sprite_part,
        start: this.start,
        duration: this.end
      };

      if (this.ended_callback && typeof this.ended_callback === "function") {
        this.ended_callback.call(this.scope, config);
      }
    },
    clear: function clear() {
      this.time_played = 0;
      this.time_offset = 0;
      this.paused = false;
      this.playing = false;
    },
    setVolume: function setVolume(options) {
      this.volume = options.volume;

      if (this.gain) {
        this.gain.gain.value = this.volume;
      }
    }
  };

  if (audio) {
    return;
  }
  /**
   * Fallback for HTML5 audio
   * - for not so modern browsers
   */


  var checkSupport = function checkSupport() {
    var sound = new Audio(),
        can_play_mp3 = sound.canPlayType('audio/mpeg'),
        can_play_ogg = sound.canPlayType('audio/ogg'),
        can_play_aac = sound.canPlayType('audio/mp4; codecs="mp4a.40.2"'),
        item,
        i;

    for (i = 0; i < settings.supported.length; i++) {
      item = settings.supported[i];

      if (!can_play_mp3 && item === "mp3") {
        settings.supported.splice(i, 1);
      }

      if (!can_play_ogg && item === "ogg") {
        settings.supported.splice(i, 1);
      }

      if (!can_play_aac && item === "aac") {
        settings.supported.splice(i, 1);
      }

      if (!can_play_aac && item === "mp4") {
        settings.supported.splice(i, 1);
      }
    }

    sound = null;
  };

  checkSupport();
  Sound.prototype = {
    init: function init(options) {
      if (options) {
        extend(options, this.options);
      }

      this.inited = true;

      if (this.options.preload) {
        this.load();
      }
    },
    destroy: function destroy() {
      var stream;

      for (i in this.streams) {
        stream = this.streams[i];

        if (stream) {
          stream.destroy();
          stream = null;
        }
      }

      this.streams = {};
      this.loaded = false;
      this.inited = false;
    },
    load: function load() {
      var part;
      this.options.preload = true;
      this.options._ready = this.ready;
      this.options._scope = this;

      if (this.options.sprite) {
        for (i in this.options.sprite) {
          part = this.options.sprite[i];
          this.options.start = part[0];
          this.options.end = part[1];
          this.streams[i] = new Stream(this.options, i);
        }
      } else {
        this.streams[0] = new Stream(this.options);
      }
    },
    ready: function ready(duration) {
      if (this.loaded) {
        return;
      }

      this.loaded = true;
      var config = {
        name: this.options.name,
        alias: this.options.alias,
        ext: this.options.supported[this.ext],
        duration: duration
      };

      if (this.options.ready_callback && typeof this.options.ready_callback === "function") {
        this.options.ready_callback.call(this.options.scope, config);
      }

      if (this.autoplay) {
        this.autoplay = false;
        this.play();
      }
    },
    play: function play(options) {
      if (!this.inited) {
        return;
      }

      delete this.options.part;

      if (options) {
        extend(options, this.options);
      }

      console.log(1);

      if (!this.loaded) {
        if (!this.options.preload) {
          this.autoplay = true;
          this.load();
        } else {
          this.autoplay = true;
        }

        return;
      }

      if (this.options.sprite) {
        if (this.options.part) {
          this.streams[this.options.part].play(this.options);
        } else {
          for (i in this.options.sprite) {
            this.streams[i].play(this.options);
          }
        }
      } else {
        this.streams[0].play(this.options);
      }
    },
    stop: function stop(options) {
      if (!this.inited) {
        return;
      }

      if (this.options.sprite) {
        if (options) {
          this.streams[options.part].stop();
        } else {
          for (i in this.options.sprite) {
            this.streams[i].stop();
          }
        }
      } else {
        this.streams[0].stop();
      }
    },
    pause: function pause(options) {
      if (!this.inited) {
        return;
      }

      if (this.options.sprite) {
        if (options) {
          this.streams[options.part].pause();
        } else {
          for (i in this.options.sprite) {
            this.streams[i].pause();
          }
        }
      } else {
        this.streams[0].pause();
      }
    },
    volume: function volume(options) {
      var stream;

      if (options) {
        extend(options, this.options);
      } else {
        return;
      }

      if (this.options.sprite) {
        if (this.options.part) {
          stream = this.streams[this.options.part];
          stream && stream.setVolume(this.options);
        } else {
          for (i in this.options.sprite) {
            stream = this.streams[i];
            stream && stream.setVolume(this.options);
          }
        }
      } else {
        stream = this.streams[0];
        stream && stream.setVolume(this.options);
      }
    }
  };

  Stream = function Stream(options, sprite_part) {
    this.name = options.name;
    this.alias = options.alias;
    this.sprite_part = sprite_part;
    this.multiplay = options.multiplay;
    this.volume = options.volume;
    this.preload = options.preload;
    this.path = settings.path;
    this.start = options.start || 0;
    this.end = options.end || 0;
    this.scope = options.scope;
    this.ended_callback = options.ended_callback;
    this._scope = options._scope;
    this._ready = options._ready;
    this.setLoop(options);
    this.sound = null;
    this.url = null;
    this.loaded = false;
    this.start_time = 0;
    this.paused_time = 0;
    this.played_time = 0;
    this.init();
  };

  Stream.prototype = {
    init: function init() {
      this.sound = new Audio();
      this.sound.volume = this.volume;
      this.createUrl();
      this.sound.addEventListener("ended", this.ended.bind(this), false);
      this.sound.addEventListener("canplaythrough", this.can_play_through.bind(this), false);
      this.sound.addEventListener("timeupdate", this._update.bind(this), false);
      this.load();
    },
    destroy: function destroy() {
      this.stop();
      this.sound.removeEventListener("ended", this.ended.bind(this), false);
      this.sound.removeEventListener("canplaythrough", this.can_play_through.bind(this), false);
      this.sound.removeEventListener("timeupdate", this._update.bind(this), false);
      this.sound = null;
      this.loaded = false;
    },
    createUrl: function createUrl() {
      var rand = new Date().valueOf();
      this.url = this.path + encodeURIComponent(this.name) + "." + settings.supported[0] + "?" + rand;
    },
    can_play_through: function can_play_through() {
      if (this.preload) {
        this.ready();
      }
    },
    load: function load() {
      this.sound.src = this.url;
      this.sound.preload = this.preload ? "auto" : "none";

      if (this.preload) {
        this.sound.load();
      }
    },
    setLoop: function setLoop(options) {
      if (options.loop === true) {
        this.loop = 9999999;
      } else if (typeof options.loop === "number") {
        this.loop = +options.loop - 1;
      } else {
        this.loop = false;
      }
    },
    update: function update(options) {
      this.setLoop(options);

      if ("volume" in options) {
        this.volume = options.volume;
      }
    },
    ready: function ready() {
      if (this.loaded || !this.sound) {
        return;
      }

      this.loaded = true;

      this._ready.call(this._scope, this.sound.duration);

      if (!this.end) {
        this.end = this.sound.duration;
      }
    },
    play: function play(options) {
      if (options) {
        this.update(options);
      }

      if (!this.multiplay && this.playing) {
        return;
      }

      this._play();
    },
    _play: function _play() {
      if (this.paused) {
        this.paused = false;
      } else {
        try {
          this.sound.currentTime = this.start;
        } catch (e) {}
      }

      this.playing = true;
      this.start_time = new Date().valueOf();
      this.sound.volume = this.volume;
      this.sound.play();
    },
    stop: function stop() {
      if (!this.playing) {
        return;
      }

      this.playing = false;
      this.paused = false;
      this.sound.pause();
      this.clear();

      try {
        this.sound.currentTime = this.start;
      } catch (e) {}
    },
    pause: function pause() {
      if (this.paused) {
        this._play();
      } else {
        this.playing = false;
        this.paused = true;
        this.sound.pause();
        this.paused_time = new Date().valueOf();
        this.played_time += this.paused_time - this.start_time;
      }
    },
    _update: function _update() {
      if (!this.start_time) {
        return;
      }

      var current_time = new Date().valueOf(),
          played_time = current_time - this.start_time,
          played = (this.played_time + played_time) / 1000;

      if (played >= this.end) {
        if (this.playing) {
          this.stop();

          this._ended();
        }
      }
    },
    ended: function ended() {
      if (this.playing) {
        this.stop();

        this._ended();
      }
    },
    _ended: function _ended() {
      this.playing = false;
      var config = {
        name: this.name,
        alias: this.alias,
        part: this.sprite_part,
        start: this.start,
        duration: this.end
      };

      if (this.ended_callback && typeof this.ended_callback === "function") {
        this.ended_callback.call(this.scope, config);
      }

      if (this.loop) {
        setTimeout(this.looper.bind(this), 15);
      }
    },
    looper: function looper() {
      this.loop--;
      this.play();
    },
    clear: function clear() {
      this.start_time = 0;
      this.played_time = 0;
      this.paused_time = 0;
    },
    setVolume: function setVolume(options) {
      this.volume = options.volume;

      if (this.sound) {
        this.sound.volume = this.volume;
      }
    }
  };
})(window, navigator, window.jQuery || window.$);
},{}],"player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./vendor/ion.sound");

var NOTES = {
  /* F, C D E F G A B c d e f g a b c' d' e' f' g' a' - abc notation kora scale */
  SNAP: 'snap',
  K: 'bell_ring',
  "F,": 'bell_ring',
  "C,": 'bell_ring',
  "D,": 'bell_ring',
  "E,": 'bell_ring',
  A: 'bell_ring',
  B: 'bell_ring',
  C: 'bell_ring',
  D: 'bell_ring',
  E: 'bell_ring',
  F: 'bell_ring',
  G: 'bell_ring',
  c: 'bell_ring',
  d: 'bell_ring',
  e: 'bell_ring',
  f: 'bell_ring',
  g: 'bell_ring',
  b: 'bell_ring',
  "c'": 'bell_ring',
  "d'": 'bell_ring',
  "e'": 'bell_ring',
  "f'": 'bell_ring',
  "g'": 'bell_ring',
  "a'": 'bell_ring'
};

var Player = function () {
  var instance;

  function GlobalPlayer() {
    var ion = window.ion;
    ion.sound({
      sounds: Object.values(NOTES).map(function (name) {
        return {
          name: name,
          volume: name === NOTES.SNAP ? 1.0 : 0.3
        };
      }),
      path: "sounds/",
      preload: true,
      multiplay: true
    });
    return {
      playNote: function playNote(note) {
        if (NOTES[note]) {
          ion.sound.play(NOTES[note]);
        }
      },
      playSnap: function playSnap() {
        ion.sound.play(NOTES.SNAP);
      }
    };
  }

  return function () {
    if (!instance) {
      instance = new GlobalPlayer();
    }

    return instance;
  };
}();

var _default = Player;
exports.default = _default;
},{"./vendor/ion.sound":"vendor/ion.sound.js"}],"helpers/noop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = noop;

function noop() {}
},{}],"ticker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Ticker;

var _noop = _interopRequireDefault(require("./helpers/noop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var second = 1000;
var minute = second * 60;

function Ticker() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$ticksPerMinute = _ref.ticksPerMinute,
      ticksPerMinute = _ref$ticksPerMinute === void 0 ? 60 : _ref$ticksPerMinute,
      _ref$onTick = _ref.onTick,
      onTick = _ref$onTick === void 0 ? _noop.default : _ref$onTick;

  var tpm = ticksPerMinute;
  var interval;

  function stop() {
    clearInterval(interval);
    interval = null;
  }

  function start() {
    stop();
    interval = setInterval(onTick, minute / tpm);
  }

  function update(_ref2) {
    var ticksPerMinute = _ref2.ticksPerMinute;
    tpm = ticksPerMinute;

    if (interval) {
      start();
    }
  }

  return {
    start: start,
    stop: stop,
    update: update
  };
}
},{"./helpers/noop":"helpers/noop.js"}],"controller-view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ControllerView;

var _noop = _interopRequireDefault(require("./helpers/noop"));

var _createElement = _interopRequireDefault(require("./helpers/createElement"));

var _translate = _interopRequireDefault(require("./helpers/translate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ControllerView() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$onPlay = _ref.onPlay,
      onPlay = _ref$onPlay === void 0 ? _noop.default : _ref$onPlay,
      _ref$onStop = _ref.onStop,
      onStop = _ref$onStop === void 0 ? _noop.default : _ref$onStop,
      _ref$onClickSlower = _ref.onClickSlower,
      onClickSlower = _ref$onClickSlower === void 0 ? _noop.default : _ref$onClickSlower,
      _ref$onClickFaster = _ref.onClickFaster,
      onClickFaster = _ref$onClickFaster === void 0 ? _noop.default : _ref$onClickFaster,
      viewerElement = _ref.viewerElement,
      _ref$block = _ref.block,
      block = _ref$block === void 0 ? 'harp-view' : _ref$block,
      bpm = _ref.bpm;

  var state = {
    playing: false,
    bpm: bpm
  };
  var $el = (0, _createElement.default)('div', block);
  var playButton = (0, _createElement.default)('button', "".concat(block, "__play"), {
    click: function click() {
      if (!state.playing) {
        onPlay();
      } else {
        onStop();
      }
    }
  });

  function updateButton() {
    playButton.innerText = (0, _translate.default)(!state.playing ? 'play' : 'stop');
  }

  updateButton();
  var controlSpeed = (0, _createElement.default)('span', "".concat(block, "__control-speed"));
  Object.assign(controlSpeed.style, {
    display: 'inline-block',
    margin: '0 1em'
  });
  var slowerBtn = (0, _createElement.default)('button', "".concat(block, "__speed-button"), {
    click: onClickSlower
  });
  slowerBtn.innerText = (0, _translate.default)('slower');
  var fasterBtn = (0, _createElement.default)('button', "".concat(block, "__speed-button"), {
    click: onClickFaster
  });
  fasterBtn.innerText = (0, _translate.default)('faster');
  var bpmElement = (0, _createElement.default)('span', "".concat(block, "__bpm"));
  Object.assign(bpmElement.style, {
    display: 'inline-block',
    margin: '0 0.5em'
  });

  function updateBpm() {
    bpmElement.innerText = state.bpm || '';
  }

  controlSpeed.appendChild(slowerBtn);
  controlSpeed.appendChild(bpmElement);
  controlSpeed.appendChild(fasterBtn);
  updateBpm();
  $el.appendChild(playButton);
  $el.appendChild(controlSpeed);
  var viewerContainer = (0, _createElement.default)('div', "".concat(block, "__viewer"));
  Object.assign(viewerContainer.style, {
    maxWidth: '320px',
    margin: '0 auto'
  });
  viewerContainer.appendChild(viewerElement);
  $el.appendChild(viewerContainer);
  var updateElement = {
    playing: updateButton,
    bpm: updateBpm
  };

  function update(newState) {
    Object.entries(newState).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];

      if (state[key] !== value) {
        state[key] = value;
        updateElement[key]();
      }
    });
  }

  return {
    $el: $el,
    update: update
  };
}
},{"./helpers/noop":"helpers/noop.js","./helpers/createElement":"helpers/createElement.js","./helpers/translate":"helpers/translate.js"}],"helpers/isPause.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var PAUSES = new Set(['x', 'z']);

var isPause = function isPause(note) {
  return PAUSES.has(note);
};

var _default = isPause;
exports.default = _default;
},{}],"controller.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Controller;

var _viewer = _interopRequireDefault(require("./viewer"));

var _player = _interopRequireDefault(require("./player"));

var _ticker = _interopRequireDefault(require("./ticker"));

var _controllerView = _interopRequireDefault(require("./controller-view"));

var _isPause = _interopRequireDefault(require("./helpers/isPause"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Controller(_ref) {
  var tune = _ref.tune;
  var tick = -1;
  var tuneIndex = -1;
  var ticksPerMinute = 60 * 4;
  var ticksPerMinuteSteps = [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.5, 3, 3.5, 4].map(function (multiplier) {
    return Math.round(ticksPerMinute * multiplier);
  });
  var currentTicksStep = ticksPerMinuteSteps.findIndex(function (tpm) {
    return tpm === ticksPerMinute;
  });
  var tuneArray = tune.split('');
  var ticksPerSnap = 4;
  var ticksPerNote = 2;
  var highLightTicks = 1;
  var viewer = new _viewer.default();
  var player = new _player.default();

  var playAndShow = function playAndShow() {
    var note = tuneArray[tuneIndex];
    viewer.dimAll();

    if ((0, _isPause.default)(note)) {
      return;
    }

    player.playNote(note);
    viewer.highLight(note);
  };

  var ticker;
  var controllerView;

  var stop = function stop() {
    tick = -1;
    tuneIndex = -1;
    controllerView.update({
      playing: false
    });
    ticker.stop();
    viewer.dimAll();
  };

  var onTick = function onTick() {
    tick += 1;

    if (tick % ticksPerNote === highLightTicks) {
      viewer.dimAll();
    }

    if (tick % ticksPerNote === 0) {
      tuneIndex += 1;

      if (tuneIndex === tuneArray.length) {
        return stop();
      }

      playAndShow();
    }

    if (tick % ticksPerSnap === 0) {
      player.playSnap();
    }
  };

  ticker = new _ticker.default({
    ticksPerMinute: ticksPerMinute,
    onTick: onTick
  });

  var speedStep = function speedStep(increment) {
    currentTicksStep = Math.max(0, Math.min(currentTicksStep + increment, ticksPerMinuteSteps.length - 1));
    ticksPerMinute = ticksPerMinuteSteps[currentTicksStep];
    ticker.update({
      ticksPerMinute: ticksPerMinute
    });
    controllerView.update({
      bpm: ticksPerMinute / ticksPerSnap
    });
  };

  controllerView = new _controllerView.default({
    viewerElement: viewer.$el,
    bpm: ticksPerMinute / ticksPerSnap,
    onClickFaster: function onClickFaster() {
      speedStep(+1);
    },
    onClickSlower: function onClickSlower() {
      speedStep(-1);
    },
    onPlay: function onPlay() {
      controllerView.update({
        playing: true
      });
      ticker.start();
    },
    onStop: stop
  });
  return controllerView.$el;
}
},{"./viewer":"viewer/index.js","./player":"player.js","./ticker":"ticker.js","./controller-view":"controller-view.js","./helpers/isPause":"helpers/isPause.js"}],"harp-view.js":[function(require,module,exports) {
"use strict";

var _insertAfter = _interopRequireDefault(require("./helpers/insertAfter"));

var _translate = _interopRequireDefault(require("./helpers/translate"));

var _tuneValid = _interopRequireDefault(require("./helpers/tuneValid"));

var _controller = _interopRequireDefault(require("./controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.HarpView = function (selector) {
  document.querySelectorAll('.' + selector).forEach(function (node) {
    var tune = node.innerHTML.trim();

    if (!(0, _tuneValid.default)(tune)) {
      console.error((0, _translate.default)('error.bad-tune'), node);
      return;
    }

    (0, _insertAfter.default)(new _controller.default({
      tune: tune
    }), node);
  });
};
},{"./helpers/insertAfter":"helpers/insertAfter.js","./helpers/translate":"helpers/translate.js","./helpers/tuneValid":"helpers/tuneValid.js","./controller":"controller.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60322" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","harp-view.js"], null)
//# sourceMappingURL=/harp-view.js.map