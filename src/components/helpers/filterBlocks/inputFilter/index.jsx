import React, { Component } from "react";
//-------------
import { Icon, Form, Input } from "semantic-ui-react";
import "./inputFilter.css";
//-------------

class InputFilter extends Component {
  render() {
    let { type, placeholder, propsId, onLoad, onChangeFilter } = this.props;

    return (
      <div className="inputFilterBlock">
        <Form onSubmit={() => onLoad(true)}>
          <Input
            icon
            placeholder={placeholder}
            value={propsId}
            onChange={e => onChangeFilter(type, e.target.value, false, true)}
          >
            <input />
            <Icon
              name="times"
              size="large"
              link
              onClick={() => {
                onChangeFilter(type, null, true);
              }}
            />
          </Input>
        </Form>
      </div>
    );
  }
}

export default InputFilter;
