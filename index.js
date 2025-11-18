// import TelegramBot from "node-telegram-bot-api";
const TelegramBot = require("node-telegram-bot-api");
const { config } = require("dotenv");
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
    bot.sendMessage(
      chatId,
      `
    👋 Assalomu alaykum, ${firstName}!

📚 100x o‘quv markazining rasmiy botiga xush kelibsiz!

Bu bot orqali siz:
• Kurslarimiz haqida batafsil ma’lumot olasiz  
• Kurslarga onlayn ro‘yxatdan o‘tishingiz mumkin  
• Jadval va to‘lovlar haqida ma’lumot olasiz  

Quyidagi menyudan kerakli bo‘limni tanlang 👇

    `,
      {
        reply_markup: {
          keyboard: [
            [{ text: "📚 Kurslar" }, { text: "✍️ Ro‘yxatdan o‘tish" }],
            [{ text: "ℹ️ Markaz haqida" }, { text: "💬 Fikr bildirish" }],
            [{ text: "❓ Yordam" }],
          ],
          resize_keyboard: true,
        },
      }
    );
  } else if (text == "📚 Kurslar") {
    bot.sendMessage(
      chatId,
      `
    🎓 Bizning o‘quv markazimizda quyidagi kurslar mavjud:

1️⃣ Ingliz tili  
2️⃣ Rus tili  
3️⃣ Matematika  
4️⃣ Dasturlash (Python, Web)  
5️⃣ Grafik dizayn  

👇 Quyidagi kurslardan birini tanlang va batafsil ma’lumot oling:

    `,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🇬🇧 Ingliz tili", callback_data: "course_english" }],
            [{ text: "🇷🇺 Rus tili", callback_data: "course_russian" }],
            [{ text: "🧮 Matematika", callback_data: "course_math" }],
            [{ text: "💻 Dasturlash", callback_data: "course_programming" }],
            [{ text: "🎨 Grafik dizayn", callback_data: "course_design" }],
          ],
        },
      }
    );
  } else if (text == "✍️ Ro‘yxatdan o‘tish") {
    const userExists = usersData.some((user) => user.chatId === chatId);
    console.log("bormi: ", userExists);

    if (!userExists) {
      usersData.push({ chatId: chatId, firstName: firstName, admin: false });
      // usersData = [...usersData, { chatId: chatId, firstName: firstName }];
    }

    console.log(usersData);
    // Foydalanuvchiga xabar jo'natish
    bot.sendMessage(chatId, `Tabriklaymiz, siz ro'yhatdan o'tdingiz! ✅`);

    // Adminga xabar jo'natish
    usersData.forEach((user) => {
      // console.log("USER: ", user.admin);
      if (user.admin) {
        bot.sendMessage(
          user.chatId,
          `Yangi xabar ✅\nUser: ${firstName}\nchatId: ${chatId}\n**************`
        );
      }
    });
  } else {
    bot.sendMessage(
      chatId,
      `
    ⚠️ Kechirasiz, men sizning xabaringizni tushunmadim.

Iltimos, quyidagi tugmani bosing 👇
/start

    `
    );
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
