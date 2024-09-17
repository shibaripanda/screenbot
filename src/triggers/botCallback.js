import { UserClass } from "../classes/UserClass.js"

export const botCallback = async (botModule) => {
    try{
        botModule.bot.on('callback_query', async (ctx) => {
            // console.log(ctx.update.update_id)

            const screen = await botModule.getScreen(ctx.update.callback_query.data) 
            if(screen){
                await botModule.message(screen, ctx.update.callback_query.from.id)
                const user = new UserClass(ctx.from, botModule._id)
                await user.updateUserData()
                await user.updateScreen(ctx.update.callback_query.data)

            }
            else{
               await botModule.errorMessage(ctx.update.callback_query.from.id) 
            } 
            ctx.answerCbQuery()

        })
    }
    catch(error){
        console.log(error)
    }
}
