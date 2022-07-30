module.exports = async function (req, res, proceed) {
  try {
    const id = req.params.id;
    const productId = req.params.id_prod;

    if (productId == null) {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // next();
      } else {
        res
          .status(400)
          .json({ error: "El parámetro ID no tiene el formato correcto" });
      }
    } else {
      if (
        id.match(/^[0-9a-fA-F]{24}$/) &&
        productId.match(/^[0-9a-fA-F]{24}$/)
      ) {
        // next();
      } else {
        res.status(400).json({
          error:
            "Los parámetros ID y/o ID_PROD deben no tienen el fomato correcto",
        });
      }
    }
  } catch (error) {
    sails.log("Error:", error);
    return false;
  }
};
