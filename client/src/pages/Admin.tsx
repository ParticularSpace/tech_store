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
    discountPercentage: Yup.number().min(0).max(100),
    discountAmount: Yup.number().min(0),
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
      price: "0.00",
      discountPercentage: 0,
      discountAmount: 0,
      category: "",
      quantity: 0,
      stockStatus: "In Stock",
      sku: "",
      // ... more initial values
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form data", values);
      setProductAdded(true);
    },
  });

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-4xl font-semibold mb-8">Admin Dashboard</h1>
      <div className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Add Product</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-4 col-span-1">
            <h3 className="font-semibold text-lg">Basic Info</h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Product Name"
                className="p-2 rounded border w-full"
                {...formik.getFieldProps("name")}
              />
              <input
                type="text"
                placeholder="Description"
                className="p-2 rounded border w-full"
                {...formik.getFieldProps("description")}
              />
              <input
                type="text"
                placeholder="Category"
                className="p-2 rounded border w-full"
                {...formik.getFieldProps("category")}
              />
              <label className="font-semibold">Price</label>
              <input
                type="text"
                placeholder="Price"
                className="p-2 rounded border w-full"
                value={`$${formik.values.price}`}
                onChange={(e) => {
                  // Remove non-digit characters and set the value
                  const value = e.target.value.replace(/[^0-9.]/g, "");
                  formik.setFieldValue("price", value);
                }}
              />
              <label className="font-semibold">Quantity</label>
              <input
                type="number"
                placeholder="Quantity"
                className="p-2 rounded border w-full"
                {...formik.getFieldProps("quantity")}
              />
            </div>
          </div>

          <div className="space-y-4 col-span-1">
            <h3 className="font-semibold text-lg">Stock</h3>
            <div className="space-y-2">
              <select
                className="p-2 rounded border w-full"
                {...formik.getFieldProps("stockStatus")}
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Discontinued">Discontinued</option>
              </select>
              <h3 className="font-semibold text-lg">Percent Off</h3>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Discount Percentage"
                  className="p-2 rounded border w-full pr-8" // Updated padding-right
                  {...formik.getFieldProps("discountPercentage")}
                />
                <span className="absolute inset-y-0 right-2 flex items-center text-gray-600">
                  %
                </span>
              </div>

              <h3 className="font-semibold text-lg">Amount Off</h3>
              <input
                type="text"
                placeholder="Discount Amount"
                className="p-2 rounded border w-full"
                value={`$${formik.values.discountAmount.toFixed(2)}`}
                onChange={(e) => {
                  const value = parseFloat(
                    e.target.value.replace(/[^0-9.]/g, "")
                  );
                  if (!isNaN(value)) {
                    formik.setFieldValue("discountAmount", value);
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-4 col-span-2">
            <h3 className="font-semibold text-lg">Other Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="SKU"
                className="p-2 rounded border w-full"
                {...formik.getFieldProps("sku")}
              />
              <input
                type="text"
                placeholder="Manufacturer"
                className="p-2 rounded border w-full"
                {...formik.getFieldProps("manufacturer")}
              />
              <input
                type="number"
                placeholder="Weight"
                className="p-2 rounded border w-full"
                {...formik.getFieldProps("weight")}
              />
            </div>
          </div>

          <div className="space-y-4 col-span-2">
            <h3 className="font-semibold text-lg">Dimensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Length"
                className="p-2 rounded border w-full"
                {...formik.getFieldProps("dimensions.length")}
              />
              <input
                type="number"
                placeholder="Width"
                className="p-2 rounded border w-full"
                {...formik.getFieldProps("dimensions.width")}
              />
              <input
                type="number"
                placeholder="Height"
                className="p-2 rounded border w-full"
                {...formik.getFieldProps("dimensions.height")}
              />
            </div>
          </div>

          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white p-2 rounded-lg"
          >
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
