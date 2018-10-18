import './config/config'
import { sequelize } from './db/sequelize'
import { fillDB } from './db/seed'
import http from 'http';

const port = process.env.PORT

import router from './router'
import express from './services/express.service'

const app = express(router)
const server = http.createServer(app)

sequelize.sync({ force: true })
    .then(() => {
        fillDB().then(() => {
            console.log(`Database & tables created!`)
        })
    })

server.listen(port, () => {
    console.log(`Started up at port ${port}`);
})

module.exports = { app }