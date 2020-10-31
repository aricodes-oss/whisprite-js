import { PermissionsLevel } from 'enums';

const getPermissionsLevel = message => {
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

export default getPermissionsLevel;
