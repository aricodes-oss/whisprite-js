import { getCollection, getNextSequence } from 'db';
import { PermissionsLevel } from 'enums';

const addQuote = async ({ argsString, message, say }) => {
  const quotes = await getCollection('quotes');

  const result = await quotes.insertOne({
    _id: await getNextSequence('quotes'),
    body: argsString,
    author: message.senderUsername,
    timestamp: Date.now(),
  });

  say(`@${message.senderUsername} - Added quote #${result.insertedId}`);
};

addQuote.command = 'addquote';
addQuote.aliases = ['quoteadd', 'newquote'];
addQuote.permissionsLevel = PermissionsLevel.VIP;

export default addQuote;
