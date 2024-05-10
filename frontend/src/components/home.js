import React from "react";
import "./home.css";
import Login from "./login";

const Home = () => {
  const [username, setUsername] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [clicked, setClicked] = React.useState(false);

  const join = () => {
    setClicked(!clicked);
  };

  return (
    <div className="container">
      <h1 className="p-3">
        <strong>
          <span style={{ color: "blue" }}>B</span>Chat
        </strong>{" "}
        A Multi Room Chat Application
      </h1>
      <header className="App-header">
        <div className="element d-flex flex-column">
          <h3 className="pb-3 pt-0">Join Room</h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Username (required)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Room (default: #general)"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <div
            className={`btn btn-primary ${clicked ? "pressed" : "notpressed"}`}
            role="button"
            style={{
              cursor: "pointer",
              backgroundColor: clicked ? "#0056b3" : "#007bff", // Change background color based on state
              padding: "10px 20px", // Padding for the button
              color: "#ffffff", // White color for the text
              border: "none", // No border
              borderRadius: "5px", // Rounded corners
              fontSize: "18px", // Font size
            }}
            onClick={join}
          >
            Join
          </div>
        </div>
        <Login />
      </header>
    </div>
  );
};

export default Home;
