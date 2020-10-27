const discord = async ({ say }) => {
  await say(
    'Join my discord channel to be updated whenever I go live and to keep in touch with the community!',
  );
  await say('https://discord.gg/BurtWcS');
};

discord.command = 'discord';

export default discord;
