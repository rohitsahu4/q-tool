import { Button, Input, List, Tooltip } from "antd";
import {
  PlayCircleOutlined,
  StarOutlined,
  FieldTimeOutlined,
  ClockCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useMemo, useRef, useState } from "react";

import "./history.scss";
import useKeyboardShortcut from "use-keyboard-shortcut";

import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../redux/history/historySlice";
import { saveModalOpened } from "../redux/saved/savedSlice";
import { openPreffiledTab } from "../redux/querries/querySlice";

const History = () => {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const history = useSelector((state) => getHistory(state));
  const [searchTerm, setSearchTerm] = useState("");

  useKeyboardShortcut(["Control", "f"], () => searchRef.current.focus(), {});

  const filteredQuerries = useMemo(() => {
    return history.filter((query) => {
      return (
        (query.title && query.title.includes(searchTerm)) ||
        query.query.includes(searchTerm)
      );
    });
  }, [history, searchTerm]);
  const onSaveQuery = (query) => {
    dispatch(saveModalOpened({ query: query.query, historyId: query.id }));
  };
  const onRunQuery = ({ query, title }) => {
    dispatch(openPreffiledTab({ query, title }));
  };
  return (
    <div className="history">
      <div className="history__search">
        <Input
          placeholder="Search querries"
          ref={searchRef}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          suffix={<SearchOutlined />}
        />
      </div>
      <List
        itemLayout="horizontal"
        size="small"
        dataSource={filteredQuerries}
        renderItem={(query) => {
          const hasTitle = !!query.title;
          const description = (
            <div>
              <em>{query.query}</em>
              <div>
                <FieldTimeOutlined />
                &nbsp; {parseInt(query.timeTaken)}ms &nbsp;|&nbsp;
                <ClockCircleOutlined />
                &nbsp;
                {new Date(query.time).toLocaleTimeString()}
              </div>
            </div>
          );
          return (
            <List.Item>
              <List.Item.Meta
                title={hasTitle && <strong>{query.title}</strong>}
                description={description}
              />
              <div>
                <Tooltip title="Run this query">
                  <Button
                    icon={<PlayCircleOutlined />}
                    onClick={() => {
                      onRunQuery(query);
                    }}
                    type="link"
                  />
                </Tooltip>
                <Tooltip title="Save">
                  <Button
                    icon={<StarOutlined />}
                    onClick={() => {
                      onSaveQuery(query);
                    }}
                    type="link"
                  />
                </Tooltip>
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};
export default History;
