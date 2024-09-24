import { Screen } from "../models/screen.js"
import { User } from "../models/user.js"
import { SocketApt } from "../socket/api/socket-api.js"
import { AppClass } from "./AppClass.js"

export class UserClass {

    constructor(user, botId) {
        this.id =  user.id,
        this.is_bot = user.is_bot,
        this.first_name = user.first_name,
        this.username = user.username,
        this.language_code = user.language_code
        this.botId = botId
        this.activBot = true
        this.data = {}
        this.screen = ''
    }

    async updateToClient(){
        SocketApt.socket.emit('updateUserToClient', {botId: this.botId, token: process.env.SERVER_TOKEN})
    }

    async updateScreen(screenId){
        this.screen = screenId
        const screen = `screen.${this.botId}`
        await User.updateOne({id: this.id}, {[screen]: screenId}, {upsert: true})
    }

    async updateData(info){
        this.data[await this.getCurrentVariable()] = info
        const data = `data.${this.botId}`
        await User.updateOne({id: this.id}, {[data]: this.data})
    }

    async getCurrentVariable(){
        if(this.screen === 'Start screen'){
           const variable = await Screen.findOne({name: this.screen, owner: this.botId})
           return variable.variable 
        }
        const variable = await Screen.findOne({_id: this.screen, owner: this.botId})
        return variable.variable 
    }

    async getScreenForAns(){
        if(this.screen === 'Start screen'){
           const screen = await Screen.findOne({name: this.screen, owner: this.botId})
           return {screen: screen, status: screen.ansScreen}
        }
        const screen = await Screen.findOne({_id: this.screen, owner: this.botId})
        return {screen: screen, status: screen.ansScreen}
    }

    async updateUserData(){
        const app = new AppClass()
        const res = await app.getUser(this.id)
        this.activBot = res.activBot[this.botId]
        this.data = res.data[this.botId]
        this.screen = res.screen[this.botId]
        if(!this.activBot){
            await this.updateStatusInBot('member')
            await this.updateUserData()
        }
    }

    async updateStatusInBot(status){
        const user = await User.findOne({id: this.id})
        const link = `activBot.${this.botId}`
        const data = `data.${this.botId}`
        const screen = `screen.${this.botId}`
        if(!user){
            if(status === 'kicked') await User.updateOne({id: this.id}, {[link]: false, username: this.username ? this.username : 'not set'}, {upsert: true})
            else if (status === 'member') await User.updateOne({id: this.id}, {[link]: true, [data]: {}, [screen]: 'Start screen', username: this.username ? this.username : 'not set'}, {upsert: true})
        }
        else{
            if(!user.data[this.botId] || !user.screen[this.botId]){
                if(status === 'kicked') await User.updateOne({id: this.id}, {[link]: false, [screen]: 'Start screen', [data]: {}, username: this.username ? this.username : 'not set'}, {upsert: true})
                else if (status === 'member') await User.updateOne({id: this.id}, {[link]: true, [screen]: 'Start screen', [data]: {}, username: this.username ? this.username : 'not set'}, {upsert: true})
            }
            else{
               if(status === 'kicked') await User.updateOne({id: this.id}, {[link]: false, username: this.username ? this.username : 'not set'}, {upsert: true})
               else if (status === 'member') await User.updateOne({id: this.id}, {[link]: true, username: this.username ? this.username : 'not set'}, {upsert: true}) 
            }
        }     
    }
    
}