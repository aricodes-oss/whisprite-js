const gloves = async ({ say }) => {
  await say(
    'Ritual Motion makes the amazing compression gloves that I use to help with joint pain over long runs. If you would like a set, make sure you click the Ritual Motion link below! This helps support me at no extra cost to you.',
  );
  await say('https://ritualmotion.com/shop/?ref=304');
};

gloves.command = 'gloves';
gloves.aliases = ['ritualmotion'];

export default gloves;
