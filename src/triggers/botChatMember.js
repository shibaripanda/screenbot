import { UserClass } from "../classes/UserClass.js"

export const botChatMember = async (bot, botA) => {
    try{
        bot.on('my_chat_member', async (ctx) => {
            if(!ctx.from.is_bot){
               const user = new UserClass(ctx.from)
               await user.updateStatusInBot(ctx.update.my_chat_member.new_chat_member.status) 
            }
        })
    }
    catch(error){
        console.log(error)
    }
}
