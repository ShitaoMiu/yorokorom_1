import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export const BbbsSettingContext = React.createContext();

const BoardWrite = ({ bbsId }) => {
  const [boardSettData, setBoardSettingData] = useState(null);
  useEffect(() => {}, []);

  return <div></div>;
};
export default BoardWrite;
