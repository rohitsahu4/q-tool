import { Button, Layout, Tooltip } from "antd";
import { MenuOutlined, InfoCircleOutlined } from "@ant-design/icons";
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
          <Tooltip
            title={
              <div>
                <strong> Control + f </strong>: Find <br />
                <strong> Tab + Right/Left Arrrow </strong>: Switch Tabs
              </div>
            }
          >
            <h5 className="homepage__keyboard-shortcuts">
              <InfoCircleOutlined /> Keyboard shortcuts
            </h5>
          </Tooltip>
        </Header>
        <Querries />
      </Layout>
    </Layout>
  );
}

export default App;
