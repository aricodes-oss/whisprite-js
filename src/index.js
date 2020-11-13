import { ChatClient } from 'dank-twitch-irc';
import parse from 'whisparse';

import handlers from 'handlers';
import { getPermissionsLevel, wrapHandlerFunc } from 'utils';
import { getCollection } from 'db';

import 'environment';

const channelNames = [process.env.TWITCH_CHANNEL_NAME, "journeymanb", "falconsfreak02"];
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
  const parsed = parse(message.messageText);

  if (!parsed) {
    return;
  }

  const vips = await client.getVips(channelName);

  message.isStreamer = message.channelName === message.senderUsername;
  message.isVip = vips.includes(message.senderUsername);

  message.permissionsLevel = getPermissionsLevel(message);

  const commands = await getCollection('commands');
  let dbCommands = await commands.find({}).toArray();
  dbCommands = dbCommands.map(d => {
    const result = ({ say }) => say(d.output);
    Object.assign(result, d, { command: d._id });
    return wrapHandlerFunc(result);
  });

  for (const handler of handlers.concat(dbCommands)) {
    handler({
      ...parsed,
      message,
      say: client.say.bind(client, channelName),
    });
  }
});

client.connect();
for (const channel of channelNames) {
  client.join(channel);
}
