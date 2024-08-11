class ProductManager {
    constructor (path){
        this.products = []
        this.path = path
    }

    addProduct(producto){
        const productoAlmacenado = this.products.find((p) => p.code === producto.code) 
        if (productoAlmacenado) {
            return "El producto ya existe."
        } else {
            if (!producto.title || !producto.description || !producto.code || !producto.price || !producto.status || !producto.stock || !producto.category || !producto.thumbnails) {
                return "Debe completar todos los campos del producto."                
            } else {
                let nuevoProducto = {
                    id: this.products.length + 1,
                    ...producto
                }
                this.products.push(nuevoProducto)
                return "Producto agregado exitosamente."
            }
        }
    }

    getProducts(){
        return this.products
    }

    getProductById(productId){
        const producto = this.products.find((p) => p.id === productId)
        if (producto) {
            return producto
        } else {
            return "Not found"
        }
    }

    editProduct(productId, prod){
        const producto = this.products.find((p) => p.id === productId)
        if (producto) {
            Object.assign(producto, prod)
            return producto
        } else {
            return "Not found"
        }
    }

    deleteProduct(productId){
        const producto = this.products.find((p) => p.id === productId)

        if (producto) {
            this.products = this.products.filter((p) => p.id !== producto.id)
            return "Producto eliminado exitosamente."
        } else {
            return "Not found."
        }
    }
}
