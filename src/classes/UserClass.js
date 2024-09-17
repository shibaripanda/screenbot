import { User } from "../models/user.js"
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

    async updateScreen(screenId){
        this.screen = screenId
        const screen = `screen.${this.botId}`
        await User.updateOne({id: this.id}, {[screen]: screenId}, {upsert: true})
    }

    async getCurrentVariable(){
        const variable = await Screen.findOne({_id: this.screen})
        return variable.variable
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
        const link = `activBot.${this.botId}`
        const data = `data.${this.botId}`
        const screen = `screen.${this.botId}`
        if(status === 'kicked') await User.updateOne({id: this.id}, {[link]: false}, {upsert: true})
        else if (status === 'member') await User.updateOne({id: this.id}, {[link]: true, [data]: {}, [screen]: 'Start screen'}, {upsert: true})
    }
    
}