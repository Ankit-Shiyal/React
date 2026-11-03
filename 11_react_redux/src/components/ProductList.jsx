import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, setEditValue } from "../features/inventorySlice";

const ProductList = () => {
  const inventoryList = useSelector(
    (state) => state.inventory.products
  );

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };


  const [productQuery, setProductQuery] = useState({
    search: "",
    sort: "asc",
  });

  const handleChange = (field, e) => {
    setProductQuery((prod) => {
      return {
        ...prod,
        [field]: e.target.value,
      };
    });
  };

  const filterList = inventoryList.filter((p) =>
    p.name.toLowerCase().includes(productQuery.search.toLowerCase()),
  );

  const sortedList = [...filterList].sort((a, b) => {
    if (productQuery.sort === "asc") {
      return a.id - b.id;
    }

    if (productQuery.sort === "desc") {
      return b.id - a.id;
    }

    if (productQuery.sort === "priceAscending") {
      return Number(a.price) - Number(b.price);
    }

    if (productQuery.sort === "priceDescending") {
      return Number(b.price) - Number(a.price);
    }

    if (productQuery.sort === "QtyAsc") {
      return Number(a.qty) - Number(b.qty);
    }

    if (productQuery.sort === "QtyDesc") {
      return Number(b.qty) - Number(a.qty);
    }
  });



  return (
    <>
      <input
        type="text"
        value={productQuery.search}
        placeholder="enter product name"
        onChange={(e) => handleChange("search", e)}
      />

      <select
        value={productQuery.sort}
        onChange={(e) => handleChange("sort", e)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
        <option value="priceAscending">Price Ascending</option>
        <option value="priceDescending">Price Descending</option>
        <option value="QtyAsc">Quantity Ascending</option>
        <option value="QtyDesc">Quantity Descending</option>
      </select>


      <h2>Inventory List</h2>

      <table border={2}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Category</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>

        <tbody>
          {sortedList.map((item, index) => (
            <tr key={item.id || index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td><button onClick={() => dispatch(setEditValue(item))}>
                Edit
              </button></td>
              <td>
                <button onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;