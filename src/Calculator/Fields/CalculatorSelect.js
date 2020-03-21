import React, { Component } from "react";

class CalculatorInput extends Component {
  render() {
    const { name, label, options, attributes, callback } = this.props;
    return (
      <div className={`calculator-input calculator-input-${name}`}>
        <label>
          <span className="label">{label}</span>
          <select name={name} onChange={callback} {...attributes}>
            {Object.entries(options).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

export default CalculatorInput;
