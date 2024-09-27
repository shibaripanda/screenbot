import { Screen } from "../models/screen.js"
import { User } from "../models/user.js"
import { SocketApt } from "../socket/api/socket-api.js"
import { AppClass } from "./AppClass.js"


export class UserClass {

    constructor(user, botId) {
        this.id =  user.id,
        this.first_name = user.first_name,
        this.username = user.username,
        this.language = user.language
        this.botId = botId
        this.activBot = user.activBot[botId]
        this.data = user.data[botId]
        this.screen = user.screen[botId]
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

    // async updateUserData(){
    //     const app = new AppClass()
    //     const res = await app.getUser(this.id)
    //     this.activBot = res.activBot[this.botId]
    //     this.data = res.data[this.botId]
    //     this.screen = res.screen[this.botId]
    //     if(!this.activBot){
    //         await this.updateStatusInBot('member')
    //         await this.updateUserData()
    //     }
    // }

    async updateStatusInBot(status){
        const link = `activBot.${botId}`
        if(status === 'kicked') await User.updateOne({id: this.id}, {[link]: false})
        else if (status === 'member') await User.updateOne({id: this.id}, {[link]: true})
    } 
    
}