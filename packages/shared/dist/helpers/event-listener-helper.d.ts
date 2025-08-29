type EventOptions = boolean | AddEventListenerOptions;
export declare const addMultipleEventListeners: (element: Document | HTMLElement, events: string[], handler: EventListener, options?: EventOptions) => () => void;
export {};
