import mongoose , {Schema, Document} from 'mongoose';


export interface IProduct extends Document {
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
}

const productSchema = new Schema({
    name: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    category: {
        type: String, required: true
    },
    stock: {
        type: Number, required: true
    }
})


export const Product = mongoose.model<IProduct>("Product", productSchema);