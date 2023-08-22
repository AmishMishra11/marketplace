import { createContext, useContext, useState } from "react";

import { myGroups } from "../db/group";

const GroupContext = createContext(null);

const GroupContextProvider = ({ children }) => {
  const [groups, setGroups] = useState(myGroups);
  return (
    <GroupContext.Provider value={{ groups, setGroups }}>
      {children}
    </GroupContext.Provider>
  );
};
const useGroupContext = () => useContext(GroupContext);

export { useGroupContext, GroupContextProvider };
