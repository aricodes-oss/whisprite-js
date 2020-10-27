const avDiscord = async ({ say }) => {
  await say('Join the Axiom Verge speedrunning community!');
  await say('https://discord.gg/hngJJgz');
};

avDiscord.command = 'avdiscord';
avDiscord.aliases = ['axiomdiscord', 'avsr', 'avsrcommunity', 'avsrdiscord'];

export default avDiscord;
