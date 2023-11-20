import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BbsSettingContext } from "../common/Board";
import ToastEditor from "../component/ToastEditor";
import MyButton from "../common/ComButton";
import BoardFileInputs from "../component/BoardFileInputs";
import axios from "axios";

const BoardEdit = () => {
  const titleInputRef = useRef();
  const contentsAreaRef = useRef();
  const toastEditorRef = useRef(); // ToastEditor의 ref

  const [boardSetting, setBoardSetting] = useState(null);
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [loading, setLoading] = useState(null);
  const boardSetData = useContext(BbsSettingContext);
  const [files, setFiles] = useState([]); // 선택된 파일을 저장하는 state
  const Navigate = useNavigate();

  useEffect(() => {
    setBoardSetting(boardSetData);
  }, [boardSetData]);

  const maxFileCount = boardSetData?.atchPosblFileMaxNum || 0;
  const handleFileInputChange = (files) => {
    setFiles(files);
  };
  const handleSubmit = async () => {
    const confirmResult = window.confirm("저장하시겠습니까?");
    if (!confirmResult) {
      return;
    }
    try {
      if (boardTitle.length < 1) {
        console.log("제목 길이없음");
        titleInputRef.current.focus();
        return false;
      }

      if (boardContent.length === 0) {
        toastEditorRef.current.focus();
        return false;
      }
      setLoading(true);
      const boardData = new FormData();
      boardData.append("bbsTitle", boardTitle);
      boardData.append("bbsContent", boardContent);
      boardData.append("regId", "Me");
      boardData.append("bbsId", boardSetting.bbsId);
      boardData.append("nttId", 0);

      for (let i = 0; i < files.length; i++) {
        boardData.append("files", files[i]);
      }

      const response = await axios.post(
        "http://localhost:8080/board/writeAction",
        boardData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      alert("글을 저장완료 하였습니다");
    } catch (error) {
      setLoading(false);
      alert("오류가 발생하였습니다.");
      console.log(error);
    }
  };

  const goList = () => {
    Navigate("/board/" + boardSetting.bbsId);
  };

  return (
    <div className="boardEdit">
      <div className="titleArea">
        <input
          type="text"
          name="boardTitle"
          className="inputText"
          ref={titleInputRef}
          onChange={(e) => setBoardTitle(e.target.value)}
        ></input>
      </div>
      <div className="editContent">
        {boardSetting?.isUseEditor == "Y" ? (
          <ToastEditor
            ref={toastEditorRef}
            onContentChange={(content) => setBoardContent(content)}
          />
        ) : (
          <textarea ref={contentsAreaRef}></textarea>
        )}
      </div>
      <section>
        {loading && (
          <div className="loadingOverlay">
            <div className="loadingPopup">
              <img src="/img/loading.gif" alt="로딩중 ......." />
            </div>
          </div>
        )}
        {maxFileCount > 0 && (
          <BoardFileInputs onFileInputChange={handleFileInputChange} />
        )}
      </section>
      <section>
        <div className="btnArea">
          <MyButton text={"취소하기"} onClick={() => Navigate(-1)} />
          <MyButton text={"작성완료"} type="positive" onClick={handleSubmit} />
        </div>
      </section>
    </div>
  );
};

export default BoardEdit;
