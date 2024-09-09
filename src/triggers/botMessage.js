
export const botMessage = async (botModule) => {
    try{
        botModule.bot.on('message', async (ctx) => {
            await botModule.updateBotData()
            if(ctx.message.chat.id > 0 && !ctx.from.is_bot){
                if(botModule.owner == ctx.message.chat.id && botModule.mode !== ''){

                    console.log(botModule.mode)

                    if(typeof ctx.message['text'] !== 'undefined'){
                        console.log('TEXT')
                        // screen.text = ctx.message.text
                        await botModule.createScreen('TEXT', ctx.message.text)
                        // console.log(ctx.message.text)
                    }
                    if(typeof ctx.message['caption'] !== 'undefined'){
                        console.log('CAPTION')
                        await botModule.createScreen('CAPTION', ctx.message.caption)
                        // screen.text = ctx.message.text
                        // await botModule.createScreen(ctx.message.text)
                        // console.log(ctx.message.text)
                    }
                    if(typeof ctx.message['photo'] !== 'undefined'){
                        console.log('PHOTO')
                        await botModule.createScreen('PHOTO', ctx.message.photo[0].file_id)
                        // screen.media.push({type: 'photo', media: ctx.message.photo[0].file_id})
                        // screen.text = ctx.message.text = ctx.message.caption
                        // console.log(ctx.message.photo[0].file_id)
                        // console.log(ctx.message.caption)
                        // console.log(ctx.message)
                    }
                    if(typeof ctx.message['video'] !== 'undefined'){
                        console.log('VIDEO')
                        await botModule.createScreen('VIDEO', ctx.message.video.file_id)
                        // screen.media.push({type: 'video', media: ctx.message.video.file_id})
                        // screen.text = ctx.message.text = ctx.message.caption
                        // console.log(ctx.message.video.file_id)
                        // console.log(ctx.message.caption)
                    }
                    if(typeof ctx.message['voice'] !== 'undefined'){
                        console.log('VOICE')
                        await botModule.createScreen('VOICE', ctx.message.voice.file_id)
                        // screen.media.push({type: 'voice', media: ctx.message.voice.file_id})
                        // screen.text = ctx.message.text = ctx.message.caption
                        // console.log(ctx.message.voice.file_id)
                        // console.log(ctx.message.caption)
                    }
                    if(typeof ctx.message['document'] !== 'undefined'){
                        console.log('DOCUMENT')
                        await botModule.createScreen('DOCUMENT', ctx.message.document.file_id)
                        // screen.media.push({type: 'document', fileId: ctx.message.document.file_id})
                        // screen.text = ctx.message.text = ctx.message.caption

                        // console.log(ctx.message.document.file_name)
                        // console.log(ctx.message.document.file_id)
                        // console.log(ctx.message.caption)
                    }
                    // await botModule.createScreen(screen)
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
