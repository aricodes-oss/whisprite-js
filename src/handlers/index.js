import { wrapHandlerFunc } from 'utils';

import quoteHandlers from 'handlers/quotes';
import memeHandlers from 'handlers/memes';
import informationHandlers from 'handlers/information';
import dynamicHandlers from 'handlers/dynamic';

const handlers = [];

const register = handlerFunc => {
  handlers.push(wrapHandlerFunc(handlerFunc));
};

[...quoteHandlers, ...memeHandlers, ...informationHandlers, ...dynamicHandlers].map(register);

export default handlers;
