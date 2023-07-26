const express = require('express');
const ProductManager = require('./file/ProductManager');

const app = express();
const port = 3000;


app.listen(port, () => {
    console.log(`Server running http://slocalhost:${port}`);
  });
  


app.use(express.json());


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
});

app.listen(port, () => {
  console.log(`Server running http://slocalhost:${port}`);
});

