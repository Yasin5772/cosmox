  const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    let tag = "✣"; // tagınız
    let sunucu = "683392291615801431"; //sunucu ID
    
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
      const emoji = client.emojis.find(emoji => emoji.name === "komik24");           ///örnek const emoji = client.emojis.find(emoji => emoji.name === "mavitik"); 
  const arvelosembed = new Discord.RichEmbed()
  .setThumbnail("https://i.pinimg.com/originals/57/08/cc/5708ccaeded88baca4fbb51a60eb528a.gif")
  .setDescription(" **Sunucu İstatistikleri** ")
  .addField("<a:emoji_56:732917598794285088>  **Sunucuda Bulunan Üye Sayısı** ",message.guild.memberCount)
    .addField("<a:emoji6:760841173853798411>  **Sunucudaki Aktif Üye Sayısı** ",message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
    .addField("<a:734206193291231262:758645051063664650> **Ses Kanallarında Bulunan Üye Sayısı** ", `${count}`)
    .addField("<a:emoji7:760841171056197672>  **Taglı Üye Sayısı** ",
      message.guild.members.filter(m => m.user.username.includes("✣")).size
    ) 
    .setFooter(client.user.username, message.guild.iconURL);
  message.channel.sendEmbed(arvelosembed)
    message.react(emoji)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
//say
exports.help = {
  name: 'say',
  description: 'sunucuyu sayar.',
  usage: 'say'
//say
};