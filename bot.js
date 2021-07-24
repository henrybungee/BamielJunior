//https://discord.com/api/oauth2/authorize?client_id=851569621106032651&permissions=379968&scope=bot

const Discord = require('discord.js');
const client = new Discord.Client();

const disbut = require('discord-buttons')(client);

//handle the file system stuff
const fs = require('fs');

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split('.')[0];

    client.on(eventName, arg => eventHandler(client, arg));
  })
})

//const botToken = process.env.BOT_TOKEN;

client.login('ODUxNTY5NjIxMTA2MDMyNjUx.YL6MAw.i4EJJOSmjP_QE3V0nfN2QQdssgc');

//TODO LIST
//#1: trophies command does something if you have trophies (DONE)
//#2: Blacklist list is admin-only (DONE)
//#3: Change the name of the change report channel command (DONE)
//#4: report should support pings, not just IDs (DONE)
//#5: Don't show the report channel name when confirming the report (DONE)

//5 issues, not bad. It's better than 6. or 7 or anything else. 
//But it's not better than 4 or under. R.I.P.
