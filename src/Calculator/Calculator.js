import React, { Component } from "react";
import { CalculatorSelect, CalculatorInput } from "./Fields";
import { ReactComponent as EuroSymbol } from "./assets/euro.svg";
import "./Calculator.scss";

class Calculator extends Component {
  constructor(props) {
    super(props);

    // Set initial values
    this.state = {
      product: "marketing",
      legal_form: "bv",
      maxLoan: {
        amount: 250e3,
        duration: 36
      }
    };
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
      loan.amount = 250e3;
      loan.duration = 36;
    } else if (product === "equipment") {
      loan.amount = legalForm === "bv" ? 500e3 : 250e3;
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
            <CalculatorSelect
              name="product"
              label="Financieringsdoel"
              options={{
                marketing: "Marketing",
                equipment: "Equipment"
              }}
              callback={this.saveInputToState}
            />

            <CalculatorInput
              name="requested_amount"
              label="Bedrag"
              type="number"
              attributes={{
                min: 5e3,
                max: this.state.maxLoan.amount,
                placeholder: `van €5K tot €${this.state.maxLoan.amount / 1e3}K`
              }}
              icon={<EuroSymbol />}
            />

            <CalculatorSelect
              name="legal_form"
              label="Rechtsvorm"
              options={{
                bv: "BV",
                eenmanszaak: "Eenmanszaak"
              }}
              callback={this.saveInputToState}
            />

            <CalculatorSelect
              name="duration"
              label="Looptijd"
              options={{
                3: "6 maanden",
                6: "6 maanden",
                9: "9 maanden",
                12: "12 maanden",
                24: "24 maanden",
                36: "36 maanden",
                48: "48 maanden",
                60: "60 maanden"
              }}
              callback={this.saveInputToState}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Calculator;
