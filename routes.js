import express from 'express';
import {getAllProducts, getProduct} from "./products.js";

export const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', new Date().toISOString())
  next()
})

router.get('/', (req, res) => {
  res.send('Home Page');
});

router.get('/all', (req, res) => {
  getAllProducts().then(products => res.send(products))
})

router.get('/all/:productId', (req, res) => {
  const { params: { productId } } = req;
  getProduct(productId).then(product => res.send(product))
})
