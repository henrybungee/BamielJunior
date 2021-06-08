const Discord = require('discord.js');
const ping = require('../commands/ping');
const storage = require('../commands/storage');
const callstorage = require('../commands/callstorage');
const setbandcamp = require('../commands/setbandcamp');
const viewbc = require('../commands/viewbc');
const setyt = require('../commands/setyt');
const viewyt = require('../commands/viewyt');

module.exports = async (client, msg) => {

    let prefix = "!";

    if (msg.content.startsWith(prefix + 'ping')) {
        return ping(client, msg);
    }

    if (msg.content.startsWith(prefix + 'test')) {
        return storage(client, msg);
    }

    if (msg.content.startsWith(prefix + 'recall')) {
        return callstorage(client, msg);
    }

    if (msg.content.startsWith(prefix + 'setbc')) {
        return setbandcamp(client, msg);
    }

    if (msg.content.startsWith(prefix + 'bc')) {
        return viewbc(client, msg);
    }

    if (msg.content.startsWith(prefix + 'setyt')) {
        return setyt(client, msg);
    }

    if (msg.content.startsWith(prefix + 'yt')) {
        return viewyt(client, msg);
    }

}