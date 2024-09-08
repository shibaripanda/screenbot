
export const botCallback = async (botModule) => {
    try{
        botModule.bot.on('callback_query', async (ctx) => {
            console.log(ctx.update.update_id)
            console.log(ctx.update.callback_query.data)

            const screen = await botModule.getScreen(ctx.update.callback_query.data) 
            if(screen) await botModule.message(screen, ctx.update.callback_query.from.id)
            else await botModule.errorMessage(ctx.update.callback_query.from.id)
            ctx.answerCbQuery()

        })
    }
    catch(error){
        console.log(error)
    }
}
