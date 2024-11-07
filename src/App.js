import React from "react";
import Tasks from "./Tasks";
import { Paper, Button } from "@material-ui/core";
import "./App.css";

class App extends React.Component {
    render() {
        return (
            <div className="App flex">
                <Tasks />
            </div>
        );
    }
}

export default App;

