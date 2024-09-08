import { Markup } from "telegraf"
import { Screen } from "../models/screen.js"
import { SocketApt } from "../socket/api/socket-api.js"

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
        

        if(screen.media.length){
            await this.bot.telegram.sendMediaGroup(userId, screen.media, {protect_content: screen.protect}).catch(error => console.log(error))
        }
        if(screen.document.length){
            await this.bot.telegram.sendMediaGroup(userId, screen.document, {protect_content: screen.protect}).catch(error => console.log(error))
        }
        if(screen.audio.length){
            await this.bot.telegram.sendMediaGroup(userId, screen.audio, {protect_content: screen.protect}).catch(error => console.log(error))
        }
        if(screen.text.length){
            await this.bot.telegram.sendMessage(userId, screen.text, {...keyboard(), protect_content: screen.protect}).catch(error => console.log(error))
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

    async createScreen(data){
        SocketApt.socket.emit('newScreen', {botId: this._id, screenName: this.mode,  data: data})
    }

}
