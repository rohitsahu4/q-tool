import React, { useMemo } from "react";
import { Tabs } from "antd";
import { Content } from "antd/es/layout/layout";
import "./querries.scss";
import Query from "./Query";
import { useDispatch, useSelector } from "react-redux";
import useKeyboardShortcut from "use-keyboard-shortcut";

import {
  changedTab,
  getActiveTabKey,
  getAllTabs,
  newTabAdded,
  nextTab,
  previousTab,
  removedTab,
} from "../redux/tabs/tabslice";

const Querries = () => {
  const dispatch = useDispatch();
  const tabs = useSelector(getAllTabs);
  const activeTabKey = useSelector(getActiveTabKey);
  const onChange = (newActiveKey) => {
    dispatch(changedTab(newActiveKey));
  };
  const add = () => {
    dispatch(newTabAdded({}));
  };
  useKeyboardShortcut(["Tab", "ArrowRight"], () => {
    dispatch(nextTab());
  });
  useKeyboardShortcut(["Tab", "ArrowLeft"], () => {
    dispatch(previousTab());
  });

  const remove = (targetKey) => {
    dispatch(removedTab(targetKey));
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };
  const tabItems = useMemo(() => {
    return tabs.map((tab) => ({
      ...tab,
      children: <Query {...tab} />,
      key: tab.id,
      label: tab.title,
    }));
  }, [tabs]);

  return (
    <Content className="querries">
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeTabKey}
        onEdit={onEdit}
        items={tabItems}
      />
    </Content>
  );
};
export default Querries;
