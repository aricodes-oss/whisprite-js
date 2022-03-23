import _ from 'lodash';
import { getCollection } from 'db';

const findRule = async ({ args, argsString, say }) => {
  const rules = await getCollection('rules');
  const parsedId = parseInt(argsString, 10);

  let rule = null;

  if (args.length === 1 && !Number.isNaN(parsedId)) {
    rule = await rules.findOne({ _id: parsedId });
  }

  // If a numeric ID didn't get it
  if (!rule) {
    // There's probably a way in Mongo to do this, but god are the docs obtuse
    const allDocs = await rules.find({});

    if (argsString === '') {
      rule = _.sample(allDocs);
    } else {
      const matching = allDocs.filter(doc =>
        doc.body.toLowerCase().includes(argsString.toLowerCase()),
      );
      // Just send back a random one if multiple match
      rule = _.sample(matching);
    }
  }

  if (!rule) {
    say(`Sorry, no rule found for query: ${argsString}`);
    return;
  }

  say(`Rule number ${rule._id}: ${rule.body}`);
};

findRule.command = 'rule';
findRule.aliases = ['getrule', 'findrule', 'ruleget', 'rulefind'];

export default findRule;
