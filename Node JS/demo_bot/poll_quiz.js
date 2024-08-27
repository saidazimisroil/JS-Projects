const { Telegraf } = require("telegraf");
const dotenv = require("dotenv");
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("start", (ctx) => ctx.reply("Buyruqlar: /sorov /savol"));

bot.command("sorov", (ctx) =>
    ctx.replyWithPoll(
        "O`zingizga yoqadigan bitta rangni tanlang",
        ["ko`k", "qizil", "yashil", "oq", "pushti"],
        { is_anonymous: false }
    )
);
bot.command("savol", (ctx) =>
    ctx.replyWithQuiz(
        "Qur`on qayerda nozil bo`la boshlagan?",
        ["Toif", "Madina", "Makka", "Qohira"],
        { correct_option_id: 2 }
    )
);

bot.launch();
