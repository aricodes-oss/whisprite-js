const scream = async ({ say }) => {
  say('https://clips.twitch.tv/DaintyApatheticTrufflePeteZarollTie');
};

scream.command = 'scream';
scream.aliases = ['screm', 'spooks', 'startled'];

export default scream;
