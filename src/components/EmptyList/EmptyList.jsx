import React from "react";

const EmptyList = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>Empty list</h3>
      <img style={{width: "200px"}} src={require("../../resource/image/giphy.gif")} alt="my-gif" />
    </div>
  );
};

export default EmptyList;
