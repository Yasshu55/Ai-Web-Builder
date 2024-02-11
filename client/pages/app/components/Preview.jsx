import React from "react";

const Preview = (props) => {
  const {previewContent} = props;
  return (
    <>
      <iframe
        className="overflow:hidden;height:100%;width:100% "
        id="preview"
        height="100%"
        width="100%"
        srcDoc = {previewContent}
      ></iframe>
    </>
  );
};

export default Preview;
