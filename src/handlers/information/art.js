const art = async ({ say }) => {
  say(
    'Art assets created by: Nickel2Sulfate (Niiso4). Illustrator and Graphic Design Freelancer. Find them at @Nickel2sulfate (Twitter)',
  );
};

art.command = 'art';
art.aliases = ['artist', 'illustrations', 'illustrator', 'assets', 'nickel', 'nickle', 'overlay'];

export default art;
