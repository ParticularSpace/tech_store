"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = require("mongoose");
var dimensionsSchema = new mongoose_1.default.Schema({
    length: Number,
    width: Number,
    height: Number,
});
var productSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    discountAmount: Number,
    category: String,
    quantity: Number,
    stockStatus: String,
    sku: String,
    imgUrl: String,
    dimensions: dimensionsSchema,
    weight: Number,
    manufacturer: String,
});
exports.Product = mongoose_1.default.model('Product', productSchema);
