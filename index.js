// import TelegramBot from "node-telegram-bot-api";
import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import { onElse } from "./src/onElse.js";
import { onCourses } from "./src/onCourse.js";
import { onStart } from "./src/onStart.js";
import { onRegister } from "./src/onRegister.js";

config();

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

let usersData = [
  { chatId: 970837493, firstName: "Azizbek", admin: true },
  { chatId: 7621131970, firstName: "Shahnoza✨️", admin: true },
  { chatId: 7437221525, firstName: "Ziyoda💞", admin: true },
  { chatId: 1383618267, firstName: "Жавохир", admin: true },
  { chatId: 7244321956, firstName: "Diyora🤞", admin: true },
  { chatId: 6049043081, firstName: "Mavjudabonu", admin: true },
  { chatId: 8057065769, firstName: "𝓂𝒶𝒻𝓉𝓊𝓃𝒶 💞", admin: true },
  { chatId: 875072364, firstName: "Abbosbek", admin: true },
];

bot.on("message", (msg) => {
  // console.log(msg);
  const chatId = msg.chat.id;
  const text = msg.text;
  const firstName = msg.chat.first_name;

  if (text == "/start") {
    onStart(chatId, firstName);
  } else if (text == "📚 Kurslar") {
    onCourses(chatId);
  } else if (text == "✍️ Ro‘yxatdan o‘tish") {
    onRegister(chatId);
  } else {
    onElse(chatId);
  }
});

bot.on("callback_query", (query) => {
  console.log(query);
  const chatId = query.message.chat.id;
  const firstName = query.message.chat.first_name;
  const data = query.data;

  if (data == "course_english") {
    bot.sendMessage(
      chatId,
      `
    🇬🇧 Ingliz tili kursi haqida:

📆 Davomiyligi: 3 oy  
⏰ Darslar: Haftasiga 3 marta (1,5 soatdan)  
👨‍🏫 O‘qituvchi: Tajribali filologlar  
💰 Narxi: 450 000 so‘m / oy

✍️ Agar sizni bu kurs qiziqtirsa, “Ro‘yxatdan o‘tish” tugmasini bosing.

    `,
      {
        reply_markup: {
          keyboard: [
            [{ text: "✍️ Ro‘yxatdan o‘tish" }],
            [{ text: "⬅️ Orqaga" }],
          ],
          resize_keyboard: true,
        },
      }
    );
  }

  // bot.sendMessage(chatId, data);
});

console.log("Bot ishga tushdi");

export { bot };
