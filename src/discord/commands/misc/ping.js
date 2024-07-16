const Discord = require("discord.js")

module.exports = {
  name: 'ping',
  description: '[ / ] Veja a latência do Bot em milisegundos',
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
      if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando`, ephemeral: true })
      } else {
        const ping = client.ws.ping;

        let embed = new Discord.EmbedBuilder()
        .setDescription(`Olá ${interaction.user} o ping do Bot está em ${ping} ms`)
        .setColor(`DarkButNotBlack`)

        interaction.reply({ embeds: [embed], ephemeral: true })
      }
  }
}