class ProductManager {
    constructor() {
      this.products = []; 
      this.productId = 0; 
    }
  
   
    addProduct(title, description, price, thumbnail, code, stock) {
      this.productId++ //incremeta un producto
      const product = {
        id: this.productId, // se le asigna clase a los productos
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(product);
      
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log('Todos los campos son obligatorios');
        return; //  verificar que todos los campos esten definidos 
      }
  
      
      const codeExists = this.products.some(product => product.code === code);
      if (codeExists) {
        console.log('Ya existe un producto con el mismo código');
        return;
      }
 
    }
  
    // como ver todos los productos
    getProducts() {
      return this.products;
    }
  
    // encontrar producto por su id
    getProductById(id) {
      const product = this.products.filter(product => product.id === id);
      if (product) {
        return product;
      } else {
        console.log('Producto no encontrado');
      }
    }
  }
  
// ejemplos 
  const productManager = new ProductManager();
  productManager.addProduct("Vaso", "vidrio", 12.00, "imagen1.jpg", "001", 50);
  productManager.addProduct("Tazas", "porcelana", 35.00, "imagen2.jpg", "002", 100);
  productManager.addProduct("ollas", "teflon", 80.00, "imagen2.jpg", "004", 30);
 

  
  const products = productManager.getProducts();
  console.log(products);
  
  const product = productManager.getProductById(2);
  console.log(product);

  