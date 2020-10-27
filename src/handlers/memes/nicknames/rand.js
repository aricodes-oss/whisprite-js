import _ from 'lodash';
import { getCollection } from 'db';

const rand = async ({ say }) => {
  const nickNames = await getCollection('nickNames');

  const list = await nickNames.find({}).toArray();
  const selected = _.sample(list);

  say(`"${selected.name}" is what they used to call me back in college`);
};

rand.command = 'nickname';
rand.aliases = ['randomnick', 'randomnickname', 'getrandomnickname', 'randnick'];

export default rand;
