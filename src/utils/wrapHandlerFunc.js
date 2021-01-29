import { PermissionsLevel } from 'enums';
import { getLastTimestamp, setLastTimestamp, getNextSequence } from 'db';

const wrapHandlerFunc = handlerFunc => async args => {
  const {
    command,
    aliases = [],
    permissionsLevel = PermissionsLevel.USER,
    cooldown = 2 * 1000, // 2 seconds
    overridesCooldown = PermissionsLevel.MOD,
  } = handlerFunc;

  const commandMatches =
    Boolean(command) &&
    (args.command.toLowerCase() === command.toLowerCase() ||
      aliases.map(s => s.toLowerCase()).includes(args.command.toLowerCase()));
  const permissionsMatch = args.message.permissionsLevel >= permissionsLevel;

  // Don't hit the DB unless we need to
  if (commandMatches && permissionsMatch) {
    const lastUsedTimestamp = await getLastTimestamp(command);
    const count = await getNextSequence(command);

    if (
      Date.now() - cooldown >= lastUsedTimestamp ||
      args.message.permissionsLevel >= overridesCooldown
    ) {
      setLastTimestamp(command);
      handlerFunc({ ...args, context: { ...args.context, count } });
    }
  }
};

export default wrapHandlerFunc;
