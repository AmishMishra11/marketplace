import React from "react";

import {
  AiOutlineCamera,
  AiOutlineSearch,
  AiOutlineMore,
} from "react-icons/ai";

function Nav() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-[#008069] text-white">
      <div className="flex items-center justify-between w-full">
        <h2 className="p-2 font-semibold text-lg">WhatsApp</h2>
        <div className="flex items-center justify-between gap-2 p-2 text-lg">
          <AiOutlineCamera />
          <AiOutlineSearch />
          <AiOutlineMore />
        </div>
      </div>
      <div className="flex items-center justify-between p-4 pb-0 text-lg w-full">
        <p className="border-b-2">Chats</p>
        <p>Status</p>
        <p>Calls</p>
      </div>
    </div>
  );
}

export default Nav;
