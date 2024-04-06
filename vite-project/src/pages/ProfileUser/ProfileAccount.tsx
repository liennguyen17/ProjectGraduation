import { Dropdown, MenuProps } from "antd";

function ProfileAccount({ defaultDom }: any) {
  // const navigate = useNavigate();
  // function logout() {
  //   navigate(LOGIN_PATH);
  // }
  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: "Thông tin tài khoản",
      // icon: <BsPersonFillExclamation />,
    },
    {
      key: "support",
      label: "Đổi mật khẩu",
      // icon: <BiSupport />,
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
      // onClick: logout,
    },
  ];

  return <Dropdown menu={{ items }}>{defaultDom}</Dropdown>;
}

export default ProfileAccount;
