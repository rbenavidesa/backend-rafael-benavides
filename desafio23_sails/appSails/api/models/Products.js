/**
 * Products.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: "string", required: true },
    code: { type: "string", required: true },
    description: { type: "string", required: true },
    price: { type: "number", required: true },
    thumbnail: { type: "string", required: true },
  },

  getProducts: async function (opts) {
    try {
      var products = await Products.find();
      return products;
    } catch (error) {
      sails.log("Error:", error);
    }
  },

  getProductById: async function (productId) {
    try {
      const response = await Products.findOne({ _id: productId });
      return response;
    } catch (error) {
      sails.log("Error:", error);
      return false;
    }
  },

  createProduct: async function (product) {
    try {
      const response = await Products.create(product);
      return response;
    } catch (error) {
      sails.log("Error:", error);
      return false;
    }
  },

  updateProduct: async function (productId, product) {
    try {
      const response = await Products.update({ _id: productId }, product);
      return response.modifiedCount;
    } catch (error) {
      sails.log("Error:", error);
      return false;
    }
  },

  deleteProductById: async function (productId) {
    try {
      const response = await Products.deleteMany({ _id: productId });
      return response.deletedCount;
    } catch (error) {
      sails.log("Error:", error);
      return false;
    }
  },
};
