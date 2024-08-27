const { Telegraf } = require("telegraf");
const { Markup } = require("telegraf");
const dotenv = require("dotenv");
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const amountArray = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
];
let amount = 0;

bot.command("start", (ctx) =>
    ctx.reply(
        "Xush kelibsiz!",
        Markup.keyboard([
            ["Taomlar 🍪", "Ichimliklar 🥛"],
            ["Savat 🧺", "Rasmiylashtirish 💵"],
        ])
            .oneTime()
            .resize()
    )
);

// taomlar
bot.hears("Taomlar 🍪", (ctx) =>
    ctx.reply(
        "Taomni tanlang",
        Markup.keyboard([["Chuchvara", "Lag`mon", "Osh"]])
            .oneTime()
            .resize()
    )
);

bot.hears("Chuchvara", (ctx) => {
    ctx.replyWithPhoto(
        { source: "media/chuchvara.jpg" },
        {
            caption: `
                Chuchvara

Mazali O'zbek Chuchvarasi + Suzma

Narxi: 25 000 So'm`,
        }
    );
    ctx.reply("Miqdorni raqam orqali kiriting");
});
bot.hears("Lag`mon", (ctx) => {
    ctx.replyWithPhoto(
        { source: "media/lagmon.jpg" },
        {
            caption: `
            Lag'mon

Mazzali O'zbek Lag'moni

Narxi: 20 000 So'm`,
        }
    );
    ctx.reply("Miqdorni raqam orqali kiriting");
});
bot.hears("Osh", (ctx) => {
    ctx.replyWithPhoto(
        { source: "media/osh.jpg" },
        {
            caption: `
            Osh

Mazali O'zbek Oshi

Narxi: 22 000 So'm`,
        }
    );
    ctx.reply("Miqdorni raqam orqali kiriting");
});
bot.hears(/\d+/, (ctx) => {
    amount += parseInt(ctx.message.text);

    // You can now use the 'amount' variable in your logic
    ctx.reply(`Miqdor: ${amount}`);
});

bot.launch();
