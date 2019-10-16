import React, { Component } from 'react';
import { Provider } from './Context';
import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';

class App extends Component {
  state = {
    players: [
      {
        name: "Kithu",
        score: 0,
        id: 1
      },
      {
        name: "Waweru",
        score: 0,
        id: 2
      },
      {
        name: "Njiru",
        score: 0,
        id: 3
      },
      {
        name: "James",
        score: 0,
        id: 4
      }
    ]
  };

  // player id counter
  prevPlayerId = 4;

  handleScoreChange = (index, diff) => {
    this.setState( prevState => {
      // copy the previous players state
      const updatedPlayers = [ ...prevState.players ];
      // copy the target player object
      const updatedPlayer = { ...updatedPlayers[index] };
      // update the target players's score
      updatedPlayer.score += diff;
      // update the players array with the target player's latest score
      updatedPlayers[index] = updatedPlayer;
      //update the players state without mutating the original state
      return {
        players: updatedPlayers
      }
    });
  }

  handleAddPlayer = (name) => {
    let newPlayer = {
      name,
      score: 0,
      id: this.prevPlayerId +=1
    }
    this.setState( prevState => ({
      ...prevState.players,
      Players: prevState.players.concat(newPlayer)
    }));
    this.setState( prevState => {
      return {
        players: [
          ...prevState.players,
          {
            name,
            score: 0,
            id: this.prevPlayerId += 1
          }
        ]
      };
    });
  }

  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter(p => p.id !== id)
      };
    });
  }

  getHighScore = () => {
    const scores = this.state.players.map( p => p.score );
    const highScore = Math.max(...scores);
    if (highScore) {
      return highScore;
    }
    return null;
  }

  render() {
    const highScore = this.getHighScore();

    return (
      <Provider value={{
        players: this.state.players,
        actions: {
          changeScore: this.handleScoreChange,
          removePlayer: this.handleRemovePlayer,
          addPlayer: this.handleAddPlayer
        }
      }}>
        <div className="scoreboard">
          <Header
            title="Scoreboard"
          />

          {/* Players list */}
          {this.state.players.map( (player, index) =>
            <Player
              name={player.name}
              score={player.score}
              index={index}
              id={player.id}
              key={player.id.toString()}
              isHighScore={highScore === player.score}
            />
          )}

          <AddPlayerForm />
        </div>
      </Provider>
    );
  }
}

export default App;
