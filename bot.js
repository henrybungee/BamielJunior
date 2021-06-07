//https://discord.com/api/oauth2/authorize?client_id=851569621106032651&permissions=134466624&scope=bot

const Discord = require("discord.js")
const client = new Discord.Client()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
})

client.login("ODUxNTY5NjIxMTA2MDMyNjUx.YL6MAw.__fiiO0DyMoA_fiGV6EhIcVuQ84");