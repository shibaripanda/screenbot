
export const botCallback = async (bot, botA) => {
    try{
        bot.on('callback_query', async (ctx) => {
            console.log(ctx.update.update_id)

            const screen = await botA.getScreen(ctx.update.callback_query.data)
            if(screen.status) await botA.message(ctx, screen, ctx.update.callback_query.from.id)
            else await botA.errorMessage(ctx, screen, ctx.update.callback_query.from.id)
            ctx.answerCbQuery()

        })
    }
    catch(error){
        console.log(error)
    }
}
