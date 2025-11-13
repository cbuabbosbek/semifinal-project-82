// import TelegramBot from "node-telegram-bot-api";
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "7692042778:AAE1QmPLBW8T3mCrmU4YpZicSBCLu8z1dvU";

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;
  const text = msg.text;

//   bot.sendMessage(chatId, text);

    


});

console.log("Bot ishga tushdi");
