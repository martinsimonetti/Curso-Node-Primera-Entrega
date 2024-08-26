const express = require('express')
const path = require('path')

const productRouter = require('../api/products/products.router.js')
const cartRouter = require('../api/carts/carts.router.js')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//app.use(express.static(path.join(__dirname, "public")))

app.use("/", productRouter)
app.use("/", cartRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})