// const db = require('quick.db')
// const { MessageEmbed } = require('discord.js')

// module.exports = {
//     name : 'afk',
//     category: 'game',
//     run : async(client, message, args, cmd) => {
//         const content = args.join(" ")
//         await db.set(`afk-${message.author.id}+${message.guild.id}`, content)
//         const embed = new MessageEmbed()
//         .setDescription(`You have been set to afk\n**Reason :** ${content}`)
//         .setColor("GREEN")
//         .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
//         message.channel.send(embed)                
//     }
// }
const quick = require('quick.db');

module.exports = {
  name: 'afkset',
  aliases: ['status'],
  description: 'Chỉnh status của bạn',
  run: async (client, message, args, cmd) => {
    // check if the client can change nicknames
    if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('Có một vài lỗi ở đây!😭');
    // Add/update the member in the database
    quick.set(`${message.author.id}_${message.guild.id}_afk`, {
      username: message.member.displayName.replace('[AFK]', ''), // replace the AFK part of the nickname of the member is afk and uses the command again
      active: true, // Set to true so it will be passed up by the if check in the message event
      date: Date.now(), // set the data this was done
    });

    message.member
      .setNickname(`[AFK] ${message.member.displayName.replace('[AFK]', '')}`) // Make sure on the name inplacation to replace the AFk part of the name
      // reply to say status set
      .then(() => {
        return message.reply(`Status đã chuyển thành afk 😴`);
      })
      // catch an error and then remove the member form the database and send a message
      .catch(_e => {
        quick.delete(`${message.author.id}_${message.guild.id}_afk`);
        return message.channel.send('Có một vài lỗi ở đây!:point_up_2:');
      });
  },
};