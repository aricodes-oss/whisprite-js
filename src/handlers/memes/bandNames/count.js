import { getCollection } from 'db';

const count = async ({ say }) => {
  const bandNames = await getCollection('bandNames');

  const total = await bandNames.countDocuments({});

  say(`We have ${total} bandnames in our database. Keep it up!`);
};

count.command = 'totalbandnames';
count.aliases = ['numbandnames', 'bandnames', 'countbandnames', 'countbands'];

export default count;
