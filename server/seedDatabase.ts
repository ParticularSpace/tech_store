import mongoose from 'mongoose';
import { Product } from './src/models/Product';

interface ProductDocument {
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  discountAmount?: number;
  category: string;
  quantity: number;
  stockStatus: string;
  sku: string;
  imgUrl: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
  manufacturer: string;
}

const products = [
  {
    name: 'MacBook Pro',
    description: 'Laptop from Apple',
    price: 1299.99,
    category: 'Laptops',
    quantity: 10,
    stockStatus: 'In Stock',
    sku: 'MBP123',
    imgUrl: 'https://picsum.photos/seed/101/200/300',
    dimensions: { length: 10, width: 8, height: 0.6 },
    weight: 4,
    manufacturer: 'Apple',
  },
    {
    name: 'MacBook Air',
    description: 'Laptop from Apple',
    price: 999.99,
    category: 'Laptops',
    quantity: 10,
    stockStatus: 'In Stock',
    sku: 'MBA123',
    imgUrl: 'https://picsum.photos/seed/102/200/300',
    dimensions: { length: 10, width: 8, height: 0.6 },
    weight: 4,
    manufacturer: 'Apple',
    },
        {
            name: 'Logitech Mouse',
            description: 'Mouse from Logitech',
            price: 29.99,
            category: 'Accessories',
            quantity: 10,
            stockStatus: 'In Stock',
            sku: 'LM123',
            imgUrl: 'https://picsum.photos/seed/103/200/300',
            dimensions: { length: 10, width: 8, height: 0.6 },
            weight: 4,
            manufacturer: 'Logitech',
        },
        {
            name: 'Samsung Galaxy S21',
            description: 'Smartphone from Samsung',
            price: 799.99,
            category: 'Smartphones',
            quantity: 10,
            stockStatus: 'In Stock',
            sku: 'SGS21',
            imgUrl: 'https://picsum.photos/seed/104/200/300',
            dimensions: { length: 6.2, width: 2.8, height: 0.31 },
            weight: 6.03,
            manufacturer: 'Samsung',
          },
          {
            name: 'Dell XPS 15',
            description: 'Laptop from Dell',
            price: 1099.99,
            category: 'Laptops',
            quantity: 10,
            stockStatus: 'In Stock',
            sku: 'DX15',
            imgUrl: 'https://picsum.photos/seed/105/200/300',
            dimensions: { length: 13.6, width: 9.1, height: 0.71 },
            weight: 4.5,
            manufacturer: 'Dell',
          },
          {
            name: 'Dell XPS 13',
            description: 'Laptop from Dell',
            price: 999.99,
            category: 'Laptops',
            quantity: 10,
            stockStatus: 'In Stock',
            sku: 'DX13',
            imgUrl: 'https://picsum.photos/seed/106/200/300',
            dimensions: { length: 11.6, width: 7.8, height: 0.58 },
            weight: 2.7,
            manufacturer: 'Dell',
          },
          {
            name: 'HP Spectre x360',
            description: 'Laptop from HP',
            price: 999.99,
            category: 'Laptops',
            quantity: 10,
            stockStatus: 'In Stock',
            sku: 'HPSX360',
            imgUrl: 'https://picsum.photos/seed/107/200/300',
            dimensions: { length: 12.1, width: 8.6, height: 0.67 },
            weight: 3.53,
            manufacturer: 'HP',
            },
            {
            name: 'HP Envy 13',
            description: 'Laptop from HP',
            price: 799.99,
            category: 'Laptops',
            quantity: 10,
            stockStatus: 'In Stock',
            sku: 'HPE13',
            imgUrl: 'https://picsum.photos/seed/108/200/300',
            dimensions: { length: 12.1, width: 8.3, height: 0.57 },
            weight: 2.82,
            manufacturer: 'HP',
            },
            {
                name: 'Eero Wifi 6',
                description: 'Router from Eero',
                price: 129.99,
                category: 'Accessories',
                quantity: 10,
                stockStatus: 'In Stock',
                sku: 'EW6',
                imgUrl: 'https://picsum.photos/seed/109/200/300',
                dimensions: { length: 3.9, width: 3.9, height: 2.4 },
                weight: 0.78,
                manufacturer: 'Eero',
                }
];

async function seedDB() {
  try {
    await mongoose.connect('mongodb+srv://samjones:4Ninja44@cluster0.wnedspb.mongodb.net/?retryWrites=true&w=majority');
    await Product.insertMany(products as ProductDocument[]);
    console.log('Database seeded!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Database seeding failed:', error);
  }
}

seedDB();
