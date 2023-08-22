import React from "react";
import { useGroupContext } from "../Context/GroupContext";
import Nav from "./Nav";

import { Link } from "react-router-dom";

function Home() {
  const { groups } = useGroupContext();
  return (
    <div className="bg-white max-w-3xl h-screen">
      <Nav />
      <div className="h-full flex flex-col items-start justify-start">
        {groups.map((item) => (
          <Link
            to={`group/${item.id}`}
            className="  flex items-center justify-between w-full p-4 cursor-pointer hover:bg-slate-100"
          >
            <div className="flex items-center justify-start">
              <div className="w-10 h-10 rounded-full bg-purple-400"></div>
              <p className="p-4">{item.groupName}</p>
            </div>
            <p>{new Date().toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
