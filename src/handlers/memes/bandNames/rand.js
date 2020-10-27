import _ from 'lodash';
import { getCollection } from 'db';

const rand = async ({ say }) => {
  const bandNames = await getCollection('bandNames');

  const list = await bandNames.find({}).toArray();
  const selected = _.sample(list);

  say(selected.name);
};

rand.command = 'bandname';
rand.aliases = ['randname', 'randomband', 'randombandname', 'getrandombandname', 'randband'];

export default rand;
