import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Divider, Form } from "antd";
import { PlayCircleOutlined, StarOutlined } from "@ant-design/icons";

import classNames from "class-names";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";

import "./queryinput.scss";
import Saved from "./SavedQuerries";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoading, sendSQLRequest } from "../redux/querries/querySlice";
import { saveModalOpened } from "../redux/saved/savedSlice";
import { updateTab } from "../redux/tabs/tabslice";

const QueryInput = ({ id, title, preffilledQuery }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [hasFilled, setHasFilled] = useState(preffilledQuery);

  const isLoading = useSelector((state) => getIsLoading(state, id));

  const onFinish = ({ query }) => {
    const isLarge = title ? title.includes("large") : false;
    const isError = title ? title.includes("error") : false;

    dispatch(sendSQLRequest({ query, title, isLarge, isError, id }));
  };
  const onChangeQuery = () => {
    setHasFilled(true);
  };
  const onSaveClick = () => {
    form
      .validateFields()
      .then(({ query }) => {
        dispatch(saveModalOpened({ query, tabId: id }));
      })
      .catch(() => {});
  };

  const onSelectedQuery = ({ query, newTitle }) => {
    form.setFieldValue("query", query);
    setHasFilled(true);
    dispatch(updateTab({ id, query, title: newTitle }));
  };

  return (
    <section
      id="query-input"
      className={classNames("query-input", {
        "query-input--is-empty": !hasFilled,
      })}
    >
      <div className="query-input__new-query">
        <Form
          name="basic"
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            query: preffilledQuery,
          }}
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Title level={3} className="">
            Enter you Query
          </Title>
          <Form.Item
            label="Query"
            name="query"
            rules={[
              {
                required: true,
                message: "please enter the query!",
              },
            ]}
          >
            <TextArea
              rows="5"
              placeholder="SELECT * FROM ...."
              onChange={onChangeQuery}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              icon={<PlayCircleOutlined />}
            >
              Run
            </Button>
            <Button
              htmlType="button"
              onClick={onSaveClick}
              icon={<StarOutlined />}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="query-input__saved-querries">
        <Divider type="vertical" />
        <div className="query-input__saved-querries-inner">
          <Title level={3} className="">
            Or pick from the Saved queries
          </Title>
          <Saved onSelectedQuery={onSelectedQuery} />
        </div>
      </div>
    </section>
  );
};
QueryInput.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  preffilledQuery: PropTypes.string.isRequired,
};

export default QueryInput;
