import _ from 'lodash';
import { getCollection } from 'db';

const sandwich = async ({ argsString, message, say }) => {
  const sandwiches = await getCollection('sandwiches');
  const name = argsString.toLowerCase();

  const existing = await sandwiches.findOne({ name: argsString.toLowerCase() });
  let isSandwich = _.sample([true, false]);

  if (existing !== null) {
    isSandwich = existing.isSandwich;
  } else {
    await sandwiches.insertOne({
      name,
      isSandwich,
      author: message.senderUsername,
      timestamp: Date.now(),
    });
  }

  const a = ['a', 'e', 'i', 'o', 'u'].includes(name[0]) ? 'An' : 'A';

  say(`${a} ${name} is a ${isSandwich ? 'sandwich' : 'dumpling'}`);
};

sandwich.command = 'sandwich';
sandwich.aliases = ['classify', 'dumpling', 'sandwichordumpling', 'issandwich', 'isdumpling'];
sandwich.cooldown = 5 * 1000; // 5 seconds

export default sandwich;
