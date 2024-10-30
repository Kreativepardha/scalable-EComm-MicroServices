import { IProduct } from "../interfaces/ProductInterface";
import { ProductRepository } from "../repository/ProductRepository";
import { logger } from "../utils/logger";







export class ProductService {
    private productRepository = new ProductRepository();
    
    async getAllProducts(): Promise<IProduct[]> {
        try {
            const products = await this.productRepository.findAll()
             } catch (err) {
            logger.error(`Error fetching products: ${err}`)
            throw err;
        }
    }

    async addProduct(productData: IProduct): Promise<IProduct> {
        try {
            const product = await this.productRepository.create(productData);
            return product;
        } catch (err) {
            logger.error(`Error creating product: ${err}`)
            throw err;
        }
    }
}