import 'dotenv/config'
import { Telegraf } from 'telegraf'
import { db } from './src/db/db.js'
import { AppClass } from './src/classes/AppClass.js'
import { botStart } from './src/triggers/botStart.js'
import { BotClass } from './src/classes/BotClass.js'
import { botMessage } from './src/triggers/botMessage.js'
import { botCallback } from './src/triggers/botCallback.js'
import { botChatMember } from './src/triggers/botChatMember.js'
import { botCommands } from './src/triggers/botCommands.js'


async function startBot(){
    try{
        const option = {allowedUpdates: ['my_chat_member', 'chat_member', 'callback_query', 'message', 'channel_post'], dropPendingUpdates: true}
        const status = await db()
        if(status){
            const app = new AppClass()
            // await app.deleteAllBots()
            // await app.createTestBot()
            // await app.createScreen()
            const appContext = await app.getAllActiveBots()
            if(appContext.length){
                for(const i of appContext){
                    const bot = new Telegraf(i.token)
                    const botA = new BotClass(i._id)
                    await botStart(bot, botA)
                    await botChatMember(bot, botA)
                    await botCommands(bot, botA)
                    await botMessage(bot, botA)
                    await botCallback(bot, botA)
                    bot.launch(option).catch((error) => {console.log(i._id, '\n', error)})
                    process.once('SIGINT', () => bot.stop('SIGINT'))
                    process.once('SIGTERM', () => bot.stop('SIGTERM'))
                }
            }
            else{
                console.log('Хер там... Активных ботов нет...')
            } 
        }
        else{
            console.log('Хер там... База не подключается...')
        }
    }
    catch(error){
        console.log('Ошибка запуска бота...')
        console.log(error)
    }
}

startBot()