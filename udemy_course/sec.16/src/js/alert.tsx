import * as React from "react";

const Alert: React.FC<{ message: string }> = ({message}) => {
	return(
		<div style={{ color: "#fff", background: "red" }}>{message}</div>
	)
}

export default Alert;