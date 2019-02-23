import React, { Component } from 'react';
import fetch from 'unfetch';

function parseQuotes(text) {
  return text.replace(/[0-9]+-/gm, '').split('\n');
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      quotes: [],
      currentQuote: ""
    }
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  componentDidMount() {
    // load quotes
    fetch('/quotes.txt')
      .then(text => text.text())
      .then(text => parseQuotes(text))
      .then(text => this.setState({
        isLoading: false,
        quotes: text,
      }))
      .then(() => {
        this.getRandomQuote();
      })
  }

  getRandomQuote() {

    const { quotes } = this.state;
    this.setState({
      currentQuote: quotes[Math.floor(Math.random() * quotes.length)]
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoading ? <div>loading...</div> : <div>
          <p>{this.state.currentQuote}</p>
          <button onClick={this.getRandomQuote}>🎲</button>
        </div>}
      </div>
    );
  }
}

export default App;
