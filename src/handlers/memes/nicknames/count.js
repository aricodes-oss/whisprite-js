import { getCollection } from 'db';

const count = async ({ say }) => {
  const nickNames = await getCollection('nickNames');

  const total = await nickNames.countDocuments({});

  say(`We have ${total} nicknames in our database. Keep it up!`);
};

count.command = 'totalnicknames';
count.aliases = ['numnicknames', 'nicknames', 'countnicknames', 'countnicks', 'totalcollege'];

export default count;
