// import axios from "axios";
import React, { useEffect, useReducer } from "react";
import fetchCommonData from "../commonData/CommonData";

const initialState = {
  menus: [],
  oneDepthMenus: [],
  secondDepthMenus: [],
};

// 상태를 업데이트하는 리듀서 함수를 정의합니다
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MENU_DATA":
      return {
        ...state,
        menus: action.payload.menus,
        oneDepthMenus: action.payload.oneDepthMenus,
        secondDepthMenus: action.payload.secondDepthMenus,
      };
    default:
      return state;
  }
};

const MenuNavArea = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchData() {
      try {
        const commonDataResponse = await fetchCommonData();
        const firstDepthMenus = commonDataResponse.menus.filter(
          (menu) => menu.MENU_LEVEL === "1"
        );
        const secondDepthMenus = commonDataResponse.menus.filter(
          (menu) => menu.MENU_LEVEL === "2"
        );

        dispatch({
          type: "SET_MENU_DATA",
          payload: {
            menus: commonDataResponse.menus,
            oneDepthMenus: firstDepthMenus,
            secondDepthMenus: secondDepthMenus,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const navMenuLiList = document.querySelectorAll(".nav_menu_li");
    const subMenuUlAreaList = document.querySelectorAll(".sub_menu_ul_area");
    // const subMenuUlArea = document.querySelector(".sub_menu_ul_area");
    navMenuLiList.forEach((elem, index) => {
      elem.addEventListener("click", function () {
        subMenuUlAreaList.forEach((subMenuUlArea, index) => {
          subMenuUlArea.style.display = "none";
        });
        subMenuUlAreaList[index].style.display = "block";
      });
    });
  }, [state]);

  return (
    <div className="MenuNavArea">
      <nav>
        <ul className="nav_menu_ul">
          {state.oneDepthMenus.map((oneDepthMenu, index) => (
            <li className="nav_menu_li" key={index}>
              {oneDepthMenu.MENU_NM}
              <div className="sub_menu_ul_area test">
                <ul className="sub_menu_ul">
                  {state.secondDepthMenus
                    .filter(
                      (secondDepthMenu) =>
                        secondDepthMenu.UPPER_MENU_NO === oneDepthMenu.MENU_NO
                    )
                    .map((subMenu, subIndex) => (
                      <li className="sub_menu_li" key={subIndex}>
                        {subMenu.MENU_NM}
                      </li>
                    ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MenuNavArea;
