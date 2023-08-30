import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_PRODUCT } from "../gql/mutations";

const Admin = () => {
  const [productAdded, setProductAdded] = useState(false);

  const [createNewProduct] = useMutation(CREATE_NEW_PRODUCT);
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
    imgUrl: Yup.string().url("Must be a valid URL"), 
    dimensions: Yup.object({
      length: Yup.number().required(),
      width: Yup.number().required(),
      height: Yup.number().required(),
    }),
    weight: Yup.number().required("Weight is required"),
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
      imgUrl: `https://picsum.photos/seed/${Math.floor(
        Math.random() * 1000
      )}/200/300`,
      dimensions: { length: 0, width: 0, height: 0 },
      weight: 0,
    },
    validationSchema,

    
    onSubmit: async (values) => {
      try {
        const { data } = await createNewProduct({
          variables: {
            ...values,
            price: parseFloat(values.price.toString()),
            discountPercentage: parseFloat(values.discountPercentage.toString()),
            discountAmount: parseFloat(values.discountAmount.toString()),
            quantity: parseInt(values.quantity.toString(), 10),
            dimensions: {
              length: parseFloat(values.dimensions.length.toString()),
              width: parseFloat(values.dimensions.width.toString()),
              height: parseFloat(values.dimensions.height.toString()),
            },
            weight: parseFloat(values.weight.toString()),
          },
        });
        console.log("Product created: ", data);
        setProductAdded(true);
      } catch (error) {
        console.log("Error creating product: ", error);
      }
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
            <h3 className="font-semibold text-lg">Name</h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Product Name"
                className="p-2 rounded border w-full"
                {...formik.getFieldProps("name")}
              />
              <div className="space-y-2">
                <label className="font-semibold">Description</label>
                <textarea
                  placeholder="Description"
                  className="p-2 rounded border w-full h-32" // h-32 sets the height
                  maxLength={500}
                  {...formik.getFieldProps("description")}
                ></textarea>
                <p className="text-sm text-gray-500">
                  {formik.values.description.length}/500
                </p>
              </div>
              <label className="font-semibold">Image URL</label>
              <input
                type="text"
                placeholder="Image URL"
                className="p-2 rounded border w-full"
                {...formik.getFieldProps("imgUrl")}
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
              <label className="font-semibold">Category</label>
              <input
                type="text"
                placeholder="Category"
                className="p-2 rounded border w-full"
                {...formik.getFieldProps("category")}
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
