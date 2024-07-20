import React from "react";
import { useParams } from "react-router-dom";

const DeviceDetail = () => {
  const { id } = useParams();
  return <div>DeviceDetail {id}</div>;
};

export default DeviceDetail;
