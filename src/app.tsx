import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/app";
ReactDOM.render(
    <App radius={50} fill="red" teeth={15} infinite={false}></App>,
    document.getElementById('app'));