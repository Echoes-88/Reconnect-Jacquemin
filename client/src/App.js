import React from "react";
import "./App.css";

// Components
import Home from "./Home";
import LoginForm from "./LoginForm";


// Router
const showHome = () => {
    if (window.location.pathname === "/") {
      return <Home />
    }
  }

const showLoginForm = () => {
    if (window.location.pathname === "/login") {
      return <LoginForm />
    }
  }

// App
function App(props) {

    return (
        <div className="App">
            <header className="App-header">
                {showHome()}
                {showLoginForm()}
            </header>
        </div>
    );
}

export default App;
