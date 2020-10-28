import { ChatClient } from 'dank-twitch-irc';
import { split } from 'shlex';

import handlers from 'handlers';
import { getPermissionsLevel } from 'utils';

import 'environment';

const channelName = process.env.TWITCH_CHANNEL_NAME;

const client = new ChatClient({
  username: process.env.TWITCH_USERNAME,
  password: process.env.TWITCH_PASSWORD,
});

client.on('ready', () => {
  console.log('Ret-2-Go!');
});

client.on('close', error => {
  if (error !== null) {
    console.error('Client closed due to error', error);
  }
});

client.on('message', async input => {
  const message = { ...input };
  if (!message.messageText || !message.messageText.startsWith('!')) {
    return;
  }

  const parsed = split(message.messageText);

  if (!parsed.length) {
    return;
  }

  const vips = await client.getVips(channelName);
  const [command, ...args] = parsed;

  message.isStreamer = message.channelName === message.senderUsername;
  message.isVip = vips.includes(message.senderUsername);

  message.permissionsLevel = getPermissionsLevel(message);

  const argsString = message.messageText.replace(`${command} `, '');

  for (const handler of handlers) {
    handler({
      command: command.slice(1).toLowerCase(),
      args,
      argsString,
      message,
      say: client.say.bind(client, channelName),
    });
  }
});

client.connect();
client.join(channelName);
