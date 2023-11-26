const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');

const createProduct = async (req, res) => {
    console.log(req.body);
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
}
const getAllProducts = async (req, res) => {
    res.send('list all products');
}

module.exports = { createProduct, getAllProducts };