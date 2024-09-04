import 'dotenv/config'
import { Telegraf } from 'telegraf'
import { db } from './src/db/db.js'
import { AppClass } from './src/classes/AppClass.js'
import { botStart } from './src/triggers/botStart.js'
import { BotClass } from './src/classes/BotClass.js'
import { botMessage } from './src/triggers/botMessage.js'
import { botCallback } from './src/triggers/botCallback.js'
import { botChatMember } from './src/triggers/botChatMember.js'
import { botCommands } from './src/triggers/botCommands.js'
import { readTextFile } from './src/helper/readTextFile.js'
import { useConnectSocket } from './src/socket/hooks/useConnectSocket.js'
import { SocketApt } from './src/socket/api/socket-api.js'
import { startBots } from './src/modules/startBots.js'


async function startBot(){
    try{
        const status = await db()
        const bots = []
        const app = new AppClass()
        useConnectSocket()
        SocketApt.socket.on('onBot', async (data) => {
            await app.startBot(bots, data)
        })
        SocketApt.socket.on('offBot', async (data) => {
            await app.stopBot(bots, data)
        })
        SocketApt.socket.emit('helloFromServer', process.env.SERVER_TOKEN)
        if(status){
            const app = new AppClass()
            // readTextFile('./src/text/1. Приветствие.txt')
            const appContext = await app.getAllActiveBots()
            
            if(appContext.length){
                for(const i of appContext){
                    await startBots(i, bots)
                }
            }
            else{
                console.log('Хер там... Активных ботов нет...')
            } 
        }
        else{
            console.log('Хер там... База не подключается...')
        }
    }
    catch(error){
        console.log('Ошибка запуска бота...')
        console.log(error)
    }
}

startBot()