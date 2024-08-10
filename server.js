const express = require("express")
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(PORT, ()=>{
    console.log(`Probando servidor en el puerto ${PORT}`)
})

const productos = [
    {id: 1, title: "Producto 1", description: "Descripción 1", code: "101", price: 1000, status: true, stock: 100, category: "Categoría 1", thumbnails: ["/imagen1.jpg", "/imagen2.jpg"]},
    {id: 2, title: "Producto 2", description: "Descripción 2", code: "102", price: 2000, status: true, stock: 200, category: "Categoría 2", thumbnails: ["/imagen3.jpg", "/imagen4.jpg"]},
    {id: 3, title: "Producto 3", description: "Descripción 3", code: "103", price: 3000, status: true, stock: 300, category: "Categoría 3", thumbnails: ["/imagen5.jpg", "/imagen6.jpg"]}
]

const carrito = {
    id: 1,
    products: [
        {},
        {}
    ]
}

app.get("/", (req, res) => {
    res.send("Prueba del servidor")
})

app.get("/products", (req, res) => {
    res.send(productos)
})

app.get("/carts", (req, res) => {
    res.send(carrito)
})