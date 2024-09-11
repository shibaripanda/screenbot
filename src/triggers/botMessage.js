
export const botMessage = async (botModule) => {
    try{
        botModule.bot.on('message', async (ctx) => {
            await botModule.updateBotData()
            if(ctx.message.chat.id > 0 && !ctx.from.is_bot){
                if(botModule.owner == ctx.message.chat.id && botModule.mode !== ''){

                    await botModule.addInfoForScreen(ctx)
                    
                }
                else{
                    console.log('no new screen')
                }

            }
        })
    }
    catch(error){
        console.log(error)
    }
}
