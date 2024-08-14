import { Screen } from "../models/screen.js"

export class BotClass {

    constructor(botId) {
        this.botId = botId
    }

    async message(ctx, screen, userId){
        if(screen.text !== '' && !screen.buttons.length && !screen.media.length){
            await ctx.telegram.sendMessage(userId, screen.text, {parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
        }
        else if(screen.text !== '' && screen.buttons.length && screen.media.length){
            if(screen.media.length === 1){
                await ctx.telegram.sendPhoto(userId, screen.media[0].media, {caption: screen.text, reply_markup: {inline_keyboard: screen.buttons}, parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
            }
            else{
                await ctx.telegram.sendMediaGroup(userId, screen.media, {protect_content: screen.protect}).catch(error => console.log(error)) 
                await ctx.telegram.sendMessage(userId, screen.text, {reply_markup: {inline_keyboard: screen.buttons}, parse_mode: 'HTML', protect_content: screen.protect}).catch(error => console.log(error))
            }
        }
        else if(screen.text !== '' && !screen.buttons.length && screen.media.length){
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