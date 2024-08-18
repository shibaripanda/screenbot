import { Screen } from "../models/screen.js"

export class BotClass {

    constructor(botId) {
        this.botId = botId
    }

    async message(ctx, screen, userId){
        if(screen.text !== '' && !screen.buttons.length && !screen.media.length){
            const len = Math.ceil(screen.text.length / 4096)
            if(len === 1){
                await ctx.telegram.sendMessage(userId, screen.text, {parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
            }
            else{
                let x = 0
                let y = 4096
                for(i = 0; i < len; i++){
                    await ctx.telegram.sendMessage(userId, screen.text.substring(x, y), {parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
                    x = x + 4096 + 1
                    if(i === len - 1) y = screen.text.length
                    else y = y + 4096 + 1
                }
            }
        }
        else if(screen.text !== '' && screen.buttons.length && screen.media.length){
            if(screen.media.length === 1){
                const len = Math.ceil(screen.text.length / 1024)
                if(len === 1){
                    await ctx.telegram.sendPhoto(userId, screen.media[0].media, {caption: screen.text, reply_markup: {inline_keyboard: screen.buttons}, parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
                }
                else{
                    // await ctx.telegram.sendPhoto(userId, screen.media[0].media, {caption: screen.text.substring(0, 1024), reply_markup: {inline_keyboard: screen.buttons}, parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
                    await ctx.telegram.sendPhoto(userId, screen.media[0].media, {parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
                    const len = Math.ceil(screen.text.length / 4096)
                    if(len === 1){
                        await ctx.telegram.sendMessage(userId, screen.text, {caption: screen.text.substring(0, 1024), reply_markup: {inline_keyboard: screen.buttons}, parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
                    }
                    else{
                        let x = 0
                        let y = 4096
                        for(i = 0; i < len; i++){
                            await ctx.telegram.sendMessage(userId, screen.text.substring(x, y), {parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
                            x = x + 4096 + 1
                            if(i === len - 1) {
                                y = screen.text.length
                                await ctx.telegram.sendMessage(userId, screen.text.substring(x, y), {reply_markup: {inline_keyboard: screen.buttons}, parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
                                break
                            }
                            else y = y + 4096 + 1
                        }
                    }
                }
            }
            else{
                await ctx.telegram.sendMediaGroup(userId, screen.media, {protect_content: screen.protect}).catch(error => console.log(error))
                const len = Math.ceil(screen.text.length / 4096)
                if(len === 1){
                    await ctx.telegram.sendMessage(userId, screen.text.substring(0, 1024), {reply_markup: {inline_keyboard: screen.buttons}, parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
                }
                else{
                    let x = 0
                    let y = 4096
                    for(i = 0; i < len; i++){
                        await ctx.telegram.sendMessage(userId, screen.text.substring(x, y), {parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
                        x = x + 4096 + 1
                        if(i === len - 1) {
                            y = screen.text.length
                            await ctx.telegram.sendMessage(userId, screen.text.substring(x, y), {reply_markup: {inline_keyboard: screen.buttons}, parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
                            break
                        }
                        else y = y + 4096 + 1
                    }
                } 
                // await ctx.telegram.sendMessage(userId, screen.text, {reply_markup: {inline_keyboard: screen.buttons}, parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
            }
        }
        else if(screen.text !== '' && !screen.buttons.length && screen.media.length){
            const len = Math.ceil(screen.text.length / 1024)
            if(len === 1){
                screen.media[0].caption = screen.text
                await ctx.telegram.sendMediaGroup(
                    userId, 
                    screen.media, 
                    {
                        parse_mode: 'HTML', 
                        protect_content: screen.protect,
                    }
                ).catch(error => console.log(error))
            }
            else{
                await ctx.telegram.sendMediaGroup(userId, screen.media, {parse_mode: 'HTML', protect_content: screen.protect,}).catch(error => console.log(error))
                const len = Math.ceil(screen.text.length / 4096)
                if(len === 1){
                    await ctx.telegram.sendMessage(userId, screen.text, {parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
                }
                else{
                    let x = 0
                    let y = 4096
                    for(i = 0; i < len; i++){
                        await ctx.telegram.sendMessage(userId, screen.text.substring(x, y), {parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
                        x = x + 4096 + 1
                        if(i === len - 1) {
                            y = screen.text.length
                        }
                        else y = y + 4096 + 1
                    }
                }
            }
        }
        else if(screen.text !== '' && screen.buttons.length && !screen.media.length){
            await ctx.telegram.sendMessage(
                userId, 
                screen.text, 
                {
                    parse_mode: 'HTML', 
                    protect_content: screen.protect, 
                    reply_markup: {
                        inline_keyboard: screen.buttons
                    }
                }
            ).catch(error => console.log(error))
        }
        else if(screen.text === '' && !screen.buttons.length && screen.media.length){
            await ctx.telegram.sendMediaGroup(
                userId, 
                screen.media, 
                {
                    parse_mode: 'HTML', 
                    protect_content: screen.protect,
                }
            ).catch(error => console.log(error))
        }
        else if(screen.text === '' && screen.buttons.length && screen.media.length){
            if(screen.media.length === 1){
                await ctx.telegram.sendPhoto(userId, screen.media[0].media, {reply_markup: {inline_keyboard: screen.buttons}, protect_content: screen.protect}).catch(error => console.log(error))
            }
            else{
                await ctx.telegram.sendMediaGroup(userId, screen.media, {protect_content: screen.protect}).catch(error => console.log(error))
                await ctx.telegram.sendMessage(userId, '-', {reply_markup: {inline_keyboard: screen.buttons}, parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
            }
        }
        else{
            console.log('Нихуя не совпало (')
        }
    }

    async errorMessage(ctx, screen, userId){
        await ctx.telegram.sendMessage(userId, 'Действие более недоступно', {parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
    }

    async getScreen(screenName){
        const res = await Screen.findOne({owner: this.botId, name: screenName})
        return res
    }

}