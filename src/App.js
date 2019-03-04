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

  render() {
    const { phones } = this.state;

    return phones ? this.renderData(phones) : this.renderLoading();
  }

  renderData(phones) {
    // console.log(this.state.phones);
    if (phones && phones.length) {
      return (
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
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
