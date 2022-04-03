import { getCollection } from 'db';
import { PermissionsLevel } from 'enums';

const addBandName = async ({ argsString, message, say }) => {
  const bandNames = await getCollection('bandNames');

  const existing = await bandNames.findOne({ name: argsString });

  if (existing) {
    say(`${argsString} is already on the band name list!`);
    return;
  }

  await bandNames.insert({
    name: argsString,
    author: message.senderUsername,
    timestamp: Date.now(),
  });

  say(`@${message.senderUsername} - Successfully added band name "${argsString}"`);
};

addBandName.command = 'addbandname';
addBandName.aliases = ['newbandname', 'newband', 'addband'];
addBandName.permissionsLevel = PermissionsLevel.VIP;

export default addBandName;
