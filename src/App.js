import React from 'react';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { API } from 'aws-amplify';
import logo from './logo.svg';
import './App.css';

Amplify.configure(config);

class App extends React.Component {
  state = { pets: [],
  people: [] }

  getPeople = async() => {
    try {
      const data = await API.get('amplifywebrestapi', '/people')
      console.log('data from new people endpoint:', data)
      this.setState({ people: data.people })
    } catch (err) {
      console.log('error fetching data..', err)
    }
  }
  
  getData = async() => {
    try {
      const data = await API.get('amplifywebrestapi', '/pets')
      console.log('data from Lambda REST API: ', data)
      this.setState({ pets: data.pets })
    } catch (err) {
      console.log('error fetching data..', err)
    }
  }
  
  async componentDidMount() {
    console.log("IN componentDidMount");
    this.getData();
    this.getPeople() // new
  }

  render() {
    return (
      // existing code
      <div className="App">
        <h2>Pets</h2>
        {
          this.state.pets.map((p, i) => (
            <p key={i}>{p}</p>
          ))
        }
        <h2>People</h2>
        {
          this.state.people.map((p, i) => (
            <p key={i}>{p.name}</p>
          ))
        }
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default withAuthenticator(App, { includeGreetings: true });
