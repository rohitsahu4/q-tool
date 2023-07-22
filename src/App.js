import { Button, Layout, Tooltip } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Sidebar from "./components/Sidebar";
import Querries from "./components/Querries";

import "./App.scss";
import { Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsSidebarOpen,
  sidebarVisibilityChanged,
} from "./redux/querries/querySlice";
import SaveModal from "./components/SaveModal";

function App() {
  const isSidebarOpen = useSelector(getIsSidebarOpen);
  const dispatch = useDispatch();
  const openSidebar = () => {
    dispatch(sidebarVisibilityChanged(true));
  };
  return (
    <Layout className="homepage">
      <SaveModal />
      <Sidebar />
      <Layout>
        <Header className="homepage__header">
          {!isSidebarOpen && (
            <Tooltip title="Open sidebar">
              <Button
                icon={<MenuOutlined />}
                size="large"
                type="link"
                aria-label="open sidebar"
                onClick={openSidebar}
              />
            </Tooltip>
          )}
          <h1 className="homepage__title">Query tool</h1>
        </Header>
        <Querries />
      </Layout>
    </Layout>
  );
}

export default App;
