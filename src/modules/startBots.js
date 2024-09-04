import { Telegraf } from 'telegraf'
import { BotClass } from '../classes/BotClass.js'
import { botStart } from '../triggers/botStart.js'
import { botChatMember } from '../triggers/botChatMember.js'
import { botCommands } from '../triggers/botCommands.js'
import { botMessage } from '../triggers/botMessage.js'
import { botCallback } from '../triggers/botCallback.js'

export const startBots = async (i, bots) => {
    const option = {allowedUpdates: ['my_chat_member', 'chat_member', 'callback_query', 'message', 'channel_post'], dropPendingUpdates: true}
    
    const bot = new Telegraf(i.token)
    const botA = new BotClass(i._id)
    await botStart(bot, botA)
    await botChatMember(bot, botA)
    await botCommands(bot, botA)
    await botMessage(bot, botA)
    await botCallback(bot, botA)
    bot.launch(option).catch((error) => {
        console.log(i._id, '\n', error)
        // bot.launch(option)
    })
    bots.push({_id: i._id, bot: bot, name: i.username})
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
    console.log('start bot:', i.username)
}