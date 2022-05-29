import { getCollection, getNextSequence } from 'db';
import { PermissionsLevel } from 'enums';

const addRule = async ({ argsString, message, say }) => {
  const rules = await getCollection('rules');

  const result = await rules.insert({
    _id: await getNextSequence('rules'),
    body: argsString,
    author: message.senderUsername,
    timestamp: Date.now(),
  });

  say(`@${message.senderUsername} - Added horror movie rule #${result._id}`);
};

addRule.command = 'addrule';
addRule.aliases = ['ruleadd', 'newrule'];
addRule.permissionsLevel = PermissionsLevel.VIP;

export default addRule;
