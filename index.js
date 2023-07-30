const express = require("express")
const port= 3000
const app = express ()

app.listen(port,()=>{
  console.log("Servidor corriendo puerto 3000 ")
})


app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);

    const product = await ProductManager.getProduct(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
})




const ProductManager = require('./file/ProductManager');

const productManager = new ProductManager('Usuarios.json');

const product = {
  title: "Producto 1",
  description: "Descripción 1",
  price: 20,
  thumbnail: "thumbnail1.jpg",
  code: "27328",
  stock:200
};

const product2 = {
  title: "Producto 2",
  description: "Descripción 2",
  price:30,
  thumbnail: "thumbnail1.jpg",
  code: "60010",
  stock: 300
};

const product3 = {
  title: "Producto 3",
  description: "Descripción 3",
  price: 45,
  thumbnail: "thumbnail1.jpg",
  code: "60008",
  stock: 110
};
async function addProducts() {
  try {
    await productManager.addProduct(product);
    console.log("Producto 1 agregado");

    await productManager.addProduct(product2);
    console.log("Producto 2 agregado");

    const response = await productManager.addProduct(product3);
    console.log("Producto 3 agregado:", response);

  
    const productIdToDelete = 2;
    return productManager.deleteProduct(productIdToDelete);
  } catch (err) {
    console.log("Error:", err);
  }
}

addProducts()

  .then(deletedProductId => {
    console.log("Producto eliminado con ID:", deletedProductId);
    return productManager.getProducts();
  })
  
  .catch(err => {
    console.log("Error:", err);
  })

  
  .then(() => {
    const productIdToUpdate = 1;
    const updates = {
      title: "Producto 1",
      description: "Descripción 1",
      thumbnail: "thumbnail1.jpg",
      code: "27328",
      price: 15,
      stock: 60
    };
    return productManager.updateProduct(productIdToUpdate, updates);
  })
  .then(updatedProduct => {
    console.log("Producto actualizado:", updatedProduct);
    return productManager.getProducts();
  })
  .then(products => {
    console.log("Lista de productos actualizada:", products);
  })
  .catch(err => {
    console.log("Error:", err);
  });