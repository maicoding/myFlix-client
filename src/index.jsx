import React from "react";
import ReactDOM from "react-dom";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const d1 = new Date().getDate();
console.log(d1); // 👉️ 16

const d2 = new Date("July 27, 22 09:27:18").getDate();
console.log(d2); // 👉️ 24

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
