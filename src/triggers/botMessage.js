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

                    if(await user.getCurrentVariable() && typeof ctx.message['text'] !== 'undefined'){
                        await user.updateData(ctx.message.text)
                    }
                    const ans = await user.getScreenForAns()
                    if(ans){
                        // console.log(user.data)
                        const screen = await botModule.getScreen(ans.status)
                        await botModule.message(screen, user.id, user.data)
                        await user.updateScreen(screen._id)
                    }
                    // console.log(user)
                    
                    // console.log('-user-', user)
                    // console.log('-screen-', user.screen)
                }

            }
        })
    }
    catch(error){
        console.log(error)
    }
}
