import React from "react";
import { NavLink } from "react-router-dom";

import Select from "./components/Select";
import config from "../config";

const DataTable = ({
  visibleItems,
  onHeaderClick,
  onHandleCheck,
  checkedItems,
  onMainCheck,
  filteredItems,
  showChecked,
  onShowAllChecked,
  perPage,
  onPerPageChange
}) => {
  return (
    <div className="Table-wrapper">
      <table className="table">
        <thead>
          <tr className="thead-dark Table__headers">
            <th>
              <input
                type="checkbox"
                checked={checkedItems.length === filteredItems.length}
                onChange={onMainCheck.bind(this)}
                name="main"
                value="main"
              />
            </th>
            {Object.keys(config).map(key => (
              <th
                key={key}
                className={config[key].isSortable && "Table__sorting"}
                onClick={
                  config[key].isSortable ? () => onHeaderClick(key) : null
                }
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleItems.map(item => {
            return (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item.id)}
                    onChange={onHandleCheck.bind(this)}
                    name={item.id}
                    value={item.id}
                  />
                </td>
                {Object.keys(config).map(key => {
                  if (key === "name") {
                    return (
                      <td key={key}>
                        <NavLink to={`/${item.id}`}>{item[key]}</NavLink>
                      </td>
                    );
                  }

                  return <td key={key}>{item[key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="CheckAll__btn" onClick={onShowAllChecked.bind(this)}>
        {showChecked ? "Show all" : "Show checked"}
      </button>
      <Select perPage={perPage} onPerPageChange={onPerPageChange.bind(this)} />
    </div>
  );
};

export default DataTable;
