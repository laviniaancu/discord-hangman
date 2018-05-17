// const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const path = require('path');
const { token, prefix } = require('./botsettings.json');

const bot = new Commando.Client();

bot.on('ready', async () => {
  console.log(`${bot.user.username} ready for action!`);
  try {
    const link = await bot.generateInvite(['ADMINISTRATOR']);
    console.log(link);
  } catch (err) { console.log(err.stack); }
});

bot.registry
  .registerGroup('random', 'Random')
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, '/commands'));

bot.login(token);


//
// bot.on('message', (message) => {
//   if (message.author.bot) return;
//   const messageArray = message.content.split(' ');
//
//   const command = messageArray[0]; // command is the first word
//   let args = messageArray.slice(1); // remove command
//   if (!command.startsWith(prefix)) return; // if it's not a !command, we don't want it
//   if (command === `${prefix}hello`) {
//     const embed = new Discord.RichEmbed()
//       .setTitle('Welcome to Lav-bot')
//       // .setURL('https://www.google.com')
//       .setAuthor(message.author.username)
//       .setDescription('Info about the user')
//       .setColor('#FF0000')
//       .addField('This user was created on ', message.author.createdAt)
//     message.channel.send(embed);
//   }

/*

// if (command === `${prefix}hangman`) {
//   message.react('😁');
// }

*/
