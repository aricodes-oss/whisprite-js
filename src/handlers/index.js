import { getLastTimestamp, setLastTimestamp } from 'db';
import { PermissionsLevel } from 'enums';

import quoteHandlers from 'handlers/quotes';
import memeHandlers from 'handlers/memes';
import informationHandlers from 'handlers/information';

const handlers = [];

const register = handlerFunc => {
  handlers.push(async args => {
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
  });
};

[...quoteHandlers, ...memeHandlers, ...informationHandlers].map(register);

export default handlers;
