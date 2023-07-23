import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import * as PropTypes from "prop-types";
import { CopyTwoTone, CheckCircleOutlined } from "@ant-design/icons";

const Copy = ({ text }) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const onClick = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);

    setIsLinkCopied(true);
  };
  useEffect(() => {
    if (isLinkCopied)
      setTimeout(() => {
        setIsLinkCopied(false);
      }, 5000);
  }, [isLinkCopied]);
  return (
    <span>
      {text}

      {isLinkCopied ? (
        <Tooltip title="Copied">
          <CheckCircleOutlined style={{ color: "green", marginLeft: "4px" }} />
        </Tooltip>
      ) : (
        <Tooltip title="Click to copy">
          <Button
            size="small"
            type="link"
            onClick={onClick}
            icon={<CopyTwoTone />}
          />
        </Tooltip>
      )}
    </span>
  );
};
Copy.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Copy;
