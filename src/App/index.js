import React from "react";
import { Route } from "react-router-dom";

import debounce from "lodash/debounce";

import { getAll } from "../Api";

import Pagination from "./components/Pagination";
import Search from "./components/Search";
import Select from "./components/Select";
import DataTable from "./DataTable";
import Phone from "../Phone";

class App extends React.Component {
  state = {
    items: null,
    isLoading: false,
    sortColumn: null,
    sortAsc: true, // sorting
    perPage: 3, // pagination
    page: 1,
    query: "",
    visibleQuery: "",
    checkedItems: [],
    showChecked: false
  };

  async componentDidMount() {
    const phones = await getAll();
    this.setState({ items: phones, isLoaded: true });
  }

  //select
  handlePerPageChange = event => {
    this.setState({
      perPage: +event.target.value,
      page: 1,
      query: "",
      visibleQuery: ""
    });
  };

  // sorting works
  handleHeaderClick = key => {
    const { items, sortAsc } = this.state;
    let newPhones = [];

    const sign = sortAsc ? 1 : -1;
    const sortFn =
      typeof items[0][key] === "number"
        ? (a, b) => sign * (a[key] - b[key])
        : (a, b) => sign * a[key].localeCompare(b[key]);

    newPhones = [...items].sort(sortFn);

    this.setState({
      items: newPhones,
      sortAsc: !sortAsc
    });
  };

  // pagination
  handlePageChange = page => {
    this.setState({ page });
  };

  paginateItems = ({ items, perPage, page }) => {
    const start = (page - 1) * perPage; // 11
    const end = start + perPage;

    return items && items.slice(start, end);
  };

  //search
  handleChangeQuery = event => {
    this.setState({
      visibleQuery: event.target.value
    });
    this.updateQuery(event.target.value);
  };

  setParams({ query }) {
    const searchParams = new URLSearchParams();
    searchParams.set("query", query || "");
    return searchParams.toString();
  }

  updateQuery = debounce(query => {
    const url = this.setParams({ query });
    this.props.history.push(`?${url}`);

    if (!query) {
      window.history.replaceState({}, "", this.props.location.pathname);
    }

    this.setState({
      query,
      page: 1
    });
  }, 1000);

  // check
  handleCheck = event => {
    const { checkedItems } = this.state;
    const id = event.target.value;
    let newArr = [];
    if (checkedItems.includes(id)) {
      newArr = checkedItems.filter(item => item !== id);
    } else {
      newArr = [...checkedItems, id];
    }

    this.setState({
      checkedItems: newArr
    });
  };

  handleMainCheck = event => {
    const { items, query } = this.state;

    const filteredItems = items.filter(
      item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.snippet.toLowerCase().includes(query.toLowerCase())
    );

    let newArr = [];
    if (event.target.checked) {
      newArr = filteredItems.map(item => item.id);
    }
    this.setState({
      checkedItems: newArr,
      isMainChecked: event.target.checked
    });
  };

  handleShowAllChecked = () => {
    let { showChecked, query, visibleQuery } = this.state;

    if (showChecked) {
      query = "";
      visibleQuery = "";
    }

    this.setState({ showChecked: !showChecked, query, visibleQuery });
  };

  getfilteredItems = ({ items, query, showChecked }) => {
    const { checkedItems } = this.state;

    const filtered =
      items &&
      items.filter(
        item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.snippet.toLowerCase().includes(query.toLowerCase())
      );

    if (showChecked) {
      return filtered.filter(item => checkedItems.includes(item.id));
    }
    return filtered;
  };

  render() {
    const {
      isLoaded,
      perPage,
      items,
      page,
      query,
      visibleQuery,
      checkedItems,
      showChecked
    } = this.state;

    const filteredItems = this.getfilteredItems({
      items,
      query,
      showChecked
    });

    const visibleItems = this.paginateItems({
      items: filteredItems,
      perPage,
      page
    });

    return (
      <div className="App">
        {isLoaded && (
          <div className="clearfix">
            <div className="Catalog float-left">
              <Pagination
                isTop={true}
                count={isLoaded && filteredItems.length}
                onPageChange={this.handlePageChange}
                perPage={perPage}
                page={page}
                onPerPageChange={this.handlePerPageChange}
              />

              <DataTable
                visibleItems={visibleItems}
                checkedItems={checkedItems}
                filteredItems={filteredItems}
                showChecked={showChecked}
                perPage={perPage}
                onHandleCheck={this.handleCheck.bind(this)}
                onHeaderClick={this.handleHeaderClick.bind(this)}
                onMainCheck={this.handleMainCheck.bind(this)}
                onShowAllChecked={this.handleShowAllChecked.bind(this)}
                onPerPageChange={this.handlePerPageChange.bind(this)}
              />
              <Pagination
                isTop={false}
                count={isLoaded && filteredItems.length}
                onPageChange={this.handlePageChange}
                perPage={perPage}
                page={page}
                onPerPageChange={this.handlePerPageChange}
              />
              <Search
                onChangeQuery={this.handleChangeQuery}
                visibleQuery={visibleQuery}
              />
            </div>
            <Route path="/:phone" component={Phone} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
