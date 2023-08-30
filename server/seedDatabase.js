"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Product_1 = require("./src/models/Product");
var products = [
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
function seedDB() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://samjones:4Ninja44@cluster0.wnedspb.mongodb.net/?retryWrites=true&w=majority')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Product_1.Product.insertMany(products)];
                case 2:
                    _a.sent();
                    console.log('Database seeded!');
                    mongoose_1.default.connection.close();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Database seeding failed:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
seedDB();
