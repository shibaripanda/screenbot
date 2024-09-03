
export const botStart = async (bot, botA) => {
    try{
        bot.start(async (ctx) => {
            // if(ctx.message.chat.id > 0 && !ctx.from.is_bot){
            //    const screen = await botA.getScreen('screen_1')
            //    await botA.message(ctx, screen, ctx.message.chat.id) 
            // }
            ctx.reply('Бот подключен')
            console.log('sdsdsd')
        })
    }
    catch(error){
        console.log(error)
    }
}
