import _ from 'lodash';
import { getCollection } from 'db';

const findQuote = async ({ args, argsString, say }) => {
  const quotes = await getCollection('quotes');
  const parsedId = parseInt(argsString, 10);

  let quote = null;

  if (args.length === 1 && !Number.isNaN(parsedId)) {
    quote = await quotes.findOne({ _id: parsedId });
  }

  // If a numeric ID didn't get it
  if (!quote) {
    // There's probably a way in Mongo to do this, but god are the docs obtuse
    const allDocs = await quotes.find({}).toArray();
    const matching = allDocs.filter(doc =>
      doc.body.toLowerCase().includes(argsString.toLowerCase()),
    );

    // Just send back a random one if multiple match
    quote = _.sample(matching);
  }

  if (!quote) {
    say(`Sorry, no quote found for query: ${argsString}`);
    return;
  }

  say(quote.body);
};

findQuote.command = 'quote';
findQuote.aliases = ['getquote', 'findquote', 'quoteget', 'quotefind'];

export default findQuote;
