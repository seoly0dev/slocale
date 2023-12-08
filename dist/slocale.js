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
    self = '_';
    constructor() {
        this.t = this.t.bind(this);
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
    setSelfKey(self) {
        this.self = self;
    }
    getSelfKey() {
        return this.self;
    }
    setMissingStrategy(strategy) {
        this.strategy = strategy;
    }
    t(key) {
        let node = this.localeMap;
        for (const token of key.split(this.seperator)) {
            node = node[token] ?? null;
            if (node == null)
                return this.strategy == exports.MissingStrategyType.RETURN_KEY_FULL_KEY ? key : token;
        }
        const target = node[this.localeIndex];
        if (typeof target == 'string')
            return target;
        try {
            return target[this.self];
        }
        catch (e) {
            throw Error;
        }
    }
}
exports.Slocale = Slocale;
