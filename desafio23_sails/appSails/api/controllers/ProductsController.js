/**
 * ProductsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getProducts: async function (req, res) {
    try {
      const products = await Products.getProducts();
      return res.json(products);
    } catch (error) {
      sails.log("Error:", error);
    }
  },
  getProductsById: async function (req, res) {
    try {
      const id = req.params.id;
      let product = await Products.getProductById(id);
      if (product == null) {
        return res.status(500).json({ error: "Producto no encontrado" });
      } else {
        console.log("hola");
        return res.status(200).json(product);
      }
    } catch (error) {
      sails.log("Error:", error);
    }
  },
  createProduct: async function (req, res) {
    try {
      const { body } = req;
      let product = await Products.createProduct(body);

      if (product) {
        res.status(200).json({ message: "Producto guardado exitosamente" });
      } else {
        res.status(500).json({ error: "El no producto no se guardó" });
      }
    } catch (error) {
      sails.log("Error:", error);
    }
  },
  updateProduct: async function (req, res) {
    try {
      const id = req.params.id;
      const product = req.body;

      let updateOutcome = await Products.updateProduct(id, product);
      if (!updateOutcome) {
        res.status(500).json({ error: "Producto no encontrado" });
      } else {
        res.status(200).json({ message: "Producto actualizado exitosamente" });
      }
    } catch (error) {
      sails.log("Error:", error);
    }
  },
  deleteProduct: async function (req, res) {
    try {
      const id = req.params.id;
      let deleteOutcome = await Products.deleteProductById(id);
      if (!deleteOutcome) {
        res.status(500).json({ error: "Producto no encontrado" });
      } else {
        res.status(200).json({ message: "Producto borrado exitosamente" });
      }
    } catch (error) {
      sails.log("Error:", error);
    }
  },
};
