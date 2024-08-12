const fs = require('fs').promises

// Archivos que almacenarán en disco los productos y carritos
const archivoCarritos = "carts.json"
const archivoProductos = "products.json"

class ProductManager {
    constructor (path){
        this.products = []
        this.path = path
    }

    async addProduct(producto){
        const productoAlmacenado = this.products.find((p) => p.code === producto.code) 
        if (productoAlmacenado) {
            return "El producto ya existe."
        } else {
            if (!producto.title || !producto.description || !producto.code || !producto.price || !producto.status || !producto.stock || !producto.category || !producto.thumbnails) {
                return "Debe completar todos los campos del producto."                
            } else {
                try {
                    let nuevoProducto = {
                        id: this.products.length + 1,
                        ...producto
                    }
                    this.products.push(nuevoProducto) // Se agrega el producto a la lista de productos.
                    await fs.writeFile(archivoProductos, JSON.stringify(this.products, null, 2)) // Se crea el archivo "products.json" donde se guardan los productos.
                    console.log("Producto agregado exitosamente. ")
                } catch (error) {
                    console.error("No se pudo agregar el producto. ", error)
                }                
            }
        }
    }

    async getProducts() {
        try {
            const productos = await fs.readFile(archivoProductos, "utf8") // Lee el archivo "products.json" donde se guardan los productos.
            console.log("Archivo leído con éxito.")
            return JSON.parse(productos)
        } catch (error) {
            console.error("No se pudo leer la lista de productos. ", error)
            return []
        }
    }

    async getProductById(productId){
        this.products = await this.getProducts() // Se obtiene la lista de productos desde el archivo "products.json".
        const producto = this.products.find((p) => p.id === productId) // Busca el producto en la lista

        if (producto) {
            console.log("Producto encontrado. ")
            return producto
        } else {
            console.error("No se pudo encontrar el producto. ")
        }
    }

    async editProduct(productId, prod){
        const producto = await this.getProductById(productId) // Obtiene el producto por id.
        
        try {
            if (producto) {
                Object.assign(producto, prod)
                await fs.writeFile(archivoProductos, JSON.stringify(this.products, null, 2))  // Sobreescribe el archivo "products.json" donde se guardan los productos.
                console.log("Producto modificado exitosamente. ")
            } else {
                console.log("Not found. ")
            }
        } catch (error) {
            console.error("No se pudo modificar el producto. ", error)
        }        
    }

    async deleteProduct(productId){
        this.products = await this.getProducts() // Se obtiene la lista de productos desde el archivo "products.json".
        const producto = this.products.find((p) => p.id === productId)

        try {
            if (producto) {
                this.products = this.products.filter((p) => p.id !== producto.id) // Se saca el producto de la lista.
                await fs.writeFile(archivoProductos, JSON.stringify(this.products, null, 2))  // Sobreescribe el archivo "products.json" donde se guardan los productos.
                console.log("Producto eliminado exitosamente. ")
            } else {
                console.log("Not found. ")
            }    
        } catch (error) {
            console.error("No se pudo eliminar el producto. ", error)
        }
    }
}

module.exports = ProductManager