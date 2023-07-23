import { Button, Input, List, Tooltip } from "antd";
import {
  PlayCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import React, { useMemo, useRef, useState } from "react";
import useKeyboardShortcut from "use-keyboard-shortcut";

import "./saved.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSaved, removedQuery } from "../redux/saved/savedSlice";
import { openPreffiledTab } from "../redux/querries/querySlice";
import Copy from "./Copy";

const Saved = ({ onSelectedQuery }) => {
  const dispatch = useDispatch();
  const savedQuerries = useSelector(getSaved);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef();

  const filteredQuerries = useMemo(() => {
    return savedQuerries.filter((query) => {
      return (
        (query.title && query.title.includes(searchTerm)) ||
        query.query.includes(searchTerm)
      );
    });
  }, [savedQuerries, searchTerm]);
  useKeyboardShortcut(
    ["Control", "f"],
    () => {
      if (!onSelectedQuery) searchRef.current.focus();
    },
    {}
  );

  const onRemoveQuery = (query) => {
    dispatch(removedQuery({ id: query.id }));
  };
  const onRunQuery = ({ query, title }) => {
    if (onSelectedQuery) {
      onSelectedQuery({ query, title });
    } else {
      dispatch(openPreffiledTab({ query, title }));
    }
  };
  return (
    <div className="saved">
      <div className="saved__search">
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
          const description = (
            <div>
              <em>
                <Copy text={query.query} />
              </em>
            </div>
          );
          return (
            <List.Item>
              <List.Item.Meta
                title={<strong>{query.title}</strong>}
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
                <Tooltip title="Remove">
                  <Button
                    icon={<MinusCircleOutlined />}
                    onClick={() => {
                      onRemoveQuery(query);
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
export default Saved;
Saved.propTypes = {
  onSelectedQuery: PropTypes.func.isRequired,
};
