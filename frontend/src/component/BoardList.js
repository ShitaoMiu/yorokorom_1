import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BbsSettingContext } from "../common/Board";
import PageNationPage from "./PageNationPage";
import axios from "axios";
const BoardList = () => {
  const [nowPage, setNowPage] = useState(1);
  // const [boardSetting, setBoardSetting] = useState(null);
  const boardSetData = useContext(BbsSettingContext);
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const Navigate = useNavigate();

  useEffect(() => {
    if (boardSetData && boardSetData.bbsId && boardSetData.pagePerArti) {
      // setBoardSetting(boardSetData);
      setNowPage(1);
      const fetchPostData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/board/" +
              boardSetData.bbsId +
              "/page/" +
              nowPage
          );

          setPosts(response.data.paginatedData);
          setTotalCount(response.data.totalCount);
        } catch (error) {
          console.log(error);
        }
      };
      fetchPostData();
    }
  }, [boardSetData?.bbsId, nowPage, boardSetData]);

  const handleBoardEdit = () => {
    Navigate("/board/1/new");
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("ko-KR", options);
  };
  return (
    <div className="BoardList">
      <table className="bbsTable">
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "40%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">등록일</th>
            <th scope="col"> 조회</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.nttId}>
              <td>{post.nttId}</td>
              <td>
                <Link to={`/board/${boardSetData.bbsId}/post/${post.nttId}`}>
                  {post.nttSj}
                </Link>
              </td>
              <td>{post.ntcrId}</td>
              <td>{formatDate(post.regDate)}</td>
              <td>{post.rdcnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PageNationPage totalCount={totalCount} />
      <button onClick={handleBoardEdit}>쓰기</button>
    </div>
  );
};

export default BoardList;
