import Sider from "antd/es/layout/Sider";
import { CloseOutlined, HistoryOutlined, StarFilled } from "@ant-design/icons";

import "./sidebar.scss";
import { Button, Tabs, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsSidebarOpen,
  sidebarVisibilityChanged,
} from "../redux/querries/querySlice";
import History from "./History";
import Saved from "./SavedQuerries";

const items = [
  {
    key: "1",
    label: (
      <span>
        <HistoryOutlined />
        History
      </span>
    ),
    children: <History />,
  },
  {
    key: "2",
    label: (
      <span>
        <StarFilled />
        Saved
      </span>
    ),
    children: <Saved />,
  },
];
const Sidebar = () => {
  const isSidebarOpen = useSelector(getIsSidebarOpen);
  const dispatch = useDispatch();
  const closeSidebar = () => {
    dispatch(sidebarVisibilityChanged(false));
  };
  return (
    <Sider
      className="sidebar"
      collapsible
      width={400}
      collapsed={!isSidebarOpen}
      onCollapse={(val) => dispatch(sidebarVisibilityChanged(val))}
      collapsedWidth={0}
      zeroWidthTriggerStyle={{ display: "none" }}
    >
      <div className="sidebar--header">
        <Tabs defaultActiveKey="1" tabBarGutter={0} items={items} />

        <Tooltip title="Close sidebar">
          <Button
            icon={<CloseOutlined />}
            onClick={closeSidebar}
            aria-label="close sidebar"
            type="link"
            className="sidebar__close-button"
          />
        </Tooltip>
      </div>
    </Sider>
  );
};
export default Sidebar;
