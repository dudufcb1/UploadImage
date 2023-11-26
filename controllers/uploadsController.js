const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const uploadProductImageLocal = async (req, res) => {
    console.log(req.files)
    if (!req.files) throw new CustomError.BadRequestError('No files were uploaded.');

    let productImage = req.files.image; // imagen

    if (!productImage.mimetype.startsWith('image')) throw new CustomError.BadRequestError('Please upload an image file');
    const maxSize = 1024 * 1024 * 2; // 2MB
    if (productImage.size > maxSize) throw new CustomError.BadRequestError(`Please upload an image less than ${maxSize}`);


    const imagePath = path.join(__dirname, // ruta donde se guardara la imagen
        '../public/uploads/'
        + `${productImage.name}`);

    await productImage.mv(imagePath); // se accede al método mv para mover la imagen a la ruta especificada

    return res.status(StatusCodes.OK).json({ image: { src: `uploads/${productImage.name}` }, message: `Image uploaded successfully` });
}

const uploadProductImage = async (req, res) => {
    let productImage = req.files.image; // imagen 
    //agrego este check, para evitar que me suban basura al tmp folder y no se elimina al no devolver una respuesta cloudinary
    if (!productImage.mimetype.startsWith('image')) {
        fs.unlinkSync(req.files.image.tempFilePath);
        throw new CustomError.BadRequestError('Please upload an image file');
    }
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: '06pictures'
        }); // se accede al método mv para mover la imagen a la ruta especificada
    fs.unlinkSync(req.files.image.tempFilePath);
    return res.status(StatusCodes.OK).json({ image: { src: result.secure_url }, message: `Image uploaded successfully` });

}

module.exports = {
    uploadProductImage,
};