export declare const convertToGMT8: (date: any) => Date;
export declare const formatDate: (date: any, template: any) => any;
export declare function sortedCollectionByTime(elements: any[], decrease?: boolean): any[];
export declare function separateDateTime(rawTime: Date | string | number, dateFormatLocale?: string, timeFormatLocale?: string): {
    date: string;
    time: string;
};
