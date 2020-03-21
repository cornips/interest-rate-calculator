import React, { Component } from "react";

class CalculatorInput extends Component {
  render() {
    const { name, label, options, callback } = this.props;
    return (
      <div className="calculator-input calculator-input-{label}">
        <label>
          <span className="label">{label}</span>
          <select name={name} onChange={callback}>
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
