import { getLastTimestamp, setLastTimestamp } from 'db';
import { PermissionsLevel } from 'enums';

export const getPermissionsLevel = message => {
  let level = PermissionsLevel.USER;

  if (message.isVip) {
    level = PermissionsLevel.VIP;
  }

  if (message.isMod) {
    level = PermissionsLevel.MOD;
  }

  if (message.isStreamer) {
    level = PermissionsLevel.STREAMER;
  }

  return level;
};

export const wrapHandlerFunc = handlerFunc => async args => {
  const {
    command,
    aliases = [],
    permissionsLevel = PermissionsLevel.USER,
    cooldown = 2 * 1000, // 2 seconds
    overridesCooldown = PermissionsLevel.MOD,
  } = handlerFunc;

  const commandMatches =
    Boolean(command) && (args.command === command || aliases.includes(args.command));
  const permissionsMatch = args.message.permissionsLevel >= permissionsLevel;

  // Don't hit the DB unless we need to
  if (commandMatches && permissionsMatch) {
    const lastUsedTimestamp = await getLastTimestamp(command);

    if (
      Date.now() - cooldown >= lastUsedTimestamp ||
      args.message.permissionsLevel >= overridesCooldown
    ) {
      setLastTimestamp(command);
      handlerFunc(args);
    }
  }
};
