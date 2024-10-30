import { IProduct } from "../interfaces/ProductInterface";
import { Product } from "../model/ProductModel";





export class ProductRepository {
    async findAll(): Promise<IProduct[]> {
        return Product.find().exec()
    }
    async create(productData: IProduct): Promise<IProduct> {
        return Product.create(productData);
    }
}