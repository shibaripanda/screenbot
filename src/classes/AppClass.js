import { Bot } from "../models/bot.js"
import { Screen } from "../models/screen.js"

export class AppClass {

    constructor(){}

    async getAllActiveBots() {
        return await Bot.find({status: true})
    }
    
    async createTestBot(count) {
        const res = await Bot.create({token: `5083463723:AAEsgaiRO6HGhIWrGcn-99-12Sk--J1Pn4I`, status: true})
        await Screen.create({owner: res._id, name: 'start', text: 'Проверка текста'}) 
    }

    async createScreen() {
        await Screen.create({
            owner: '66bbd8ff1552e60673dc1dc7', 
            name: 'test18', 
            text: 'Тест кнопок', 
            media: [{type: "photo", media: "AgACAgIAAxkBAAKJmGa88iLkfSKD33d47ddwZZ7JqIzTAALU3zEb8azoSfJyZY6nrc6rAQADAgADcwADNQQ"}],
            buttons: [
                [{ text: 'show dogs', callback_data: 'test10' }], 
                [{ text: 'show cats', callback_data: 'test11' }],
                [{ text: 'show cats', callback_data: 'test12' }],
                [{ text: 'show cats', callback_data: 'test13' }],
                [{ text: 'show cats', callback_data: 'test14' }],
                [{ text: 'show cats', callback_data: 'test15' }],
                [{ text: 'show cats', callback_data: 'test16' }],
            ],
            protect: true,
            status: true
        })
    }

    async deleteAllBots() {
        await Bot.deleteMany({})
    }

}