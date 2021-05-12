import react from "react";
import icon from "../images/piggy-bank.svg";

const Home = () => {
  return (
    <div className="home">
      <div className="description">
        <h1>Welcome to Online Banking Application</h1>
        <p>This is My Banking application for task 1 of web development <br/> for GRIP under The Sparks Foudation</p>
      </div>
      <div className="img">
        <img height = {300}src={icon} alt="icon"/>
      </div>
    </div>
  );
};

export default Home;
