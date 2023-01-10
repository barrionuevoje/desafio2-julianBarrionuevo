const fs =  require("fs");


class ProductManager{

    constructor(){
        this.path = "./products.json";
    }
    addProduct = async (title, description, price, image, stock) => {
        const products = await this.getProducts();
        const product = {
            title: title,
            description: description,
            price: price,
            image: image,
            stock: stock,
        };
        let lastId = products.length !== 0 ? products[products.length - 1].id : 0;
        product.id = ++lastId

        product.title && product.description && product.price && product.image && product.stock
        ? products.push(product) 
        : console.log("Tienes que incluir toda la información")

        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return product;
    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            console.log(products)
            return products;
        }
        else {
            return []
        }
    }

    

    getProductById = async (id) => {
        let products = await this.getProducts();
        let product = products.find((item) => item.id == id)
        product 
        ? console.log(`Tu producto es ${product.title}`) 
        : console.log("Ninguno de tus productos coincide con el ID")
    }
    deleteProduct = async (id) => {
        const products = await this.getProducts();
        let productoBorrado = products.filter((prod) => prod.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(productoBorrado));
    }
    updateProduct = async (id, propiedad, value) => {
        let products = await this.getProducts();
        let product = products.find((item) => item.id === id);
        product[propiedad] = value;

        let index = products.indexOf(product);
        products[index] = product;
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }

   
}

const manejadorDeProductos = new ProductManager();
// console.log(manejadorDeProductos.addProduct('juego', 'juego', 30, 'abc', 15))
// console.log(manejadorDeProductos.addProduct('parlantes', 'parlantes', 30, 'abc',  12 ))
// console.log(manejadorDeProductos.addProduct('pantallas', 'pantallas', 50, 'abc', 11 ))
// console.log(manejadorDeProductos.addProduct('pantallas', 'pantallas', 50, 'abc', 10 ))

const nuevaArray = async () => {

    // Se aplica método para agregar 
    await manejadorDeProductos.addProduct("mouse", "mouse",1000,"sin imagen",1);


    // Se aplica método para borrar 
    await manejadorDeProductos.deleteProduct(1);

    // // Se aplica el método updateProduct
    await manejadorDeProductos.updateProduct(2, "price", 500)
};

nuevaArray();