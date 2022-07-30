module.exports = async function (req, res, proceed) {
  try {
    const { body } = req;

    await Product.validate(body);
    // next();
  } catch (error) {
    sails.log("Error:", error);
    res.status(400).json({ error: "El producto no tiene el formato correcto" });
    return;
  }
};
