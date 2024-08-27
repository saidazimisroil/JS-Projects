const { Telegraf } = require("telegraf");
// const Extra = require("telegraf/extra");
const dotenv = require("dotenv");
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// sending photo
bot.command("sad", (ctx) => ctx.replyWithPhoto({ source: "media/sad.jpg" }));
bot.command("busy", (ctx) => ctx.replyWithPhoto({ source: "media/busy.jpg" }));
bot.command("numbers", (ctx) =>
    ctx.replyWithPhoto({ source: "media/Numbers.png" })
);

// with caption
bot.command("pr_photo", (ctx) =>
    ctx.replyWithPhoto(
        { source: "media/profile_photo.jpg" },
        { caption: "My Profile photo" }
    )
);

// url
bot.command("url", (ctx) =>
    ctx.replyWithPhoto(
        "https://www.hocalwire.com/h-upload/uid/UrqcwKUWdSIBFwKspwg7hiPlTyX5TAoB7033284.jpg"
    )
);

// sending GIFs
bot.command("smile", (ctx) =>
    ctx.replyWithAnimation({ source: "media/smile.gif" })
);
bot.command("wait", (ctx) =>
    ctx.replyWithAnimation({ source: "media/wait.gif" })
);

bot.launch();
