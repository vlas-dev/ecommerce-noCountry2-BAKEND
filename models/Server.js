const express = require('express')
const { dbConnection } = require('../config/config.js')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

class Server {
    constructor() {
        this.app = express()
        this.PORT = process.env.PORT || 5000
        this.host = process.env.HOST || '0.0.0.0'
        this.paths = {
            authRoutes: "/",
            productRoutes: "/product",
            orderRoutes: "/order",
            categoryRoutes: "/category",
            searchRoutes: '/search',
            paymentRoutes: '/payment',
        }

        // Middlewares
        this.middlewares()

        // Routes
        this.routes()

        // Database Connection
        this.conectarDB()

        // Sockets (if any)
    }

    middlewares() {
        this.app.use(express.static('public'))
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))

        // Dynamically set the CORS origin based on an environment variable
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'; // Default to localhost for local development
        this.app.use(cors({
            origin: frontendUrl,
            optionsSuccessStatus: 200
        }));
    }

    routes() {
        this.app.use(this.paths.authRoutes, require("../routes/authRoutes.js"))
        this.app.use(this.paths.productRoutes, require("../routes/productRoutes.js"))
        this.app.use(this.paths.categoryRoutes, require("../routes/categoryRoutes.js"))
        this.app.use(this.paths.searchRoutes, require("../routes/searchRoutes.js"))
        this.app.use(this.paths.paymentRoutes, require("../routes/paymentRoutes.js"))
        this.app.use(this.paths.orderRoutes, require("../routes/orderRoutes.js"))
    }

    listen() {
        this.app.listen(this.PORT, this.host, () => {
            console.log("Servidor corriendo en puerto", this.PORT)
        })
    }

    async conectarDB() {
        await dbConnection()
    }
}

module.exports = Server
