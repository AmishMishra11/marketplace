import React, { useState } from "react";
import { useGroupContext } from "../Context/GroupContext";

import { v4 as uuid } from "uuid";

function Modal({ onClose, groupID }) {
  const [tempProducts, setTempProducts] = useState({
    itemName: "",
    itemDescription: "",
    itemValue: 0,
  });

  const handleChange = (e) => {
    setTempProducts({
      ...tempProducts,
      [e.target.name]: e.target.value,
    });
  };

  const { groups, setGroups } = useGroupContext();

  const addProductHandlerEvent = () => {
    let currentDate = new Date();
    let expirationDate = new Date(currentDate);
    let experationDate = expirationDate.setDate(currentDate.getDate() + 7);
    const newProduct = {
      id: uuid(),
      productName: tempProducts.itemName,
      productDescription: tempProducts.itemDescription,
      value: tempProducts.itemValue,
      currentDate: Date.now(),
      experationDate,
    };

    const newGroups = groups.map((item) =>
      item.id == groupID
        ? { ...item, products: [...item.products, newProduct] }
        : item
    );

    setGroups(newGroups);
    onClose();
  };
  return (
    <div
      className="fixed top-0 right-0  lg:right-[calc(100vw-50rem)] left-0 bottom-0 bg-black bg-opacity-50  flex items-center justify-center z-20"
      onClick={() => onClose()}
    >
      <div
        className="h-72 w-96 bg-slate-200 rounded-lg p-2 flex flex-col items-center justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          className="w-full p-2 text-lg "
          placeholder="item name"
          name="itemName"
          type="text"
          onChange={handleChange}
        />
        <textarea
          className="w-full  p-2 text-lg "
          placeholder="item description"
          name="itemDescription"
          type="text"
          onChange={handleChange}
        />

        <input
          className="w-full p-2 text-lg "
          placeholder="item value"
          name="itemValue"
          type="number"
          onChange={handleChange}
        />
        <button
          className="  text-center w-full p-2 rounded-lg text-white cursor-pointer bg-[#008069]"
          onClick={() => addProductHandlerEvent()}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Modal;
