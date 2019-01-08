export interface IChannelMessage<T = any> {
    type: string;
    body: T;
}

export type ChannelCallback = (
    body: IChannelMessage,
    port: chrome.runtime.Port,
) => void;

export class MessageChannel {
    private name: string;
    private port: chrome.runtime.Port;
    private handlers: Map<string, ChannelCallback>;

    constructor (name: string) {
        this.name = name;
        this.handlers = new Map();

        this.port = chrome.runtime.connect({ name });
        this.port.onMessage.addListener(this.handleMessage.bind(this));
    }

    connect (): Promise<chrome.runtime.Port> {
        return new Promise((resolve, reject) => {
            chrome.runtime.onConnect.addListener(port => {
                if (this.name === port.name) {
                    resolve(port);
                }
            });
        });
    }

    on (type: string, callback: ChannelCallback) {
        this.handlers.set(type, callback);
    }

    private handleMessage (message: IChannelMessage) {
        if (this.handlers.has(message.type)) {
            const callback = this.handlers.get(message.type)!;
            callback(message.body, this.port);
        } else {
            console.log(
                `[MessageChannel] Could not find handler for type "${message.type}".`,
            );
        }
    }
}
