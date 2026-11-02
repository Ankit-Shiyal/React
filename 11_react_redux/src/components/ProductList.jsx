import React from "react";
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

  return (
    <>
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
          {inventoryList.map((item, index) => (
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