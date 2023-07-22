import { Divider } from "antd";
import PropTypes from "prop-types";
import QueryInput from "./QueryInput";
import "./query.scss";
import Result from "./Result";

const Query = ({ id, title, query: preffilledQuery }) => {
  return (
    <div className="query">
      <div>
        <QueryInput id={id} title={title} preffilledQuery={preffilledQuery} />
      </div>
      <Divider className="query__divider" />
      <Result id={id} title={title} />
    </div>
  );
};
Query.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};
export default Query;
