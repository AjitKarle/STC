import React, { Component } from 'react';

class SearchLogic extends Component {
  state = {
    query: "",
    data: [],
    filteredData: []
  };

  handleInputChange = event => {
    const query = event.target.value;
      var newData = this.getData();
    this.setState({
            filteredData: newData
        });
  };

  getData = () => {
      return [1, 2, 3, 4, 5, 6, 7];  // call required function here!
  };

  componentWillMount() {
    this.getData();
  }

  render() {
    return (
      <div className="searchForm">
        <form>
          <input
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
        <div>{this.state.filteredData.map(i => <p>{i.name}</p>)}</div>
      </div>
    );
  }
}

export default SearchLogic;