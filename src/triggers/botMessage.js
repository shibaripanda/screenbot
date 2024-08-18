import { AppClass } from "../classes/AppClass.js"

export const botMessage = async (bot, botA) => {
    try{
        bot.on('message', async (ctx) => {
            if(ctx.message.chat.id > 0 && !ctx.from.is_bot){
                const app = new AppClass()
                await app.addMediaToScreen(ctx)

                // const screen = await botA.getScreen(ctx.message.caption)
                // await botA.message(ctx, screen, ctx.message.chat.id)
                // console.log(ctx.message)
                // console.log(ctx.message)
                // console.log(ctx.update_id)

                // const screen = await botA.getScreen('test18')
                // if(screen.status) await botA.message(ctx, screen, ctx.message.chat.id) 
                // else await botA.errorMessage(ctx, screen, ctx.message.chat.id)
            }
        })
    }
    catch(error){
        console.log(error)
    }
}
