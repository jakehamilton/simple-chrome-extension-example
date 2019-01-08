import { MessageChannel, IChannelMessage } from './lib/message-channel';

const channel = new MessageChannel('global');

channel.connect().then(port => {
    port.postMessage({
        type: 'log',
        body: 'Hello, World!',
    } as IChannelMessage);
});
