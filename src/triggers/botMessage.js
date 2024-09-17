import { UserClass } from "../classes/UserClass.js"

export const botMessage = async (botModule) => {
    try{
        botModule.bot.on('message', async (ctx) => {
            await botModule.updateBotData()
            if(ctx.message.chat.id > 0 && !ctx.from.is_bot){
                if(botModule.owner == ctx.message.chat.id && botModule.mode !== ''){
                    await botModule.addInfoForScreen(ctx)
                }
                else{
                    const user = new UserClass(ctx.from, botModule._id)
                    await user.updateUserData()

                    console.log(await user.getCurrentVariable())

                    console.log('-user-', user)
                    console.log('-screen-', user.screen)
                }

            }
        })
    }
    catch(error){
        console.log(error)
    }
}
