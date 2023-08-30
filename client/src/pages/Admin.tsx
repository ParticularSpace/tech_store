import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Admin = () => {
  const [productAdded, setProductAdded] = useState(false);

  // Define a validation schema for the form
  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Product description is required"),
    price: Yup.number().required("Product price is required"),
    category: Yup.string().required("Category is required"),
    quantity: Yup.number().required("Quantity is required"),
    stockStatus: Yup.string().required("Stock status is required"),
    sku: Yup.string().required("SKU is required"),
    // ... more validations
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      quantity: 0,
      stockStatus: "In Stock",
      sku: "",
      // ... more initial values
    },
    validationSchema,
    onSubmit: (values) => {
      // TODO: Make a call to the server to add the product
      console.log("Form data", values);
      setProductAdded(true);
    },
  });

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-4xl font-semibold mb-8">Admin Dashboard</h1>
      <div className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Add Product</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Basic Info</h3>
            <input 
              type="text" 
              placeholder="Product Name" 
              className="p-2 rounded border" 
              {...formik.getFieldProps("name")} 
            />
            <input 
              type="text" 
              placeholder="Description" 
              className="p-2 rounded border" 
              {...formik.getFieldProps("description")} 
            />
            <input 
              type="number" 
              placeholder="Price" 
              className="p-2 rounded border" 
              {...formik.getFieldProps("price")} 
            />
            <input 
              type="text" 
              placeholder="Category" 
              className="p-2 rounded border" 
              {...formik.getFieldProps("category")} 
            />
            <input 
              type="number" 
              placeholder="Quantity" 
              className="p-2 rounded border" 
              {...formik.getFieldProps("quantity")} 
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Stock and Discounts</h3>
            <select 
              className="p-2 rounded border" 
              {...formik.getFieldProps("stockStatus")}
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Discontinued">Discontinued</option>
            </select>
            <input 
              type="number" 
              placeholder="Discount Percentage" 
              className="p-2 rounded border" 
              {...formik.getFieldProps("discountPercentage")} 
            />
            <input 
              type="number" 
              placeholder="Discount Amount" 
              className="p-2 rounded border" 
              {...formik.getFieldProps("discountAmount")} 
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Other Details</h3>
            <input 
              type="text" 
              placeholder="SKU" 
              className="p-2 rounded border" 
              {...formik.getFieldProps("sku")} 
            />
            <input 
              type="text" 
              placeholder="Manufacturer" 
              className="p-2 rounded border" 
              {...formik.getFieldProps("manufacturer")} 
            />
            <input 
              type="number" 
              placeholder="Weight" 
              className="p-2 rounded border" 
              {...formik.getFieldProps("weight")} 
            />
          </div>
  
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Dimensions</h3>
            <input 
              type="number" 
              placeholder="Length" 
              className="p-2 rounded border" 
              {...formik.getFieldProps("dimensions.length")} 
            />
            <input 
              type="number" 
              placeholder="Width" 
              className="p-2 rounded border" 
              {...formik.getFieldProps("dimensions.width")} 
            />
            <input 
              type="number" 
              placeholder="Height" 
              className="p-2 rounded border" 
              {...formik.getFieldProps("dimensions.height")} 
            />
          </div>
          
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded-lg">
            Add Product
          </button>
        </form>
        {productAdded && (
          <p className="text-green-600 mt-4">Product added successfully!</p>
        )}
      </div>
    </div>
  );
  
};

export default Admin;

