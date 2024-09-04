import io, { Socket } from 'socket.io-client'

export class SocketApt {
    static socket = null

    static createConnections() {
        this.socket = io(process.env.SERVER_AUTH_LINK, {auth: {token: {'Authorization': 'Bearer ' + 'hjhjhjhjhj'}}})

        this.socket.on('connect', () => {
            console.log('connect')
        })

        this.socket.on('disconnect', () => {
            console.log('disconnect')
        })

        this.socket.on('res', (data) => {
            console.log(data)
        })

        this.socket.on('exception', (data) => {
            console.log(data)
        })

    }

}