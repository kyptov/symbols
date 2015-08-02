/**
 * Created by Alexandr on 28.07.2015.
 */
"use strict";
(function() {
    var global = this;

    var asciiToUnicode = {};

    var Display = function (canvasSelector, width, height) {

        canvasSelector = canvasSelector || "#ansi";

        width = width || 150;

        height = height || 45;

        this.canvas = $(canvasSelector)[0];

        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = this._elW * width;
        this.canvas.height = this._elH * height;

        this._init();
    };

    Display.prototype._elW = 8;

    Display.prototype._elH = 15;

    Display.prototype._storage = {};

    Display.prototype._init = function () {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    };

    Display.prototype.drawSymbol = function (asciiCode, bg, fg, x, y) {

        if (!this._checkStorage(asciiCode, bg, fg, x, y)) {
            return;
        }

        this._setInStorage(asciiCode, bg, fg, x, y);

        this.drawBackground(bg, x, y);
        this.ctx.font = "14px Lucida Console, monospace";
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle = fg;
        asciiCode = this.asciiToUnicode(asciiCode);
        x = x * this._elW;
        y = y * this._elH;
        this.ctx.fillText(String.fromCharCode(asciiCode), x, y);
    };

    Display.prototype.drawBackground = function (color, x, y) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this._elW, y * this._elH, this._elW, this._elH);
    };

    Display.prototype.asciiToUnicode = function (asciiCode) {
        if (typeof asciiToUnicode[asciiCode] === "undefined") {
            return asciiCode;
        }

        return asciiToUnicode[asciiCode];
    };

    Display.prototype._checkStorage = function (asciiCode, bg, fg, x, y) {

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

    Display.prototype._setInStorage = function (asciiCode, bg, fg, x, y) {

        if (typeof this._storage[x] === "undefined") {
            this._storage[x] = {};
        }

        this._storage[x][y] = {
            code: asciiCode,
            bg: bg,
            fg: fg
        }
    };



    global.Display = Display;
}).call(this);