import React, { Component } from 'react';
import fetch from 'unfetch';
import styled, {css} from 'styled-components';
import Lockr from 'lockr';

function parseQuotes(text) {
  return text.replace(/[0-9]+-/gm, '').split('\n');
}
const AppStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: #fff;
  background: var(--bg-color);
  color: #000;
  color: var(--fg-color);

  div {
    flex: 1;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${props => (props.theme === "dark") && css`
    --bg-color: #101010;
    --fg-color: #fff;
    --border-color: #2f2f2f;
  ` }
`

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #eeeeee;
  border-color: var(--border-color);
  font-size: 2rem;
  align-items: center;

  h1 {
    font-size: 2rem;
    text-transform: uppercase;
  }
  a {
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
  }
  .themeIcon {
    padding-right: 2rem;
    margin-right: 2rem;
    border-right: 2px solid #eee;
    border-color: var(--border-color);    
    cursor: pointer;
    user-select: none;
  }

  @media(max-width: 500px) {
    h1, a {
      font-size: 1.5rem;
    }
  }
`

const FooterStyled = styled.footer`
  border-top: 2px solid #eeeeee;
  border-color: var(--border-color);
  margin: 2rem;
  margin-top: 0;
  font-size: 1rem;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  letter-spacing: 0em;

`

const ButtonStyled = styled.button`
  margin: 2rem;
  background: #fff;
  background: var(--bg-color);
  border: none;
  font-size: 8rem;
  padding: 8rem;
  outline: none;
  cursor: pointer;

  &:active {
    background: rgba(0,0,0, 0.5);
  }
`

const QuoteNumber = styled.p`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 4rem;
  @media(max-width: 900px) {
    font-size: 1.5rem;
  }
`

const QuoteText = styled.blockquote`
  text-align: center;
  font-size: 4rem;
  max-width: 700px;
  padding: 0 2rem;
  @media(max-width: 900px) {
    font-size: 2rem;
  }
`
const QuoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.04em;
`

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      quotes: [],
      currentQuote: '',
      currentQuoteId: '',
      theme: 'dark',
    }
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.toggleTheme    = this.toggleTheme.bind(this);

  }

  componentWillMount() {
    if (Lockr.get('theme')) {
      this.setState({
        theme: Lockr.get('theme')
      })
    }
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
    const id = Math.floor(Math.random() * quotes.length);

    this.setState({
      currentQuote: quotes[id],
      currentQuoteId: id.toString(),
    })
  }

  toggleTheme(e) {
    e.preventDefault();
    
    const theme = (this.state.theme === "light" ? 'dark' : 'light');

    this.setState({
      theme
    });

    Lockr.set('theme', theme);
  }

  render() {
    const { isLoading, currentQuoteId, currentQuote, theme} = this.state;

    return (
      <AppStyled theme={theme}>
        {isLoading ? <div className="loading">loading...</div> : <React.Fragment>
          <HeaderStyled>
            <h1>Ryanemzed Quotes</h1>
            <span>
              <a href="#" className="themeIcon" onClick={this.toggleTheme}>{(theme === "light" ? '🌚' : '🌝')}</a>
              <a href="https://www.twitch.tv/ryanemzed">Twitch &rarr;</a>
            </span>
          </HeaderStyled>
          <QuoteWrapper>
            <QuoteNumber>Quote #{currentQuoteId}</QuoteNumber>
            <QuoteText>{currentQuote}</QuoteText>
          </QuoteWrapper>
          <ButtonStyled onClick={this.getRandomQuote}>🎲</ButtonStyled>
          <FooterStyled>
            <span>© {new Date().getFullYear()}</span>
            <span>View on <a href="https://github.com/alachie/ryan-quotes" target="_blank" rel="noopener noreferrer" >GitHub</a></span>
          </FooterStyled>
        </React.Fragment>}
      </AppStyled>
    );
  }
}

export default App;
