const merch = async ({ say }) => {
  await say(
    "There's a lot of very high quality stuff available there with your favorite demon on it! Check it out:",
  );
  await say('https://willowthewhisper.com/merch');
};

merch.command = 'merch';
merch.aliases = ['merchandise', 'store'];

export default merch;
