const friendCode = async ({ say }) => {
  say('My Switch friend code is SW-8079-2232-9226');
};

friendCode.command = 'fc';
friendCode.aliases = ['friendcode', 'switchfc', 'switchfriendcode'];

export default friendCode;
