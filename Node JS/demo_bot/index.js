TELEGRAM_BOT_TOKEN = "5922954057:AAHuy-ya7AOPaTQSfio3ke5i35x8Je_fW6w";

const TeleBot = require("telebot");
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);
const chatIds = [];
const { CronJob } = require("cron");

bot.on("text", (msg) => msg.reply.text("Kelgan xabar: " + msg.text));

const job = new CronJob(
    "0/5 * * * * *", // cronTime
    function () {
        console.log("You will see this message every 5 second");
        chatIds.forEach((chId) => {
            bot.sendMessage(chId, "Salom...");
        });
    }, // onTick
    null, // onComplete
    true // start
);
// job.start() is optional here because of the fourth parameter set to true.

bot.on(["/start"], (msg) => {
    let chatId = msg.chat.id;
    if (!chatIds.includes(chatId)) {
        chatIds.push(chatId);
        msg.reply.text("Boshladik!");
        job.start();
    }
});

bot.on(["/stop"], (msg) => {
    let chatId = msg.chat.id;
    chatIds.pop(chatId);
});

bot.start();
