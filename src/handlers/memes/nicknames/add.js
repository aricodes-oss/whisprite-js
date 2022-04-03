import { getCollection } from 'db';
import { PermissionsLevel } from 'enums';

const addNickName = async ({ argsString, message, say }) => {
  const nickNames = await getCollection('nickNames');

  const existing = await nickNames.findOne({ name: argsString });

  if (existing) {
    say(`${argsString} is already on the list!`);
    return;
  }

  await nickNames.insert({
    name: argsString,
    author: message.senderUsername,
    timestamp: Date.now(),
  });

  say(`@${message.senderUsername} - Successfully added nick name "${argsString}"`);
};

addNickName.command = 'addname';
addNickName.aliases = [
  'newname',
  'newnick',
  'addnick',
  'addcollege',
  'newcollegename',
  'newcollege',
];
addNickName.permissionsLevel = PermissionsLevel.VIP;

export default addNickName;
