const fs = require('fs'); //para interacturar con el sistema de archivos

class ProductManager {
  constructor(file) {
    this.products = [];
    this.idProduct = 0;
    this.path = `${process.cwd()}/files/${file}`; // Se establece la ruta del archivo
  }

  getProducts() {
    return this.products;
  }

  async addProduct(product) {
    try {
      this.idProduct++;
      const { title, description, price, thumbnail, code, stock } = product;
      const newProduct = {
        id: this.idProduct,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      this.products.push(newProduct);           // agrega el nuevo producto al arreglo
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));

      return product;   //devuelve el producto arreglado
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    const product = this.products.find((product) => product.id === id); //busca un producto 

    try {
      if (fs.existsSync(this.path)) { //verifica si el archivo existe 
        const data = await fs.promises.readFile(this.path, 'utf-8');  //lee los datos de los archivos
        const product = JSON.parse(data);   //transforma los datos para leerlo con js
        return product;
      }
      return [];//si no existe devuelve arreglo vacio
    } catch (error) {
      console.log(error);
    }
  }


  async updateProduct(id, updatedData) {  //modificar producto y actualizar 
    try {
      const product = this.products.find((product) => product.id === id); // busca un producto
      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado`); //si no existe el producto sale este error
      }

      const updatedProduct = { id, ...updatedData }; //crea un nuevo objeto actualizado con el id anterior
      const index = this.products.findIndex((product) => product.id === id);//encuentra el indice del producto a actualizar
      this.products[index] = updatedProduct;

      await fs.promises.writeFile(this.path, JSON.stringify(this.products));//guarda los productos actualizados en archivo

      return updatedProduct;//retorna el producto actualizado
    } catch (error) { 
      console.log(error);
    }
  }

  async deleteProduct(id) {     //eliminar productos 
    try {
      const index = this.products.findIndex((product) => product.id === id); //busca un producto en archivo
      if (index === -1) { 
        throw new Error(`Producto con ID ${id} no encontrado`); 
      }

      this.products.splice(index, 1); //se elimina el producto
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));//guarda en archivo

      return id;
    } catch (error) {
      console.log(error);
    }
  }

}


module.exports = ProductManager; //permite exportar
