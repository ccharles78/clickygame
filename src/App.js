//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import sharkCard from "./components/sharkCard";
import Footer from "./components/Footer";
import sharks from "./sharks.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    sharks,
    clickedsharks: [],
    score: 0
  };

//when you click on a card ... the sharks is taken out of the array
  imageClick = event => {
    const currentsharks = event.target.alt;
    const sharksAlreadyClicked =
      this.state.clickedsharks.indexOf(currentsharks) > -1;

//if you click on a sharks that has already been selected, the game is reset and cards reordered
    if (sharksAlreadyClicked) {
      this.setState({
        sharks: this.state.sharks.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedsharks: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available sharks, your score is increased and cards reordered
    } else {
      this.setState(
        {
          sharks: this.state.sharks.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedsharks: this.state.clickedsharks.concat(
            currentsharks
          ),
          score: this.state.score + 1
        },
//if you get all 12 sharks corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              sharks: this.state.sharks.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedsharks: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, sharkcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.sharks.map(sharks => (
            <sharkCard
              imageClick={this.imageClick}
              id={sharks.id}
              key={sharks.id}
              image={sharks.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;