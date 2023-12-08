export declare const MissingStrategyType: {
    RETURN_KEY: symbol;
    RETURN_KEY_FULL_KEY: symbol;
};
export declare class Slocale {
    private localeList;
    private localeIndex;
    private localeMap;
    private seperator;
    private strategy;
    private self;
    constructor();
    loadLocaleMap(localeMap: object): void;
    setLocaleList(list: Array<string>): void;
    getLocaleList(): string[];
    setLocale(name: string): void;
    getLocale(): string;
    setLocaleIndex(index: number): void;
    getLocaleIndex(): number;
    setSeperator(seperator: string): void;
    getSeperator(): string;
    setSelfKey(self: string): void;
    getSelfKey(): string;
    setMissingStrategy(strategy: symbol): void;
    t(key: string): string;
}
