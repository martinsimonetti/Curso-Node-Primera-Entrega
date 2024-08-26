const express = require('express')
const path = require('path')

const productRouter = require('../api/products/products.router.js')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//app.use(express.static(path.join(__dirname, "public")))

app.use("/", productRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


/*let carritos = [
    { id: 1,
    products: [
        { product: 1, quantity: 1},
        { product: 2, quantity: 3}
    ]},
    { id: 2,
    products: [
        { product: 2, quantity: 4},
        { product: 3, quantity: 1}
    ]
    }]*/

app.get("/carts/:cid", (req, res) => {
    const carritoId = parseInt(req.params.cid)
    const carrito = carritos.find((c) => c.id === carritoId)

    if (carrito) {
        res.json(carrito.products)
    } else {
        res.status(404).json({message: "Carrito no encontrado."})
    }
})

app.post("/carts", (req, res) => {
    const nuevoCarrito = {
        id: carritos.length + 1,
        products: []
    }

    carritos.push(nuevoCarrito)
    res.status(201).json(nuevoCarrito)
})

app.post("/carts/:cid/products/:pid", (req, res) => {
    const carritoId = parseInt(req.params.cid)
    const productoId = parseInt(req.params.pid)

    const carrito = carritos.find((c) => c.id === carritoId)

    if (carrito) {
        const producto = carrito.products.find((p) => p.product === productoId)

        if (producto) {
            producto.quantity += 1
        } else {
            carrito.products.push({
                product: productoId,
                quantity: 1
            })
        }

        res.status(201).json(carrito)
    } else {
        res.status(404).json({message: "Carrito no encontrado."})
    }
})