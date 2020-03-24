import React, { Component } from "react";
import { Label, Select, SelectBox } from "../../Style/form";
import { ReactComponent as CaretSymbol } from "../assets/caret.svg";

class CalculatorInput extends Component {
  render() {
    const { name, label, options, attributes, callback } = this.props;

    return (
      <Label>
        <span>{label}</span>
        <SelectBox>
          <Select name={name} onChange={callback} {...attributes}>
            {Object.entries(options).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </Select>
          <CaretSymbol />
        </SelectBox>
      </Label>
    );
  }
}

export default CalculatorInput;
