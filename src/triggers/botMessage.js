
export const botMessage = async (bot, botA) => {
    try{
        bot.on('message', async (ctx) => {
            if(ctx.message.chat.id > 0 && !ctx.from.is_bot){
                console.log(ctx.message.text)
                // console.log(ctx.message)
                // console.log(ctx.update_id)

                const screen = await botA.getScreen('test18')
                if(screen.status) await botA.message(ctx, screen, ctx.message.chat.id) 
                else await botA.errorMessage(ctx, screen, ctx.message.chat.id)
            }
        })
    }
    catch(error){
        console.log(error)
    }
}
