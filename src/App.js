import React, { Component } from "react";

const url =
  "https://mate-academy.github.io/phone-catalogue-static/phones/phones.json";

class App extends Component {
  state = {
    phones: [],
    filteredItems: [],
    isQuery: ""
  };

  async componentDidMount() {
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      phones: data
    });
  }

  handleFilter(value, query) {
    let { isQuery, phones, filteredItems } = this.state;

    let filteredPhones = [];

    isQuery = !query ? isQuery : query;

    if (isQuery) {
      filteredPhones = phones.filter(phone => {
        return phone.name.toLowerCase().includes(isQuery);
      });
    }

    const phonesArr = isQuery !== "" ? filteredPhones : phones;

    if (value === "age") {
      filteredPhones = phonesArr.sort((a, b) => {
        return a.age - b.age;
      });
    } else if (value === "name") {
      filteredPhones = phonesArr.sort((a, b) => a.name.localeCompare(b.name));
    }

    this.setState({
      filteredItems: filteredPhones,
      isQuery
    });
  }

  render() {
    const { phones, filteredItems, isQuery } = this.state;

    return phones
      ? this.renderData(phones, filteredItems, isQuery)
      : this.renderLoading();
  }

  renderData(phones, filteredItems, isQuery) {
    console.log(isQuery);
    phones = isQuery || filteredItems.length ? filteredItems : phones;
    return (
      <>
        <div className="clearfix">
          <input
            className="Query"
            type="text"
            onChange={event => {
              this.handleFilter("query", event.target.value);
            }}
            defaultChecked
          />
        </div>
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
            {phones && phones.length ? (
              phones.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.snippet}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }
  renderLoading() {
    return <div>Loading...</div>;
  }
}

export default App;
