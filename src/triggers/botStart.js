import { SocketApt } from "../socket/api/socket-api.js"

export const botStart = async (bot, botA) => {
    try{
        bot.start(async (ctx) => {
            if(ctx.message.chat.id > 0 && !ctx.from.is_bot){
               const screen = await botA.getScreen('screen_0')
               await botA.message(ctx, screen, ctx.message.chat.id)
               SocketApt.socket.emit('test', 'tect ok') 
            }
        })
    }
    catch(error){
        console.log(error)
    }
}
