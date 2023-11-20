import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BbsSettingContext } from "../common/Board";

const BoardFileInputs = ({ onFileInputChange }) => {
  const boardSetData = useContext(BbsSettingContext);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e, index) => {
    const uploadFiles = [...files];
    uploadFiles[index] = e.target.files[0];
    setFiles(uploadFiles);
    onFileInputChange(uploadFiles.filter((file) => file));
  };

  const renderFileInputs = () => {
    const minFileCount = boardSetData?.atchPosblFileMinNum || 0;
    const maxFileCount = boardSetData?.atchPosblFileMaxNum || 3;
    const maxFileSize = boardSetData?.atchPosblFileSize || 100;
    console.log({ minFileCount, maxFileCount, maxFileSize });
    const fileInputArray = [];
    for (let i = minFileCount; i <= maxFileCount; i++) {
      fileInputArray.push(
        <div key={i} className="fileInputContainer">
          <input
            key={i}
            type="file"
            name={`file${i}`}
            id={`file${i}`}
            className="fileInput"
            onChange={(e) => handleFileChange(e, i)}
          />
          <label htmlFor={`file${i}`} className="fileLabel">
            파일 선택 {i}
          </label>
          <span className="fileNameArea">{files[i]?.name || ""}</span>
        </div>
      );
    }
    return fileInputArray;
  };

  return <div className="fileArea">{renderFileInputs()}</div>;
};

export default BoardFileInputs;
