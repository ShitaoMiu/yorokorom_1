import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useParams를 import
import BoardList from "../component/BoardList";
import BoardEdit from "../component/BoardEdit";
import BoardView from "../component/BoardView";
import Layout from "../layout/Layout";
import axios from "axios";
export const BbsSettingContext = React.createContext();

const Board = () => {
  const { bbsId, postId } = useParams(); //
  const [currentUrl, setCurrentUrl] = useState(null);
  const [boardSettData, setBoardSettData] = useState(null);
  useEffect(() => {
    let mode =
      window.location.pathname.split("/")[3] == null
        ? "list"
        : window.location.pathname.split("/")[3];

    setCurrentUrl(mode);
    axios
      .get("http://localhost:8080/board/boardSet/" + bbsId)
      .then((response) => {
        const bbsMasterEntity = response.data.bbsMasterEntity;
        console.log(bbsMasterEntity);
        setBoardSettData(bbsMasterEntity);
      })
      .catch((error) => console.log(error));
  }, [currentUrl, bbsId]);

  return (
    <BbsSettingContext.Provider value={boardSettData}>
      {currentUrl === "list" ? (
        <Layout>
          <BoardList />
        </Layout>
      ) : currentUrl === "new" ? (
        <Layout>
          <BoardEdit />
        </Layout>
      ) : currentUrl === "edit" ? (
        <Layout>
          <BoardEdit />
        </Layout>
      ) : currentUrl === "post" ? (
        <Layout>
          <BoardView postId={postId} />
        </Layout>
      ) : (
        <BoardList />
      )}
    </BbsSettingContext.Provider>
  );
};

export default Board;
