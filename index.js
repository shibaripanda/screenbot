import 'dotenv/config'
import { db } from './src/db/db.js'
import { AppClass } from './src/classes/AppClass.js'
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
        SocketApt.socket.on('getBot', (data) => {
            console.log(data)
          })
        SocketApt.socket.on('offBot', async (data) => {
            await app.stopBot(bots, data)
        })
        SocketApt.socket.on('sendMeScreen', async (data) => {
            const botModule = bots.find(item => item._id == data.botId)
            await botModule.updateBotData()
            const screen = await botModule.getScreen(data.screenId)
            await botModule.message(screen, data.userId)
            console.log('sendMeScreen')
        })

        if(status){
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