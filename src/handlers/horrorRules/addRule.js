import { getCollection, getNextSequence } from 'db';
import { PermissionsLevel } from 'enums';

const addRule = async ({ argsString, message, say }) => {
  const rules = await getCollection('rules');

  const result = await rules.insertOne({
    _id: await getNextSequence('rules'),
    body: argsString,
    author: message.senderUsername,
    timestamp: Date.now(),
  });

  say(`@${message.senderUsername} - Added horror movie rule #${result.insertedId}`);
};

addRule.command = 'addrule';
addRule.aliases = ['ruleadd', 'newrule'];
addRule.permissionsLevel = PermissionsLevel.VIP;

export default addRule;
