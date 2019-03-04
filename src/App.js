import React, { Component } from "react";

const url =
  "https://mate-academy.github.io/phone-catalogue-static/phones/phones.json";

class App extends Component {
  state = {
    phones: []
  };

  async componentDidMount() {
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      phones: data
    });
  }

  handleFilter(value) {
    const { phones } = this.state;
    let filteredPhones = [];

    if (value === "age") {
      filteredPhones = phones.sort((a, b) => {
        return a.age - b.age;
      });
    } else {
      filteredPhones = phones.sort((a, b) => a.name.localeCompare(b.name));
    }
    this.setState({
      phones: filteredPhones
    });
  }

  render() {
    const { phones } = this.state;

    return phones ? this.renderData(phones) : this.renderLoading();
  }

  renderData(phones) {
    if (phones && phones.length) {
      return (
        <table>
          <thead>
            <tr>
              <th onClick={() => this.handleFilter("name")}>
                <span className="Filter">name</span>
              </th>
              <th className="Filter" onClick={() => this.handleFilter("age")}>
                <span className="Filter">age</span>
              </th>
              <th>snippet</th>
            </tr>
          </thead>
          <tbody>
            {phones.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.snippet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return <div>No items found</div>;
    }
  }
  renderLoading() {
    return <div>Loading...</div>;
  }
}

export default App;
