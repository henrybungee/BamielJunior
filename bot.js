//https://discord.com/api/oauth2/authorize?client_id=851569621106032651&permissions=379968&scope=bot

const Discord = require('discord.js');
const client = new Discord.Client();

//handle the file system stuff
const fs = require('fs');

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]

    client.on(eventName, arg => eventHandler(client, arg));
  })
})

console.log("IM READY!!!");

client.login('insert token');