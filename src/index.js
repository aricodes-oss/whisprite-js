import { ChatClient } from 'dank-twitch-irc';
import parse from 'whisparse';
import pupa from 'pupa';

import handlers from 'handlers';
import { getPermissionsLevel, wrapHandlerFunc } from 'utils';
import { findCommand } from 'db';

import 'environment';

const channelNames = process.env.TWITCH_CHANNEL_NAMES.split(',');

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
  const parsed = parse(message.messageText);

  if (!parsed) {
    return;
  }

  const vips = await client.getVips(message.channelName);

  message.isStreamer = message.channelName === message.senderUsername;
  message.isVip = vips.includes(message.senderUsername);

  message.permissionsLevel = getPermissionsLevel(message);

  const context = {
    ...parsed,
    sender: message.senderUsername,
    channel: message.channelName,
  };

  const dbCommand = await findCommand(parsed.command);
  const dbHandler = ({ say }) => dbCommand && say(pupa(dbCommand.output, context));
  if (dbCommand) {
    dbHandler.command = dbCommand._id.toLowerCase();
    dbHandler.aliases = dbCommand.aliases;
  }

  for (const handler of handlers.concat([wrapHandlerFunc(dbHandler)])) {
    handler({
      ...parsed,
      message,
      context,
      say: (...args) => client.say(message.channelName, pupa(...args, context)),
    });
  }
});

client.connect();
for (const channel of channelNames) {
  client.join(channel);
}
