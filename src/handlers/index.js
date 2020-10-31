import { wrapHandlerFunc } from 'utils';

import quoteHandlers from 'handlers/quotes';
import memeHandlers from 'handlers/memes';
import dynamicHandlers from 'handlers/dynamic';

const handlers = [];

const register = handlerFunc => {
  handlers.push(wrapHandlerFunc(handlerFunc));
};

[...quoteHandlers, ...memeHandlers, ...dynamicHandlers].map(register);

export default handlers;
