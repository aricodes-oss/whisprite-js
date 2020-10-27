import { PermissionsLevel } from 'enums';
import { getNextSequence } from 'db';

const vore = async ({ say }) => {
  const total = await getNextSequence('vore');

  say(`We have discussed vore ${total} times now, for some reason. Stop it.`);
};

vore.command = 'vore';
vore.cooldown = 5 * 1000 * 60; // 5 minutes
vore.overridesCooldown = PermissionsLevel.STREAMER;

export default vore;
