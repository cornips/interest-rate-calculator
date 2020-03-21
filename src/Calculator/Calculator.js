import React, { Component } from "react";
import CalculatorInput from "./CalculatorInput/CalculatorInput";
import "./Calculator.scss";

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.selects = [
      {
        name: "product",
        label: "Financieringsdoel",
        options: {
          marketing: "Marketing",
          equipment: "Equipment"
        },
        callback: this.saveToState
      },
      {
        name: "legal-form",
        label: "Legal form",
        options: {
          bv: "BV",
          eenmanszaak: "Eenmanszaak"
        },
        callback: this.saveToState
      }
    ];
  }

  saveToState = event => {
    event.persist();

    const { name, value } = event.target;

    this.setState({ [name]: value });

    return null;
  };

  render() {
    return (
      <div className="calculator">
        <div className="calculator-input">
          <h2>Ontdek jouw mogelijkheden</h2>
          <form className="form-horizontal">
            {this.selects.map(select => {
              return (
                <CalculatorInput
                  key={select.name}
                  name={select.name}
                  label={select.label}
                  options={select.options}
                  callback={select.callback}
                />
              );
            })}
          </form>
        </div>
      </div>
    );
  }
}

export default Calculator;
