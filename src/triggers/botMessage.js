
export const botMessage = async (botModule) => {
    try{
        botModule.bot.on('message', async (ctx) => {
            if(ctx.message.chat.id > 0 && !ctx.from.is_bot){
                // if(botModule.owner == ctx.message.chat.id && botModule.mode !== 'edit'){

                    console.log(botModule.mode)

                    if(typeof ctx.message['text'] !== 'undefined'){
                        await botModule.createScreen(ctx.message.text)
                        console.log(ctx.message.text)
                    }
                    else if(typeof ctx.message['photo'] !== 'undefined'){
                        console.log(ctx.message.photo[0].file_id)
                        console.log(ctx.message.caption)
                    }
                    else if(typeof ctx.message['video'] !== 'undefined'){
                        console.log(ctx.message.video.file_id)
                        console.log(ctx.message.caption)
                    }
                    else if(typeof ctx.message['voice'] !== 'undefined'){
                        // console.log(ctx.message.voice)
                        console.log(ctx.message.voice.file_id)
                        console.log(ctx.message.caption)
                    }
                    else if(typeof ctx.message['document'] !== 'undefined'){
                        console.log(ctx.message.document.file_name)
                        console.log(ctx.message.document.file_id)
                        console.log(ctx.message.caption)
                    }
                }

            // }
        })
    }
    catch(error){
        console.log(error)
    }
}
