import { ProLayoutProps } from "@ant-design/pro-components";
import { ProSettings } from "@ant-design/pro-layout";

export const layoutConfig = {
  prefixCls: "my-prefix",
  logo: "123",
  token: {
    colorPrimary: "#CE1126",
    header: { heightLayoutHeader: 40 },
    sider: {
      colorMenuBackground: "rgb(238, 130, 238)",
      colorBgCollapsedButton: "#455a64",
      colorTextCollapsedButton: "#fff",
      colorTextMenuSelected: "#fff",
      colorTextMenuSecondary: "#fff",
      colorMenuItemDivider: "#ffffff5e",
      // colorTextMenuItemHover: "#fff",
      colorBgMenuItemSelected: "#ffffff5e",
    },
  },

  // siderMenuType: "group",
  menu: {
    collapsedShowGroupTitle: true,
  },
  fixSiderbar: true,
  // layout: "side",
  // splitMenus: true,
} as ProLayoutProps;
