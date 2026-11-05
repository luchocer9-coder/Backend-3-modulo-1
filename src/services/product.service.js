import { productRepository } from '../repositories/product.repository.js';
import { PRODUCT_STATUS } from '../constants/index.js';
import { AppError } from '../utils/app-error.js';

const getStatusFromStock = (stock) =>
  stock > 0 ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.OUT_OF_STOCK;

class ProductService {
  async getAll() {
    return productRepository.getAll({ status: PRODUCT_STATUS.AVAILABLE });
  }

  async getById(id) {
    const product = await productRepository.getById(id);

    if (!product) {
      throw new AppError('Producto no encontrado', 404);
    }

    return product;
  }

  async create(data) {
    const stock = data.stock ?? 0;

    return productRepository.create({
      ...data,
      stock,
      status: getStatusFromStock(stock),
    });
  }

  async update(id, data) {
    const { status, ...changes } = data;

    if (changes.stock !== undefined) {
      changes.status = getStatusFromStock(changes.stock);
    }

    const updatedProduct = await productRepository.update(id, changes);

    if (!updatedProduct) {
      throw new AppError('Producto no encontrado', 404);
    }

    return updatedProduct;
  }

  async delete(id) {
    const deletedProduct = await productRepository.delete(id);

   if (!deletedProduct) {
  throw new AppError('Producto no encontrado', 404);
}

    return deletedProduct;
  }
}

export const productService = new ProductService();