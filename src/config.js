const config = {
  maxLoanDuration: {
    marketing: 36,
    equipment: 60
  },
  allDurationOptions: [3, 6, 9, 12, 24, 36, 48, 60],
  locale: {
    thousandsSeparator: ".",
    decimalSeparator: ","
  },
  interestRates: {
    50e3: [6, 8],
    150e3: [5, 7],
    500e3: [4, 6]
  },
  interestRateRounding: 1
};

module.exports = config;
