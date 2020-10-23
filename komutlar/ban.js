const Discord = require('discord.js');
const moment = require('moment')
const talkedRecently = new Set();
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;

exports.run = async (bot, message, args, client) => {
  
   var başarılı = ['**Başarılı!** <a:emoji_56:732917598794285088>'];
   var x = başarılı[Math.floor(Math.random() * başarılı.length)];

   var başarısız = ['**Başarısız!** <a:753663471618359367:755147048701132878>'];
   var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];
  
let db = require('quick.db')
let data2 = await db.fetch(`banyetkilisi_${message.guild.id}`)
if(!data2)  return message.channel.send(x2 + ` Ban yetkilisi rolünü bulamadım.\nBilgi almak için: .yardım ban-yetkilisi`)
let data3 = await db.fetch(`bankanal_${message.guild.id}`)
if(!data3)  return message.channel.send(x2 + ` Ban kanalını bulamadım.\nBilgi almak için: .yardım ban-kanal`)
let yetkili = message.guild.roles.get(data2)
if(!yetkili) return message.channel.send(x2 + ` Ban yetkilisi ayarlı değil?!\nBilgi almak için: .yardım ban-yetkilisi`)
let kanal = message.guild.channels.get(data3)
if(!kanal) return message.channel.send(x2 + ` Ban kanalı ayarlı değil?!\nBilgi almak için: .yardım ban-kanal`)
  

   if (!message.member.roles.has(`${yetkili.id}`)) return message.channel.send(`**${ayarlar.prefix}ban** isimli komutu kullanabilmek için ${yetkili} rolüne sahip olman gerekiyor.`)
    let reason = args.slice(1).join(' ')
    
    if (!args[0]) return message.channel.send(x2 + ` Birini etiketlemeyi unuttun!`)
    let user = message.mentions.users.first() || bot.users.get(args[0]) || message.guild.members.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user

    if (!user) return message.channel.send(x2 + ` Etiketlediğin kişiyi sunucuda bulamadım. Bir daha dene.`)
    let member = message.guild.member(user)
    if (!member) return message.channel.send(x2 + ` Etiketlediğin kişiyi sunucuda bulamadım. Bir daha dene.`)
    if (member.hasPermission("BAN_MEMBERS")) return message.channel.send(x2 + ` Bu kişiyi yasaklayamam.`)
   member.send(`**NORİ BAN** sistemi ile ${message.guild.name} (${message.guild.id}) sunucusunda ${message.author} (${message.author.id}) tarafından ${reason} sebebiyle yasaklandın.`)
        member.ban(`${message.author.tag} tarafından ${reason}`)
                message.channel.send(x + ` ${user.tag}, isimli kişi başarıyla yasaklandı.`)
        const yasaklandı = new Discord.RichEmbed()
  .setAuthor(user.tag, user.avatarURL)
  .setDescription(`Bir kişi sunucudan yasaklandı!`)
.addImage("https://media.giphy.com/media/d2jfPv6CUzpopfLa/giphy.gif")
  .addField(`**Yasaklanan kişi:**`, user, true)
.setColor(`#f3c7e1`)
  .addField(`**Yasaklayan kişi:**`, `<@${message.author.id}>`, true)
  .addField(`**Yasaklanma sebebi:**`, reason ? reason : 'Sebep belirtilmemiş.', true)
    .setThumbnail(user.avatarURL)
.setTimestamp()
  .setFooter(`${message.channel.name} kanalında kullanıldı.`)
kanal.send(yasaklandı)
   }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yasakla', 'uçur'],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Etiketlediğiniz kişiyi sebebi ile sunucudan banlar.',
	usage: 'ban kişi sebep',
  kategori: '**MODERASYON**',
  permLvl: '**Bulunmuyor.** (.ban-yetkilisi ayarla)'
};