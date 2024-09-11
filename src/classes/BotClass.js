import { Markup } from "telegraf"
import { Screen } from "../models/screen.js"
import { SocketApt } from "../socket/api/socket-api.js"
import { AppClass } from "./AppClass.js"


export class BotClass {

    constructor(bot, data) {
        this.bot = bot
        this.owner = data.owner
        this.name = data.name
        this.username = data.username
        this._id = data._id
        this.status = data.status
        this.mode = data.mode
    }

    async updateBotData(){
        const app = new AppClass()
        this.mode = (await app.getBot(this._id)).mode
    }

 
    async message(screen, userId){

        const keyboard = () => {
            if(screen.buttons.length){
               const res = []
                for(const i of screen.buttons){
                    res.push(i.map(item => Markup.button[item.action](item.text, item.to)))
                }
                return Markup.inlineKeyboard(res) 
            }
        }

        const emptyText = () => {
            if(screen.text == '') return '------------------------------'
            return screen.text
        }

        if(!screen.media.length && !screen.document.length && !screen.audio.length && screen.text == ''){
            await this.bot.telegram.sendMessage(userId, `Empty "${this.mode}" screen.\nAdd content: videos, photos, voice, audio, files or text`, {protect_content: screen.protect}).catch(error => console.log(error))
        }
        else{
            if(screen.media.length && !screen.document.length && !screen.audio.length){
                if(screen.media.length == 1 && screen.media[0].type == 'photo'){
                    await this.bot.telegram.sendPhoto(userId, screen.media[0].media, {...keyboard(), caption: screen.text, protect_content: screen.protect}).catch(error => console.log(error))  
                }
                else if(screen.media.length == 1 && screen.media[0].type == 'video'){
                    await this.bot.telegram.sendVideo(userId, screen.media[0].media, {...keyboard(), caption: screen.text, protect_content: screen.protect}).catch(error => console.log(error))  
                }
                else{
                   if(!screen.buttons.length){
                        screen.media[0].caption = screen.text
                        await this.bot.telegram.sendMediaGroup(userId, screen.media, {protect_content: screen.protect}).catch(error => console.log(error))  
                    }
                    else{
                        await this.bot.telegram.sendMediaGroup(userId, screen.media, {protect_content: screen.protect}).catch(error => console.log(error))
                        await this.bot.telegram.sendMessage(userId, emptyText(), {...keyboard(), protect_content: screen.protect}).catch(error => console.log(error)) 
                    } 
                }
            }
            else if(!screen.media.length && screen.document.length && !screen.audio.length){
                if(screen.document.length == 1){
                    await this.bot.telegram.sendDocument(userId, screen.document[0].media, {...keyboard(), caption: screen.text, protect_content: screen.protect}).catch(error => console.log(error)) 
                }
                else{
                    if(!screen.buttons.length){
                        screen.document[screen.document.length - 1].caption = screen.text
                        await this.bot.telegram.sendMediaGroup(userId, screen.document, {protect_content: screen.protect}).catch(error => console.log(error))
                    }
                    else{
                        await this.bot.telegram.sendMediaGroup(userId, screen.document, {protect_content: screen.protect}).catch(error => console.log(error))
                        await this.bot.telegram.sendMessage(userId, emptyText(), {...keyboard(), protect_content: screen.protect}).catch(error => console.log(error))
                    } 
                } 
            }
            else if(!screen.media.length && !screen.document.length && screen.audio.length){
                for(let mes of screen.audio){
                    if(screen.audio.indexOf(mes) == screen.audio.length - 1){
                        await this.bot.telegram.sendAudio(userId, mes.media, {...keyboard(), caption: screen.text, protect_content: screen.protect}).catch(error => console.log(error)) 
                    }
                    else{
                        await this.bot.telegram.sendAudio(userId, mes.media, {protect_content: screen.protect}).catch(error => console.log(error)) 
                    }
                } 
            }
            else{
                if(screen.document.length){
                    await this.bot.telegram.sendMediaGroup(userId, screen.document, {protect_content: screen.protect}).catch(error => console.log(error))
                }
                if(screen.audio.length){
                    for(let mes of screen.audio){
                        await this.bot.telegram.sendAudio(userId, mes.media, {protect_content: screen.protect}).catch(error => console.log(error))
                    }
                }
                if(screen.media.length){
                    if(screen.media.length == 1 && screen.media[0].type == 'photo'){
                        await this.bot.telegram.sendPhoto(userId, screen.media[0].media, {...keyboard(), caption: screen.text, protect_content: screen.protect}).catch(error => console.log(error))  
                    }
                    else if(screen.media.length == 1 && screen.media[0].type == 'video'){
                        await this.bot.telegram.sendVideo(userId, screen.media[0].media, {...keyboard(), caption: screen.text, protect_content: screen.protect}).catch(error => console.log(error))  
                    }
                    else{
                       if(!screen.buttons.length){
                            screen.media[0].caption = screen.text
                            await this.bot.telegram.sendMediaGroup(userId, screen.media, {protect_content: screen.protect}).catch(error => console.log(error))  
                        }
                        else{
                            await this.bot.telegram.sendMediaGroup(userId, screen.media, {protect_content: screen.protect}).catch(error => console.log(error))
                            await this.bot.telegram.sendMessage(userId, emptyText(), {...keyboard(), protect_content: screen.protect}).catch(error => console.log(error)) 
                        } 
                    }
                }
                else{
                    if(screen.buttons.length || screen.text){
                        await this.bot.telegram.sendMessage(userId, emptyText(), {...keyboard(), protect_content: screen.protect}).catch(error => console.log(error))
                    }
                }
            }
        }
    }

    async errorMessage(userId){
        await this.bot.telegram.sendMessage(userId, 'error', {parse_mode: 'HTML', protect_content: false}).catch(error => console.log(error))
    }

    async getZeroScreen(){
        const res = await Screen.findOne({owner: this._id, index: 'screen_0'})
        return res
    }

    async getScreen(screenId){
        const res = await Screen.findOne({owner: this._id, _id: screenId})
        return res
    }

    async createScreen(field, data){
        if(field === 'TEXT' || field === 'CAPTION'){
            await Screen.updateOne({owner: this._id, name: this.mode}, {text: data})
        }
        else if(field === 'PHOTO'){
            await Screen.updateOne({owner: this._id, name: this.mode}, {$addToSet: {media: {type: 'photo', media: data}}})
        }
        else if(field === 'VIDEO'){
            await Screen.updateOne({owner: this._id, name: this.mode}, {$addToSet: {media: {type: 'video', media: data}}})
        }
        else if(field === 'VOICE'){
            await Screen.updateOne({owner: this._id, name: this.mode}, {$addToSet: {audio: {type: 'audio', media: data}}})
        }
        else if(field === 'DOCUMENT'){
            await Screen.updateOne({owner: this._id, name: this.mode}, {$addToSet: {document: {type: 'document', media: data}}})
        }
    }

    async addInfoForScreen(ctx){
        if(typeof ctx.message['text'] !== 'undefined'){
            console.log('TEXT')
            await this.createScreen('TEXT', ctx.message.text)
        }
        if(typeof ctx.message['caption'] !== 'undefined'){
            console.log('CAPTION')
            await this.createScreen('CAPTION', ctx.message.caption)
        }
        if(typeof ctx.message['photo'] !== 'undefined'){
            console.log('PHOTO')
            await this.createScreen('PHOTO', ctx.message.photo[0].file_id)
        }
        if(typeof ctx.message['video'] !== 'undefined'){
            console.log('VIDEO')
            await this.createScreen('VIDEO', ctx.message.video.file_id)
        }
        if(typeof ctx.message['audio'] !== 'undefined'){
            console.log('AUDIO')
            await this.createScreen('VOICE', ctx.message.audio.file_id)
        }
        if(typeof ctx.message['voice'] !== 'undefined'){
            console.log('VOICE')
            await this.createScreen('VOICE', ctx.message.voice.file_id)
        }
        if(typeof ctx.message['document'] !== 'undefined'){
            console.log('DOCUMENT')
            await this.createScreen('DOCUMENT', ctx.message.document.file_id)
        }
    }
}
