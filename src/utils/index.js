import { PermissionsLevel } from 'enums';

// eslint-disable-next-line import/prefer-default-export
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
