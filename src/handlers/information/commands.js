const commands = async ({ say }) => {
  say(
    "Sorry, I don't have that ability yet! Willow needs to build a web frontend for me first willow33S",
  );
};

commands.command = 'commands';
commands.aliases = ['showcommands', 'allcommands', 'commandlist', 'commandslist'];

export default commands;
