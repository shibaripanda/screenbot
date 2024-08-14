import { User } from "../models/user.js"

export class UserClass {

    constructor(user) {
        this.id =  user.id,
        this.is_bot = user.is_bot,
        this.first_name = user.first_name,
        this.username = user.username,
        this.language_code = user.language_code
    }

    async updateStatusInBot(status){
        if(status === 'kicked') await User.updateOne({id: this.id}, {activBot: false}, {upsert: true})
        else if (status === 'member') await User.updateOne({id: this.id}, {activBot: true}, {upsert: true})
    }
    
}