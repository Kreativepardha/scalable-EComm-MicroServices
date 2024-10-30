import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { logger } from "../utils/logger";





const productService = new ProductService();


export class ProductController{
    static async getAllProducts(req: Request, res: Response ) {
        try {
            const products = await productService.getAllProducts()
            res.status(200).json(products)
        } catch (err) {
            logger.error(`Error fetching products: ${err}`)
            res.status(500).json({error: "Internal Server Error"})
        }
    }
    static async addPrduct(req: Request, res: Response) {
        try {
            const product = await productService.addProduct(req.body)
            res.status(201).json(product);
        } catch (err) {
            logger.error(`Error adding product: ${err}`);
            res.status(400).json({ error: "Invalid product data" });       
        }
    }








}