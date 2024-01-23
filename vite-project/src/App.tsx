import { App } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";

import dayjs from "dayjs";
import "dayjs/locale/vi";

import NotFound from "./pages/404";
import { routes } from "./config/route";

dayjs.locale("vi");

function MyApp() {
  const router = createBrowserRouter(routes);

  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: "rgb(238, 130, 238)",
          colorLink: "rgb(238, 130, 238)",
        },
      }}
    >
      <App>
        <RouterProvider router={router} fallbackElement={<NotFound />} />
      </App>
    </ConfigProvider>
  );
}

export default MyApp;
