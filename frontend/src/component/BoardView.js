import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { BbsSettingContext } from "../common/Board";
import ToastEditor from "../component/ToastEditor";
import MyButton from "../common/ComButton";

const BoardView = ({ postId }) => {
  const titleInputRef = useRef();
  const contentsAreaRef = useRef();
  const toastEditorRef = useRef(); // ToastEditor의 ref

  const [post, setPost] = useState({
    nttSj: "",
    nttCn: "",
    regDate: "",
  });
  const [boardSetting, setBoardSetting] = useState(null);
  const boardSetData = useContext(BbsSettingContext);
  const Navigate = useNavigate();
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("ko-KR", options);
  };

  useEffect(() => {
    if (boardSetData) {
      setBoardSetting(boardSetData);
      axios
        .get(`http://localhost:8080/board/${boardSetData.bbsId}/post/${postId}`)
        .then((response) => {
          setPost({
            nttSj: response.data.post.nttSj,
            nttCn: response.data.post.nttCn,
            regDate: response.data.post.regDate,
          });
        })
        .catch((error) => console.log(error));
    }
  }, [boardSetData, postId]);
  return (
    <div className="BoardView">
      <div className="upInfoArea">
        <div type="text" name="boardTitle" className="titleDiv">
          {post.nttCn}
        </div>
        <div type="text" name="regId" className="regIdDIv">
          {formatDate(post.regDate)}
        </div>
      </div>
      <div className="contentArea">
        <div className="contentsText">{post.nttCn}</div>
      </div>
      <section>
        <div className="btnArea">
          <MyButton text={"리스트이동"} onClick={() => Navigate(-1)} />
          <MyButton text={"수정하기"} type="positive" />
        </div>
      </section>
    </div>
  );
};

export default BoardView;
