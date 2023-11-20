import React from "react";

const Footer = () => {
  return (
    <div className="Footer">
      <section>
        <div className="footer_li test">
          <nav>
            <ul>
              <li>
                <a href="#">개인정보</a>
              </li>
              <li>
                <a href="#">회사소개</a>
              </li>
              <li>
                <a href="#">공지사항</a>
              </li>
              <li>
                <a href="#">이용약관</a>
              </li>
              <li>
                <a href="#">처리방침</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer_info test">
          <div className="footer_img test">
            <img src="/asset/img/social-1206612_640.png" />
          </div>
          <div className="footer_infos test">
            <p className="test">대구시 테스트구 테스트</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
