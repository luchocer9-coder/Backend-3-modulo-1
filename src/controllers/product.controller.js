import { productService } from '../services/product.service.js';

class ProductController {
  async getAll(req, res) {
    const products = await productService.getAll();
    res.status(200).json({ payload: products });
  }

 async getById(req, res) {
  const product = await productService.getById(req.params.id);
  res.status(200).json({ payload: product });
}
  async create(req, res) {
    const product = await productService.create(req.body);
    res.status(201).json({ payload: product });
  }

  async update(req, res) {
    const product = await productService.update(req.params.id, req.body);
    res.status(200).json({ payload: product });
  }

  async delete(req, res) {
    await productService.delete(req.params.id);
    res.status(204).send();
  }
}

export const productController = new ProductController();