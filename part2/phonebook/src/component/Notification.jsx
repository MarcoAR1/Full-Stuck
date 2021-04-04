import React from "react";
import "../style/Notification.css";

const Notification = ({ message = "", error = false }) => {
  return (
    <>
      {message ? (
        <div className={error ? "error" : "success"}>{message}</div>
      ) : (
        ""
      )}
    </>
  );
};

export default Notification;
