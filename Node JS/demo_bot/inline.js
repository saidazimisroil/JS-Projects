const { Telegraf } = require("telegraf");
const { Markup } = require("telegraf");
const dotenv = require("dotenv");
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(Telegraf.log());

bot.command("start", (ctx) => {
    const firstName = ctx.message.from.first_name;

    const keyboard = Markup.inlineKeyboard([
        // Markup.button.url("Visit Google", "https://www.google.com"),
        Markup.button.callback("Vaaleykum assalom!", "ws"),
        // Add more buttons as needed
    ]);

    ctx.replyWithHTML(`Assalomu aleykum, <b>${firstName}</b>`, keyboard);
});
bot.action("ws", (ctx) => {
    ctx.reply(
        `Ahvollar qalay?`,
        Markup.inlineKeyboard([
            Markup.button.callback("A`lo", "alo"),
            Markup.button.callback("Yaxshi", "yaxshi"),
            Markup.button.callback("Yomon", "yomon"),
        ])
    );
});

bot.action("yomon", (ctx) => {
    return ctx.answerCbQuery("Ajab bo`pti!!!");
});

bot.action("yaxshi", (ctx) => {
    ctx.replyWithHTML("<i>Kuningiz yaxshi o`tsin</i>");
});

bot.action("alo", (ctx) => {
    ctx.reply(
        "Xursandman! Quyidagi tugmalardan birini tanlang",
        Markup.keyboard([
            ["Bahor 🌿", "Yoz ☀️"],
            ["Kuz ☔", "Qish ❄️"],
        ])
            .oneTime()
            .resize()
    );
});

bot.hears("Bahor 🌿", (ctx) => {
    ctx.replyWithPhoto({ source: "media/spring.jpg" });
});
bot.hears("Yoz ☀️", (ctx) => {
    ctx.replyWithPhoto({ source: "media/yoz.jpg" });
});
bot.hears("Kuz ☔", (ctx) => {
    ctx.reply("KUZ fasli menga yoqmaydi !!!");
});
bot.hears("Qish ❄️", (ctx) => {
    ctx.replyWithPhoto({ source: "media/winter.jpg" });
});

bot.launch();
