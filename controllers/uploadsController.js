const path = require('path');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');

const uploadProductImage = async (req, res) => {
    let productImage = req.files.image; // imagen

    const imagePath = path.join(__dirname, // ruta donde se guardara la imagen
        '../public/uploads/'
        + `${productImage.name}`);

    await productImage.mv(imagePath); // se accede al método mv para mover la imagen a la ruta especificada

    return res.status(StatusCodes.OK).json({ image: { src: `uploads/${productImage.name}` }, message: `Image uploaded successfully` });
}

module.exports = {
    uploadProductImage,
};