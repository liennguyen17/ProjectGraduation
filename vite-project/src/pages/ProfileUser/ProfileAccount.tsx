import { Dropdown, MenuProps } from "antd";

import { useNavigate } from "react-router-dom";
import { appInfo } from "../../config/appInfo";
import { clearCredentialCookie } from "../../service/utils";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
function ProfileAccount({ defaultDom }: any) {
  // const navigate = useNavigate();
  // function logout() {
  //   navigate(LOGIN_PATH);
  // }

  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const doLogout = () => {
    clearCredentialCookie({ name: "access_token" });
    navigate(appInfo.loginPath);
    sessionStorage.clear();
  };

  const doProfile = () => {
    dispatch({
      payload: {
        isDrawerProfile: true,
      },
      type: "setIsDrawerProfile",
    });
  };

  const changePassword = () => {
    dispatch({
      payload: {
        isModalPassword: true,
      },
      type: "setIsModalPassword",
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: "Thông tin tài khoản",
      // icon: <BsPersonFillExclamation />,
      // path: "/profile",
      onClick: doProfile,
    },
    {
      key: "support",
      label: "Đổi mật khẩu",
      // icon: <BiSupport />,
      onClick: changePassword,
    },
    {
      key: "divider",
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      // icon: <AiOutlineLogout />,
      danger: true,
      onClick: doLogout,
    },
  ];

  return <Dropdown menu={{ items }}>{defaultDom}</Dropdown>;
}

export default ProfileAccount;
