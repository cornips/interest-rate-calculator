import React, { Component } from "react";
import { Label, Input } from "../../Style/form";

class CalculatorInput extends Component {
  render() {
    const { name, label, type, attributes, icon, callback } = this.props;

    const iconObject = () => (icon ? icon : null);
    const input = (
      <Input name={name} type={type} onChange={callback} {...attributes} />
    );
    let inputGroup;
    if (icon)
      inputGroup = (
        <div className="has-icon">
          {iconObject()}
          {input}
        </div>
      );
    else inputGroup = { input };

    return (
      <Label>
        <span>{label}</span>
        {inputGroup}
      </Label>
    );
  }
}

export default CalculatorInput;
