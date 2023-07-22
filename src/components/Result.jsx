import React from "react";
import { Alert, Button, Spin, Table } from "antd";
import PropTypes from "prop-types";
import Title from "antd/es/typography/Title";
import { Empty } from "antd";

import "./result.scss";
import { useSelector } from "react-redux";
import {
  getError,
  getFormattedData,
  getIsLoading,
  getResult,
  getTimeTaken,
} from "../redux/querries/querySlice";
import { unparse } from "papaparse";

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
const Result = ({ id, title }) => {
  const isLoading = useSelector((state) => getIsLoading(state, id));
  const result = useSelector((state) => getResult(state, id));
  const timeTaken = useSelector((state) => getTimeTaken(state, id));
  const error = useSelector((state) => getError(state, id));
  const data = useSelector((state) => getFormattedData(state, id));
  const downloadJSON = () => {
    const JSONText = JSON.stringify(data);
    download(title + ".json", JSONText);
  };
  const downloadCSV = () => {
    const csvText = unparse(result);
    download(title + ".csv", csvText);
  };
  return (
    <section className="result">
      <Title level={3}>Result</Title>
      {timeTaken && (
        <p>
          Time taken: {parseInt(timeTaken)}ms{" "}
          {result && (
            <>
              <Button onClick={downloadJSON}>Download JSON</Button>{" "}
              <Button onClick={downloadCSV}>Download CSV</Button>{" "}
            </>
          )}
        </p>
      )}
      {isLoading && (
        <div className="result__loader">
          <Spin />
        </div>
      )}
      {error && (
        <Alert message="Error!" description={error} type="error" showIcon />
      )}

      {!result && !isLoading && !error && (
        <Empty description="Wow so lonely here! please run a query" />
      )}

      {result && (
        <Table
          scroll={{ x: "100%" }}
          columns={data.columns}
          dataSource={data.data}
        />
      )}
    </section>
  );
};
Result.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
export default Result;
