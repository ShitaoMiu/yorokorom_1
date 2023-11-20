import axios from "axios";

const fetchCommonData = async () => {
  try {
    const siteInfoResponse = await axios.get(
      "http://localhost:8080/common/settings",
      {
        params: { siteNo: 21 },
      }
    );

    const menuResponse = await axios.get("http://localhost:8080/common/menus", {
      params: { menuNo: 2 },
    });

    return {
      siteInfoOne: siteInfoResponse.data.siteInfoOne,
      menus: menuResponse.data.menuList,
    };
  } catch (error) {
    throw error;
  }
};

export default fetchCommonData;
