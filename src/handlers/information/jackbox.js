const jackbox = async ({ say }) => {
  say(
    'Make sure you authorize your twitch account with jackbox.tv! Open the menu, click twitch, sign in with twitch, and click authorize. If you don’t do this, it will say “server error” and not let you join!',
  );
};

jackbox.command = 'jackbox';

export default jackbox;
