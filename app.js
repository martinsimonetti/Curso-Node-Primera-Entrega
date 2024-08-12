const ProductManager = require("./productManager.js")
const productManager = new ProductManager("./app")

const express = require("express")
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(PORT, ()=>{
    console.log(`Probando servidor en el puerto ${PORT}`)
})

/* let productos = [
    {id: 1, title: "Producto 1", description: "Descripción 1", code: "101", price: 1000, status: true, stock: 100, category: "Categoría 1", thumbnails: ["/imagen1.jpg", "/imagen2.jpg"]},
    {id: 2, title: "Producto 2", description: "Descripción 2", code: "102", price: 2000, status: true, stock: 200, category: "Categoría 2", thumbnails: ["/imagen3.jpg", "/imagen4.jpg"]},
    {id: 3, title: "Producto 3", description: "Descripción 3", code: "103", price: 3000, status: true, stock: 300, category: "Categoría 3", thumbnails: ["/imagen5.jpg", "/imagen6.jpg"]}
] */

let carritos = [
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
    }]

app.get("/products", async (req, res) => {
    //res.send(productos)
    productManager.products = await productManager.getProducts()    
    res.json(productManager.products)
})

app.get("/products/:pid", async (req, res) => {
    const productoId = parseInt(req.params.pid)
    //const producto = productos.find((p) => p.id === productoId)

    const producto = await productManager.getProductById(productoId)

    if (producto) {
        res.json(producto)
    } else {
        res.status(404).json({message: "Producto no encontrado."})
    }
})

app.post("/products", (req, res) => {
    const nuevoProducto = {
        id: productManager.products.length + 1,
        ...req.body
    };
    
    //productos.push(nuevoProducto)
    productManager.addProduct(nuevoProducto)
    res.status(201).json(nuevoProducto)
})

app.put("/products/:pid", async (req, res) => {
    const productoId = parseInt(req.params.pid)

    await productManager.editProduct(productoId, req.body)
    res.status(200).json(productManager.products)
    /* const producto = productos.find((p) => p.id === productoId)

    if (producto) {
        Object.assign(producto, req.body)
        res.status(200).json(producto)        
    } else {
        res.status(404).json({message: "Producto no encontrado para su modificación."})
    } */
})

app.delete("/products/:pid", async (req, res) => {
    const productoId = parseInt(req.params.pid)
    
    await productManager.deleteProduct(productoId)
    res.json(productManager.products)

    /* const producto = productos.find((p) => p.id === productoId)

    if (producto) {
        productos = productos.filter((p) => p.id !== productoId)
        res.json(productos)
    } else {
        res.status(404).json({message: "Producto no encontrado para su eliminación."})
    } */
})

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