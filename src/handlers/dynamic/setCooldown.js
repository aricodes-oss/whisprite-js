import { getCollection, findCommand } from 'db';
import { PermissionsLevel } from 'enums';

const setCooldown = async ({ args, say }) => {
  if (args.length !== 2) {
    await say('This command only takes 2 arguments');
    return;
  }

  const [name, cooldown] = args;

  const commands = await getCollection('commands');
  const existing = await findCommand(name);

  await commands.update({ _id: existing._id }, { $set: { cooldown: Number(cooldown) } });
  await say('Updated cooldown!');
};

setCooldown.command = 'setcooldown';
setCooldown.aliases = [
  'settimeout',
  'settimer',
  'addcooldown',
  'addtimer',
  'addtimeout',
  'modifytimeout',
  'modifycooldown',
];
setCooldown.timeoutLevel = PermissionsLevel.MOD;

export default setCooldown;
