import { PermissionsLevel } from 'enums';
import quoteHandlers from 'handlers/quotes';

const handlers = [];

const register = handlerFunc => {
  handlers.push(args => {
    const { command, aliases = [], permissionsLevel = PermissionsLevel.USER } = handlerFunc;
    const commandMatches =
      Boolean(command) && (args.command === command || aliases.includes(args.command));
    const permissionsMatch = args.message.permissionsLevel >= permissionsLevel;

    if (commandMatches && permissionsMatch) {
      handlerFunc(args);
    }
  });
};

quoteHandlers.map(register);

export default handlers;
