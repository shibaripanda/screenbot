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
            if(!screen.buttons.length){
                screen.document[screen.document.length - 1].caption = screen.text
                await this.bot.telegram.sendMediaGroup(userId, screen.document, {protect_content: screen.protect}).catch(error => console.log(error))
            }
            else{
                await this.bot.telegram.sendMediaGroup(userId, screen.document, {protect_content: screen.protect}).catch(error => console.log(error))
                await this.bot.telegram.sendMessage(userId, emptyText(), {...keyboard(), protect_content: screen.protect}).catch(error => console.log(error))
            }   
        }
        else{
            if(screen.media.length){
                await this.bot.telegram.sendMediaGroup(userId, screen.media, {protect_content: screen.protect}).catch(error => console.log(error))
            }
            if(screen.document.length){
                await this.bot.telegram.sendMediaGroup(userId, screen.document, {protect_content: screen.protect}).catch(error => console.log(error))
            }
            if(screen.audio.length){
                await this.bot.telegram.sendMediaGroup(userId, screen.audio, {protect_content: screen.protect}).catch(error => console.log(error))
            }
            if(screen.text){
                await this.bot.telegram.sendMessage(userId, screen.text, {...keyboard(), protect_content: screen.protect}).catch(error => console.log(error))
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
        console.log(data)
        const screen = await Screen.findOne({owner: this._id, name: this.mode})
        await this.message(screen, this.owner)
        await this.bot.telegram.sendMessage(this.owner, 'Done! Close window on your pc or send new variant').catch(error => console.log(error))
    }

}
