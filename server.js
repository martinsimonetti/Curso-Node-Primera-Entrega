const express = require("express")
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(PORT, ()=>{
    console.log(`Probando servidor en el puerto ${PORT}`)
})

app.get("/", (req, res) => {
    res.send("Prueba del servidor")
})