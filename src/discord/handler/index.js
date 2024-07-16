const fs = require("fs");
const path = require("path");
const colors = require("colors");

module.exports = async (client) => {
  const SlashsArray = [];

  fs.readdir(path.join(__dirname, '../commands'), (error, folders) => {
    if (error) return console.error(error);

    folders.forEach(subfolder => {
      fs.readdir(path.join(__dirname, `../commands/${subfolder}`), (error, files) => {
        if (error) return console.error(error);

        files.forEach(file => {
          if (!file.endsWith('.js')) return;

          const command = require(path.join(__dirname, `../commands/${subfolder}/${file}`));
          if (!command.name) return;

          client.slashCommands.set(command.name, command);
          SlashsArray.push(command);
        });
      });
    });
  });

  client.on("ready", async () => {
    client.guilds.cache.forEach(guild => guild.commands.set(SlashsArray));
    console.log(colors.cyan(`╰ » ${SlashsArray.length} comandos registrados`));
  });
};
