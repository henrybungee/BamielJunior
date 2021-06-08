const Discord = require('discord.js');
const ping = require('../commands/ping');
const storage = require('../commands/storage');
const callstorage = require('../commands/callstorage');
const setbandcamp = require('../commands/setbandcamp');
const viewbc = require('../commands/viewbc');
const setyt = require('../commands/setyt');
const viewyt = require('../commands/viewyt');
const setname = require('../commands/setname');
const viewprofile = require('../commands/viewprofile');
const setdesc = require('../commands/setdesc');
const viewdaw = require('../commands/viewdaw');
const setdaw = require('../commands/setdaw');
const setsc = require('../commands/setsc');
const viewsc = require('../commands/viewsc');
const setprofilecolor = require('../commands/setprofilecolor');


module.exports = async (client, msg) => {

    let prefix = "$";

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
    
    if (msg.content.startsWith(prefix + 'setname')) {
        return setname(client, msg);
    }

    if (msg.content.startsWith(prefix + 'profile') || msg.content.replace(/\s/g, "") === prefix + 'p') {
        return viewprofile(client, msg);
    }

    if (msg.content.startsWith(prefix + 'setd ')) {
        return setdesc(client, msg);
    }

    if (msg.content.startsWith(prefix + 'daw')) {
        return viewdaw(client, msg);
    }

    if (msg.content.startsWith(prefix + "setdaw")) {
        return setdaw(client, msg);
    }

    if (msg.content.startsWith(prefix + "setsc")) {
        return setsc(client, msg);
    }

    if (msg.content.startsWith(prefix + "sc")) {
        return viewsc(client, msg);
    }

    if (msg.content.startsWith(prefix + "setcolor")) {
        return setprofilecolor(client, msg);
    }

}