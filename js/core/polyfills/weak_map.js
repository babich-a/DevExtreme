"use strict";

/* global WeakMap */
var inArray = require("../../core/utils/array").inArray,
    window = require("../../core/utils/window").getWindow(),
    weakMap = window ? window.WeakMap : WeakMap;

if(!weakMap) {
    // NOTE: This is an incomplete WeakMap polyfill but it is enough for creation purposes

    weakMap = function() {
        var keys = [],
            values = [];

        this.set = function(key, value) {
            var index = inArray(key, keys);
            if(index === -1) {
                keys.push(key);
                values.push(value);
            } else {
                values[index] = value;
            }
        };

        this.get = function(key) {
            var index = inArray(key, keys);
            if(index === -1) {
                return undefined;
            }
            return values[index];
        };

        this.has = function(key) {
            var index = inArray(key, keys);
            if(index === -1) {
                return false;
            }
            return true;
        };

        this.delete = function(key) {
            var index = inArray(key, keys);
            if(index === -1) {
                return;
            }
            keys.splice(index, 1);
            values.splice(index, 1);
        };
    };
}

module.exports = weakMap;
