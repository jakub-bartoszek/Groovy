import React from "react";
import { Recommendations } from "../components/Recommendations";
import useAuth from "../utils/useAuth";

const DashBoard = ({code}) => {
	const accessToken = useAuth(code);
	return <div>{code}</div>;
};

export default DashBoard;
