var mysql = require('mysql');
var con = mysql.createConnection('mysql://root:root@localhost:8889/TCO');

const { prefix, token } = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();



client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const places = commandBody.split(',');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

  else if (command === "sum") {
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter += x);
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  }
  
  else if (command === "add") {
  con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO TCO (name, address) VALUES ?";
  var values = [
    [places[0], places[1]]
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    message.reply(`Added!`);
  });
});
  }
});

