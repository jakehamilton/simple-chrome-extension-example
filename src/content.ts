import { MessageChannel, IChannelMessage } from './lib/message-channel';

const channel = new MessageChannel('global');

channel.on('log', (body, port) => {
    console.log(`[log] ${body}`);
});
