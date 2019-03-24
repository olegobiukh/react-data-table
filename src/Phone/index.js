import React, { Component } from "react";

import { getCurrentPhone } from "../Api";

class Phone extends Component {
  state = {
    phone: "",
    data: null
  };

  componentDidMount() {
    this.updatePhone();
  }

  componentDidUpdate() {
    this.updatePhone();
  }

  async updatePhone() {
    const { phone } = this.props.match.params || "";
    const { location } = this.props;

    location.pathname = "";

    if (phone === this.state.phone) {
      return;
    }

    const data = await getCurrentPhone(phone);
    if (this.state.phone === data.id) {
      return;
    }

    this.setState({
      phone,
      data
    });
  }

  render() {
    const { data } = this.state;

    const { name, images, hardware, display, battery, android } = data || "";

    if (data) {
      return (
        <div className="Details float-right">
          <img src={"../" + images[0]} alt={name} />

          <p>
            <span className="Details__title">Name:</span> {name}
          </p>
          <p>
            <span className="Details__title">OS:</span> {android.os}
          </p>
          <p>
            <span className="Details__title">CPU:</span> {hardware.cpu}
          </p>
          <p>
            <span className="Details__title">Screen size:</span>{" "}
            {display.screenSize}
          </p>
          <p>
            <span className="Details__title">Touchscreen:</span>{" "}
            {display.touchScreen ? "Yep" : "Nope"}
          </p>
          <p>
            <span className="Details__title">Battary:</span> {battery.type}
          </p>
        </div>
      );
    } else {
      return <div>Pick a phone</div>;
    }
  }
}

export default Phone;
