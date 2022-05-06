import _ from 'lodash';
import { getCollection } from 'db';
import { PermissionsLevel } from 'enums';

const delQuote = async ({ args, argsString, say }) => {
  const quotes = await getCollection('quotes');
  const parsedId = parseInt(argsString, 10);

  let quote = null;

  if (args.length === 1 && !Number.isNaN(parsedId)) {
    quote = await quotes.findOne({ _id: parsedId });
  }

  // If a numeric ID didn't get it
  if (!quote) {
    // There's probably a way in Mongo to do this, but god are the docs obtuse
    const allDocs = await quotes.find({});

    const matching = allDocs.filter(doc =>
      doc.body.toLowerCase().includes(argsString.toLowerCase()),
    );
    // Just send back a random one if multiple match
    quote = matching[0];
  }

  if (!quote) {
    say(`Sorry, no quote found for query: ${argsString}`);
    return;
  }

  await quotes.remove({ _id: quote._id });

  say(`Deleted ${quote._id}`);
};

delQuote.command = 'delquote';
delQuote.aliases = ['rmquote', 'deletequote', 'quotedel', 'quotedelete'];
delQuote.permissionsLevel = PermissionsLevel.MOD;

export default delQuote;
