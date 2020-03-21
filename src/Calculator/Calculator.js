import React, { Component } from "react";
import CalculatorInput from "./CalculatorInput/CalculatorInput";
import "./Calculator.scss";

class Calculator extends Component {
  constructor(props) {
    super(props);

    // Set initial values
    this.state = {
      product: "marketing",
      legal_form: "bv"
    };
    this.saveMaxLoanToState();

    // prepare select fields
    this.selects = [
      {
        name: "product",
        label: "Financieringsdoel",
        options: {
          marketing: "Marketing",
          equipment: "Equipment"
        },
        callback: this.saveInputToState
      },
      {
        name: "legal_form",
        label: "Legal form",
        options: {
          bv: "BV",
          eenmanszaak: "Eenmanszaak"
        },
        callback: this.saveInputToState
      }
    ];
  }

  // Callback function to allow input to be saved in state
  saveInputToState = event => {
    event.persist();

    const { name, value } = event.target;

    this.setState({ [name]: value }, this.saveMaxLoanToState);

    return null;
  };

  // Function to allow max loan to be saved in state
  saveMaxLoanToState = () => {
    const { product = null, legal_form = null } = this.state;
    if (!product || !legal_form) return null;

    const maxLoan = this.calculateMaxLoan(product, legal_form);
    console.log(maxLoan);
    this.setState({ maxLoan: maxLoan });

    return null;
  };

  // Function to calculate max loan based on input
  calculateMaxLoan = (product, legalForm) => {
    let loan = { amount: null, duration: null };
    if (product === "marketing") {
      loan.amount = 250000;
      loan.duration = 36;
    } else if (product === "equipment") {
      loan.amount = legalForm === "bv" ? 500000 : 250000;
      loan.duration = 60;
    }
    return loan;
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
