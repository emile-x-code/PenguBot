const { Command } = require("klasa");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["sendslap"],
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_SLAP_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:username>"
        });
    }

    async run(msg, [user]) {
        const { body } = await get("https://nekos.life/api/v2/img/slap").catch(e => {
            Error.captureStackTrace(e);
            return e;
        });
        const embed = new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setImage(body.url)
            .setColor("RANDOM");
        return msg.sendMessage(`🖐 | ***${user}, you just got slapped by ${msg.author}!***`, { embed: embed });
    }

};
