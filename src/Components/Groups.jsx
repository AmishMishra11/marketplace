import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AiOutlineArrowLeft,
  AiOutlineMore,
  AiFillCamera,
  AiOutlineShopping,
} from "react-icons/ai";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { BiSolidMicrophone } from "react-icons/bi";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoMdCall } from "react-icons/io";
import { useGroupContext } from "../Context/GroupContext";
import Modal from "./Modal";

function Groups() {
  const { groupID } = useParams();

  const { groups, setGroups } = useGroupContext();

  const setMarketPlaceHandler = (boolVal) => {
    const newGroups = groups.map((item) =>
      item.id == groupID ? { ...item, ismarketPlaceOn: boolVal } : item
    );

    setGroups(newGroups);
  };

  const handlePurchase = (productId) => {
    const newGroups = groups.map((item) =>
      item.id == groupID
        ? {
            ...item,
            products: item.products.filter((item) => item.id != productId),
          }
        : item
    );

    setGroups(newGroups);

    toast.success("Item Purchased");
  };

  const currentGroup = groups.filter((item) => item.id == groupID);

  const { groupName, members, ismarketPlaceOn, products } = currentGroup[0];

  const ref = useRef();

  const [showOptions, setShowOptions] = useState(false);

  const [showShop, setShowShop] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    console.log(currentGroup, groups);
  }, [groupID, currentGroup]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showOptions && ref.current && !ref.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showOptions]);

  return (
    <div className="bg-white max-w-3xl h-screen flex flex-col justify-between  ">
      <div
        className="flex relative
       items-center justify-between w-full bg-[#008069] text-white text-2xl p-4"
      >
        <Link to={"/"}>
          <AiOutlineArrowLeft className="m-2 cursor-pointer" />
        </Link>
        <div className="w-10 h-10 m-2 rounded-full bg-purple-400"></div>
        <div className="flex flex-col items-start justify-start w-[calc(100%-3rem)]">
          <p>{groupName}</p>
          <p>{members.map((item) => item)}</p>
        </div>
        <IoMdCall />
        <AiOutlineMore
          className="cursor-pointer m-3 text-3xl"
          onClick={() => {
            setShowOptions((prev) => !prev);
          }}
        />

        {showOptions && (
          <div
            ref={ref}
            className="bg-white w-56 absolute top-8 right-4 flex flex-col items-start justify-between text-black p-2"
          >
            <p className=" p-2 text-base">Group info</p>
            <p className=" p-2 text-base">Group media</p>
            <p className="  p-2 text-base">Search</p>
            {ismarketPlaceOn ? (
              <p
                className=" p-2 cursor-pointer hover:bg-slate-200 w-full text-left text-base"
                onClick={() => setMarketPlaceHandler(false)}
              >
                Close MarketPlace
              </p>
            ) : (
              <p
                className="  p-2 cursor-pointer hover:bg-slate-200 w-full text-left text-base"
                onClick={() => setMarketPlaceHandler(true)}
              >
                Open MarketPlace
              </p>
            )}
          </div>
        )}
      </div>

      {!showShop && (
        <div className="bg-stone-300 w-full h-full">Group Messages</div>
      )}

      {!showShop && (
        <div className="flex items-center  justify-between w-full bg-stone-300">
          <div className="flex items-center justify-between gap-4 p-2 text-2xl w-full bg-white  rounded-3xl ">
            <MdOutlineEmojiEmotions />

            <p className="w-full text-left">Message</p>

            {ismarketPlaceOn && (
              <AiOutlineShopping
                className="bg-[#9F9F9F] rounded-full p-1 text-3xl cursor-pointer"
                onClick={() => setShowShop(true)}
              />
            )}

            <LiaRupeeSignSolid />

            <AiFillCamera />
          </div>
          <div className="bg-[#008069] m-2 rounded-full p-2 text-2xl ">
            <BiSolidMicrophone />
          </div>
        </div>
      )}

      {showShop && (
        <div className="bg-stone-300 w-full h-full flex flex-col justify-between items-start p-4 ">
          <div className="flex justify-center items-center text-center w-full font-bold text-2xl text-[#008069]">
            <AiOutlineArrowLeft
              className="m-2 cursor-pointer hover:bg-slate-500 p-2 rounded-full text-4xl"
              onClick={() => setShowShop(false)}
            />

            <h2 className="w-full">Welcome to MarketPlace</h2>
          </div>
          <div className="w-full h-full">
            <div className="flex flex-wrap gap-2">
              {products?.length !== 0 &&
                products.map((item) => (
                  <div className="flex flex-col items-start justify-start bg-white w-56 p-2 rounded-md">
                    <div className="text-xl font-semibold p-2">
                      {item.productName}
                    </div>
                    <div className="p-2">{item.productDescription}</div>
                    <div className="flex items-center justify-between w-full p-2">
                      <div>₹{item.value}</div>
                      <div>
                        {Math.ceil(
                          (item.experationDate - item.currentDate) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        Days Left
                      </div>
                    </div>
                    <button
                      className="text-center w-full p-1 rounded-lg text-white cursor-pointer bg-[#008069]"
                      onClick={() => handlePurchase(item.id)}
                    >
                      Buy
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div
            className="text-center w-full p-4 rounded-lg text-white cursor-pointer bg-[#008069]"
            onClick={() => {
              console.log("here");
              setShowAddModal(true);
            }}
          >
            Sell Item
          </div>
        </div>
      )}

      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)} groupID={groupID} />
      )}
    </div>
  );
}

export default Groups;
