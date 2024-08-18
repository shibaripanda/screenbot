import { type } from "os"
import { readTextFile } from "../helper/readTextFile.js"
import { screensStart } from "../helper/screenCreater.js"
import { Bot } from "../models/bot.js"
import { Screen } from "../models/screen.js"
import fs from 'fs'

export class AppClass {

    constructor(){}

    async getAllActiveBots() {
        return await Bot.find({status: true})
    }
    
    async createTestBot(count) {
        const res = await Bot.create({token: process.env.BOT_TOKEN, status: true})
        await Screen.create({owner: res._id, name: 'start', text: 'Проверка текста'}) 
    }

    // async createScreen() {
    //     await Screen.create({
    //         owner: '66bbd8ff1552e60673dc1dc7', 
    //         name: 'test18', 
    //         text: 'Тест кнопок', 
    //         media: [{type: "photo", media: "AgACAgIAAxkBAAKJmGa88iLkfSKD33d47ddwZZ7JqIzTAALU3zEb8azoSfJyZY6nrc6rAQADAgADcwADNQQ"}],
    //         buttons: [
    //             [{ text: 'show dogs', callback_data: 'test10' }], 
    //             [{ text: 'show cats', callback_data: 'test11' }],
    //             [{ text: 'show cats', callback_data: 'test12' }],
    //             [{ text: 'show cats', callback_data: 'test13' }],
    //             [{ text: 'show cats', callback_data: 'test14' }],
    //             [{ text: 'show cats', callback_data: 'test15' }],
    //             [{ text: 'show cats', callback_data: 'test16' }],
    //         ],
    //         protect: true,
    //         status: true
    //     })
    // }

    async createScreens() {
        for(const i of screensStart){
            fs.readFile(`./src/text/${i.text}`, 'utf8', async (err, text) => {
                if (err) throw err
                    console.log(text) 
                    await Screen.updateOne({name: i.screen}, {
                        owner: '66bbd8ff1552e60673dc1dc7', 
                        // name: scr.screen, 
                        text: text, 
                        media: [],
                        buttons: i.buttons,
                        protect: true,
                        status: true
                    }, {upsert: true})
            })
        }
    }

    async addMediaToScreen(ctx){
        // console.log(ctx.message.caption)
        console.log(ctx.message.video_note.file_id)
        if(typeof ctx.message['photo'] !== 'undefined'){
            console.log('photo')
            const res = await Screen.updateOne({name: ctx.message.caption}, {$addToSet: {media: {type: 'photo', media: ctx.message.photo[0].file_id}}}) 
        }
        else if(typeof ctx.message['video'] !== 'undefined'){
            console.log('video')
            const res = await Screen.updateOne({name: ctx.message.caption}, {$addToSet: {media: {type: 'video', media: ctx.message.video.file_id}}}) 
        }
        else if(typeof ctx.message['document'] !== 'undefined'){
            console.log('document')
            const res = await Screen.updateOne({name: ctx.message.caption}, {$addToSet: {media: {type: 'document', media: ctx.message.document.file_id}}}) 
        }
        else if(typeof ctx.message['audio'] !== 'undefined'){
            console.log('audio')
            const res = await Screen.updateOne({name: ctx.message.caption}, {$addToSet: {media: {type: 'audio', media: ctx.message.audio.file_id}}}) 
        }
        else if(typeof ctx.message['voice'] !== 'undefined'){
            console.log('voice')
            const res = await Screen.updateOne({name: ctx.message.caption}, {$addToSet: {media: {type: 'audio', media: ctx.message.voice.file_id}}}) 
        }
        else if(typeof ctx.message['video_note'] !== 'undefined'){
            console.log('voice')
            const res = await Screen.updateOne({name: ctx.message.caption}, {$addToSet: {media: {type: 'video', media: ctx.message.video_note.file_id}}}) 
        }
        // console.log(res)
        
    }

    async deleteAllBots() {
        await Bot.deleteMany({})
    }

}