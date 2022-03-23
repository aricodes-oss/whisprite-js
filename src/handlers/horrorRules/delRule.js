import _ from 'lodash';
import { getCollection } from 'db';
import { PermissionsLevel } from 'enums';

const delRule = async ({ args, argsString, say }) => {
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

    const matching = allDocs.filter(doc =>
      doc.body.toLowerCase().includes(argsString.toLowerCase()),
    );
    // Just send back a random one if multiple match
    rule = matching[0];
  }

  if (!rule) {
    say(`Sorry, no rule found for query: ${argsString}`);
    return;
  }

  await rules.deleteOne({ _id: rule._id });

  say(`Deleted ${rule._id}`);
};

delRule.command = 'delrule';
delRule.aliases = ['rmrule', 'deleterule', 'ruledel', 'ruledelete'];
delRule.permissionsLevel = PermissionsLevel.MOD;

export default delRule;
