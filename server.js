const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`https://sofbb.glitch.me`); /// حط اسم المشروع تبعك name تعديل مهم بدل
}, 280000);

// بكجات
const Discord = require("discord.js");
const {
    YT_API_KEY,
    prefix,
    devs
} = require('./config')
const client = new Discord.Client({
    disableEveryone: true
})
client.login(process.env.TOKEN);
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

});


//كود البرودكاست

client.on("message", async message => {
    if (!message.guild || message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.content.startsWith(prefix + "bc")) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('You dont have Permissions.');
        if (message.guild.interval) return message.reply('**Another broadcast is running, please wait for it to finish**')
        let args = message.content
            .split(" ")
            .slice(1)
            .join(" ");
        if (!args)
            return message.reply('**Please send a message after the order to send**');

        message.channel
            .send(
                ">>> **[1] All members\n[2] Online members\n[3] Special ranks\n[4] Cancel**"
            )
            .then(m => {
                message.channel
                    .awaitMessages(msg => msg.author.id === message.author.id, {
                        max: 1,
                        time: 1000 * 60 * 2,
                        errors: ["time"]
                    })
                    .then(async (c) => {
                        var members = null;
                        if (c.first().content === "1") {
                            members = message.guild.members.array();
                            c.first().delete().catch (err => null);
                            m.delete().catch (err => null);
                        }
                        if (c.first().content === "2") {
                            members = message.guild.members
                                .filter(m => m.presence.status !== "offline").array();

                            c.first().delete().catch (err => null);
                            m.delete().catch (err => null);
                        }
                        if (c.first().content == "0C") {
                            c.first().delete().catch (err => null);
                            m.delete().catch (err => null);
                            message.channel.send("**It was canceled successfully**");
                        }
                        if (c.first().content === "3") {
                            m.edit("**>>> Enter the rank name, please**").then(ms => {
                                message.channel
                                    .awaitMessages(msg => msg.author.id === message.author.id, {
                                        max: 1,
                                        time: 1000 * 60 * 2,
                                        errors: ["time"]
                                    })
                                    .then(async collected => {
                                        let role = message.guild.roles.find(
                                            role => role.name === collected.first().content
                                        );
                                        if (!role)
                                            return message.channel
                                                .send("**:x: I can't find the rank of the message**")
                                                .then(() => {
                                                    ms.delete().catch (err => null);
                                                    collected.first().delete().catch (err => null);
                                                });

                                        let roleID = role.id;
                                        members = message.guild.roles.get(roleID).members.array();
                                        if (members == null) return message.reply('**invalid number**');
                                        if (members.length == 0) return message.reply('**The number was not found.**');
                                        else {
                                            const msg = await message.channel.send(`**Message is being sent to ${members.length} members...**`)
                                            var count = 0;
                                            var ycount = 0;
                                            var xcount = 0;
                                            message.guild.interval = await setInterval(() => {
                                                if (!members[count]) {
                                                    clearInterval(message.guild.inter);
                                                    msg.edit(new Discord.RichEmbed().setDescription(`** :mailbox_with_mail:  ؛ Message has been sent to  ${ycount} members\n:lock: ؛ and I couldn't send the message to ${xcount} members**`).setTimestamp());
                                                    message.guild.interval = false;
                                                } else if (!members[count].user.bot) {
                                                    members[count].send(`${args}`).then(() => {
                                                        ycount++;
                                                    }).catch(err => {
                                                        return xcount++;
                                                    });
                                                }
                                                count++;
                                            }, 500)
                                        }
                                        collected.first().delete();
                                        m.delete();
                                    }).catch(err => {
                                        return ms.delete().catch (err => null);
                                    })
                            });
                        };
                        if (['1', '2'].includes(c.first().content)) {
                            if (members == null) return message.reply('**invalid number**');
                            if (members.length == 0) return message.reply('**The number was not found.**');
                            else {
                                const msg = await message.channel.send(`**Message is being sent to ${members.length} members...**`)
                                var count = 0;
                                var ycount = 0;
                                var xcount = 0;
                                message.guild.interval = await setInterval(() => {
                                    if (!members[count]) {
                                        clearInterval(message.guild.inter);
                                        msg.edit(new Discord.RichEmbed().setDescription(`** :mailbox_with_mail:  ؛ Message has been sent to  ${ycount} members\n:lock: ؛ and I couldn't send the messages to ${xcount} members**`).setTimestamp());
                                        message.guild.interval = false;
                                    } else if (!members[count].user.bot) {
                                        members[count].send(`${args}`).then(() => {
                                            ycount++;
                                        }).catch(err => {
                                            return xcount++;
                                        });
                                    }
                                    count++;
                                }, 500)
                            }
                        }


                    })
                    .catch((err) => {
                        return m.delete().catch (err => null);
                    });
            });
    } else if (message.content.startsWith(prefix + "setname")) {
        let args = message.content
            .split(" ")
            .slice(1)
            .join(" ");
        if (!message.author.id === "218987278289076226") return; ///تعديل مهم حط الايدي تبعك
        client.user.setUsername(args);
        message.channel.send(`The name has been changed to ..**${args}** `);
    } else if (message.content.startsWith(prefix + "setavatar")) {
        let args = message.content
            .split(" ")
            .slice(1)
            .join(" ");
        if (!message.author.id === "218987278289076226") return; /// تعديل مهم حط الايدي تبعك
        client.user.setAvatar(args).catch(err => message.reply("send a valid url"));
        message.channel.send(`The image has been changed to :**${args}** `);
    }
});

///تغير الحالة

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on("ready", () => {
    client.user.setStatus("online"); ///تعديل مهم لون الحالة
});
client.on("ready", () => {
    client.user.setActivity(`${prefix}bc`, { ///تعديل مهم حالة البوت
        type: "WATCHING"
    }); ///تعديل حالة البوت
});

//online
//idle
//dnd
//offline