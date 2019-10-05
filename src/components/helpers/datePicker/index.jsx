import React, { Component } from "react";
//-------------
import { Input } from "semantic-ui-react";
//-------------
import Datetime from "react-datetime";
import moment from "moment";
//-------------

class DateTime extends Component {
  renderInput = props => {
    let { placeholder, label, labelPosition } = this.props;

    return (
      <Input
        fluid
        placeholder={placeholder}
        {...props}
        type="text"
        label={label}
        labelPosition={labelPosition}
      >
        <input />
      </Input>
    );
  };

  render() {
    let { value, fieldName, onChangeDate } = this.props;

    return (
      <Datetime
        dateFormat="YYYY-MM-DD"
        timeFormat={false}
        renderInput={this.renderInput}
        value={moment(value)}
        onChange={date => {
          onChangeDate(fieldName, moment(date._d).format("YYYY-MM-DD"));
        }}
      />
    );
  }
}

export default DateTime;
