import socketio from "socket.io"
import express from 'express';
import { createServer } from 'http';
import createGame from './public/game.js'

const app = express(); 
const server = createServer(app); 
const sockets = socketio(server);

app.use(express.static('public'))

const game = createGame()

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Cliend connected on Serve with id: ${playerId}`)

    game.addPlayer( {playerId: playerId} )
    console.log(game.state)

    socket.emit('setup', game.state)
})

server.listen(5000, () => {
    console.log(`> Server listening on port: 5000 ou IP: http://192.168.100.215:5000`)
})