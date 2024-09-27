
export const botStart = async (botModule) => {
    try{
        botModule.bot.start(async (ctx) => {
            if(ctx.message.chat.id > 0 && !ctx.from.is_bot){
               const screen = await botModule.getZeroScreen()
               await botModule.setZeroScreen(ctx.message.chat.id)
               await botModule.message(screen, ctx.message.chat.id)
            }
        })
    }
    catch(error){
        console.log(error)
    }
}


