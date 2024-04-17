import { ProConfigProvider, ProLayout } from "@ant-design/pro-components";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import MenuFooter from "../components/MenuFooter";
import { layoutConfig } from "../config/layout";
import { defaultRouter, workplace } from "../config/route";
import ProfileAccount from "../pages/ProfileUser/ProfileAccount";
import { useContext, useEffect } from "react";
import { MasterDataFilterApi } from "../service/api";
import { AppContext } from "../context/AppProvider";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const getMasterData = async () => {
      const res = await MasterDataFilterApi("role");
      // console.log("res:: ", res);
      dispatch({
        payload: {
          listRole: res,
        },
        type: "setListRole",
      });
    };

    getMasterData();
  }, []);

  const goTo = (pathName: string) => {
    const pathRouter = defaultRouter?.[pathName] || pathName;
    navigate(pathRouter);
  };

  return (
    <ProConfigProvider hashed={false}>
      <ProLayout
        {...layoutConfig}
        title=""
        route={{
          routes: workplace.children,
        }}
        location={{
          pathname,
        }}
        avatarProps={{
          render(props, defaultDom) {
            return <ProfileAccount defaultDom={defaultDom} />;
          },
          size: "large",
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
        }}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return <MenuFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              goTo(item.path || "/");
            }}
          >
            {dom}
          </div>
        )}
      >
        <Outlet />
      </ProLayout>
    </ProConfigProvider>
  );
};

export default Layout;
