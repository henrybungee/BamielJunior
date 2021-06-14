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

client.login('ODUxNTY5NjIxMTA2MDMyNjUx.YL6MAw.MQAg5JlkX7G_LuUeBWOc6PvFK2E');

//TODO LIST
//#1: trophies command does something if you have trophies
//#2: Blacklist list is admin-only
//#3: Change the name of the change report channel command
//#4: report should support pings, not just IDs
//#5: Don't show the report channel name when confirming the report
//#6: 