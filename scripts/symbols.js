/**
 * Created by Alexandr on 28.07.2015.
 */
"use strict";
(function() {
    var global = this;

    var asciiToUnicode = {
        128: parseInt("00C7", 16),
        129: parseInt("00FC", 16),
        130: parseInt("00E9", 16),
        131: parseInt("00E2", 16),
        132: parseInt("00E4", 16),
        133: parseInt("00E0", 16),
        134: parseInt("00E5", 16),
        135: parseInt("00E7", 16),
        136: parseInt("00EA", 16),
        137: parseInt("00EB", 16),
        138: parseInt("00E8", 16),
        139: parseInt("00EF", 16),
        140: parseInt("00EE", 16),
        141: parseInt("00EC", 16),
        142: parseInt("00C4", 16),
        143: parseInt("00C5", 16),
        144: parseInt("00C9", 16),
        145: parseInt("00E6", 16),
        146: parseInt("00C6", 16),
        147: parseInt("00F4", 16),
        148: parseInt("00F6", 16),
        149: parseInt("00F2", 16),
        150: parseInt("00FB", 16),
        151: parseInt("00F9", 16),
        152: parseInt("00FF", 16),
        153: parseInt("00D6", 16),
        154: parseInt("00DC", 16),
        155: parseInt("00A2", 16),
        156: parseInt("00A3", 16),
        157: parseInt("00A5", 16),
        158: parseInt("25A7", 16),
        159: parseInt("00A3", 16),
        160: parseInt("00E1", 16),
        161: parseInt("00ED", 16),
        162: parseInt("00F3", 16),
        163: parseInt("00FA", 16),
        164: parseInt("00F1", 16),
        165: parseInt("00D1", 16),
        166: parseInt("00AA", 16),
        167: parseInt("00BA", 16),
        168: parseInt("00BF", 16),
        169: parseInt("00AF", 16),
        170: parseInt("00AC", 16),
        171: parseInt("00BD", 16),
        172: parseInt("00BC", 16),
        173: parseInt("00A1", 16),
        174: parseInt("00AB", 16),
        175: parseInt("00BB", 16),
        176: parseInt("2591", 16),
        177: parseInt("2592", 16),
        178: parseInt("2593", 16),
        179: parseInt("2502", 16),
        180: parseInt("2524", 16),
        181: parseInt("2561", 16),
        182: parseInt("2562", 16),
        183: parseInt("2556", 16),
        184: parseInt("2555", 16),
        185: parseInt("2563", 16),
        186: parseInt("2551", 16),
        187: parseInt("2557", 16),
        188: parseInt("255D", 16),
        189: parseInt("255C", 16),
        190: parseInt("255B", 16),
        191: parseInt("2510", 16),
        192: parseInt("2514", 16),
        193: parseInt("2534", 16),
        194: parseInt("252C", 16),
        195: parseInt("251C", 16),
        196: parseInt("2500", 16),
        197: parseInt("253C", 16),
        198: parseInt("255E", 16),
        199: parseInt("255F", 16),
        200: parseInt("255A", 16),
        201: parseInt("2554", 16),
        202: parseInt("2569", 16),
        203: parseInt("2566", 16),
        204: parseInt("2560", 16),
        205: parseInt("2550", 16),
        206: parseInt("256C", 16),
        207: parseInt("2567", 16),
        208: parseInt("2568", 16),
        209: parseInt("2564", 16),
        210: parseInt("2565", 16),
        211: parseInt("2559", 16),
        212: parseInt("2558", 16),
        213: parseInt("2552", 16),
        214: parseInt("2553", 16),
        215: parseInt("256B", 16),
        216: parseInt("256A", 16),
        217: parseInt("2518", 16),
        218: parseInt("250C", 16),
        219: parseInt("2588", 16),
        220: parseInt("2584", 16),
        221: parseInt("258C", 16),
        222: parseInt("2590", 16),
        223: parseInt("2580", 16),
        224: parseInt("1D6FC", 16),
        225: parseInt("1D6FD", 16),
        226: parseInt("1D6E4", 16),
        227: parseInt("1D70B", 16),
        228: parseInt("1D6F4", 16),
        229: parseInt("1D70E", 16),
        230: parseInt("1D707", 16),
        231: parseInt("1D70F", 16),
        232: parseInt("1D6F7", 16),
        233: parseInt("1D703", 16),
        234: parseInt("1D6FA", 16),
        235: parseInt("1D6FF", 16),
        236: parseInt("221E", 16),
        237: parseInt("1D719", 16),
        238: parseInt("1D700", 16),
        239: parseInt("2229", 16),
        240: parseInt("2261", 16),
        241: parseInt("00B1", 16),
        242: parseInt("2265", 16),
        243: parseInt("2264", 16),
        244: parseInt("2320", 16),
        245: parseInt("2321", 16),
        246: parseInt("00F7", 16),
        247: parseInt("2248", 16),
        248: parseInt("00B0", 16),
        249: parseInt("00B0", 16),
        250: parseInt("25AA", 16),
        251: parseInt("221A", 16),
        252: parseInt("207F", 16),
        253: parseInt("00B2", 16),
        254: parseInt("25A0", 16),
        255: parseInt("25A1", 16)
    };

    var Symbols = function (canvasSelector, width, height) {

        canvasSelector = canvasSelector || "#ansi";

        width = width || 150;

        height = height || 45;

        this.canvas = $(canvasSelector)[0];

        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = this._elW * width;
        this.canvas.height = this._elH * height;

        this.default = {
            bg: tagParser.defaultColours.text.bg,
            fg: tagParser.defaultColours.text.fg
        };

        this._init();

        this._blinkCursor();

    };

    Symbols.prototype._elW = 7;

    Symbols.prototype._elH = 14;

    Symbols.prototype._cursorX = 0;

    Symbols.prototype._cursorY = 0;

    Symbols.prototype._storage = {};

    Symbols.prototype._cursorShown = false;

    Symbols.prototype._blinkPeriod = 500;

    Symbols.prototype._blinking = false;

    Symbols.prototype._init = function () {
        this.ctx.fillStyle = this.default["bg"];
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    };

    Symbols.prototype.drawSymbol = function (asciiCode, x, y, fg, bg) {

        fg = fg || this.default.fg;
        bg = bg || this.default.bg;

        if (this._checkStorage(asciiCode, bg, fg, x, y)) {
            return;
        }

        this.drawBackground(bg, x, y);

        this._setInStorage(asciiCode, bg, fg, x, y);

        this.ctx.font = "14px Lucida Console";
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle = fg;
        asciiCode = this.asciiToUnicode(asciiCode);
        x = x * this._elW - 1;
        y = y * this._elH;
        this.ctx.fillText(String.fromCharCode(asciiCode), x, y);
    };

    Symbols.prototype.drawBackground = function (color, x, y) {
        if (!this._checkBg(color, x, y)) {
            return;
        }
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this._elW, y * this._elH, this._elW, this._elH);
    };

    Symbols.prototype.asciiToUnicode = function (asciiCode) {
        if (typeof asciiToUnicode[asciiCode] === "undefined") {
            return asciiCode;
        }

        return asciiToUnicode[asciiCode];
    };

    Symbols.prototype.showCursor = function (param) {
        this._cursorShown = param;
        if (param) {
            this._blinkCursor();
        }
    };

    Symbols.prototype.getCoords = function (e) {

        var rect = this.canvas.getBoundingClientRect();

        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        return {
            x: Math.floor(x /  this._elW),
            y: Math.floor(y /  this._elH)
        }

    };

    Symbols.prototype.setCursor = function (coords) {
        clearTimeout(this._cursorTimeout);
        this._cursorX = coords.x;
        this._cursorY = coords.y;
        this.showCursor(true);
    };

    Symbols.prototype.clearRect = function (x, y, w, h) {
        this.ctx.fillStyle = this.default["bg"];

        for (var i = x; i <= w; i++) {
            for (var j = y; j <= h; j++) {
                if (this._storage[i] && this._storage[i][j]) {
                    this._storage[i][j].code = null;
                }
            }
        }

        x *= this._elW;
        w *= this._elW;
        y *= this._elH;
        h *= this._elH;
        this.ctx.fillRect(x,y,w,h);


    };



    Symbols.prototype._blinkCursor = function () {
        var self = this;

        this._cursorTimeout = setTimeout(function() {

            if (!self._cursorShown && self._blinking) {
                return;
            }

            var x = self._cursorX;
            var y = self._cursorY;

            if (self._blinking) {
                self._blinking = false;
                var type = "fg";
                self.ctx.font = "normal 14px Lucida Console";

            } else {
                self._blinking = true;
                type = "bg";
                self.ctx.font = "bold 14px Lucida Console";
            }

            self.ctx.textBaseline = "top";
            self.ctx.fillStyle = self._getColor(x,y, type);
            self.ctx.fillText("_", x * self._elW, y * self._elH);

            self._blinkCursor();
        }, this._blinkPeriod);


    };

    Symbols.prototype._checkBg = function (color, x, y) {

        var needToRedraw = true;

        if (typeof this._storage[x] === "undefined") {
            needToRedraw = false;
        }

        if (needToRedraw && typeof  this._storage[x][y] === "undefined") {
            needToRedraw = false;
        }

        return !(!needToRedraw && color === this.default["bg"]);
    };

    Symbols.prototype._getColor = function (x, y, type) {

        type = type === "bg" ? "bg" : "fg";

        if (typeof this._storage[x] === "undefined") {
            return this.default[type];
        }

        if (typeof  this._storage[x][y] === "undefined") {
            return this.default[type];
        }

        return this._storage[x][y][type];
    };

    Symbols.prototype._getSymbol = function (x, y) {
        if (typeof this._storage[x] === "undefined") {
            return false;
        }

        if (typeof  this._storage[x][y] === "undefined") {
            return false;
        }

        return this._storage[x][y].code;
    };

    Symbols.prototype._checkStorage = function (asciiCode, bg, fg, x, y) {

        if (typeof this._storage[x] === "undefined") {
            return false;
        }

        if (typeof  this._storage[x][y] === "undefined") {
            return false;
        }

        if (this._storage[x][y].code !== asciiCode) {
            return false;
        }

        if (this._storage[x][y]["bg"] !== bg) {
            return false;
        }

        if (this._storage[x][y]["fg"] !== fg) {
            return false;
        }

        return true;
    };

    Symbols.prototype._setInStorage = function (asciiCode, bg, fg, x, y) {

        if (typeof this._storage[x] === "undefined") {
            this._storage[x] = {};
        }

        this._storage[x][y] = {
            code: asciiCode,
            bg: bg,
            fg: fg
        }
    };

    global.Symbols = Symbols;
}).call(this);