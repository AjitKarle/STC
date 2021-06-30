import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Nav';
// import assignments from './studyTable';
import Home from './Home';
import SearchLogic from './SearchLogic';

// import mintNft from './MintNft';
// import Marketplace from './Marketplace';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      account: null
    };
  }

  async componentDidMount() {
    this.setState({ account: (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0] });
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <SearchLogic></SearchLogic>
        <Router>
          <Route path="/" exact component={Home} />
          {/*<Route path="/assignments" exact component={studyTable} />
          <Route path="/mintNft" exact component={mintNft} />
          <Route path="/market" exact component={Marketplace} />*/}
        </Router>
      </div>
    );
  }
}

export default App;
