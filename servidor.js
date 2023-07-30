const express = require("express")
const port= 3000
const app = express ()

app.listen(port,()=>{
  console.log("Servidor corriendo ")
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

