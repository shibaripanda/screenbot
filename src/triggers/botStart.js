
export const botStart = async (bot, botA) => {
    try{
        bot.start(async (ctx) => {
            if(ctx.message.chat.id > 0 && !ctx.from.is_bot){
               const screen = await botA.getScreen('start')
               await botA.message(ctx, screen, ctx.message.chat.id) 
            }
        })
    }
    catch(error){
        console.log(error)
    }
}
