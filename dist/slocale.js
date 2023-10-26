"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slocale = exports.MissingStrategyType = void 0;
exports.MissingStrategyType = {
    RETURN_KEY: Symbol(),
    RETURN_KEY_FULL_KEY: Symbol(),
};
class Slocale {
    localeList = [];
    localeIndex = 0;
    localeMap = {};
    seperator = '.';
    strategy = exports.MissingStrategyType.RETURN_KEY;
    constructor() {
        //
    }
    loadLocaleMap(localeMap) {
        this.localeMap = localeMap;
    }
    setLocaleList(list) {
        this.localeList = list;
    }
    getLocaleList() {
        return this.localeList;
    }
    setLocale(name) {
        this.localeIndex = this.localeList.indexOf(name);
    }
    getLocale() {
        return this.localeList[this.localeIndex];
    }
    setLocaleIndex(index) {
        this.localeIndex = index;
    }
    getLocaleIndex() {
        return this.localeIndex;
    }
    setSeperator(seperator) {
        this.seperator = seperator;
    }
    getSeperator() {
        return this.seperator;
    }
    setMissingStrategy(strategy) {
        this.strategy = strategy;
    }
    find(key) {
        let node = this.localeMap;
        for (const token of key.split(this.seperator)) {
            node = node[token] ?? null;
            if (node == null)
                return this.strategy == exports.MissingStrategyType.RETURN_KEY_FULL_KEY ? key : token;
        }
        return node[this.localeIndex];
    }
}
exports.Slocale = Slocale;
