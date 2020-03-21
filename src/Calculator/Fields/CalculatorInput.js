import React, { Component } from "react";

class CalculatorInput extends Component {
  render() {
    const { name, label, type, attributes, icon, callback } = this.props;

    const iconClass = icon ? "has-icon" : "";
    const iconObject = () => {
      if (icon) {
        return <span className="icon">{icon}</span>;
      }
    };

    return (
      <div className={`calculator-input calculator-input-${name} ${iconClass}`}>
        <label>
          <span className="label">{label}</span>
          {iconObject()}
          <input name={name} type={type} onChange={callback} {...attributes} />
        </label>
      </div>
    );
  }
}

export default CalculatorInput;
