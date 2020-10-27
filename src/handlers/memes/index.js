import vore from './vore';
import bandNames from './bandNames';
import nicknames from './nicknames';
import sandwiches from './sandwiches';
import scream from './scream';

const memeHandlers = [vore, sandwiches, scream, ...bandNames, ...nicknames];

export default memeHandlers;
