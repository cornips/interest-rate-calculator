const config = {
  minLoan: {
    amount: 5e3
  },
  maxLoan: {
    default: {
      amount: 250e3,
      duration: 36
    },
    marketing: {
      amount: {
        bv: 250e3,
        sole_proprietorship: 250e3
      },
      duration: 36
    },
    equipment: {
      amount: {
        bv: 500e3,
        sole_proprietorship: 250e3
      },
      duration: 60
    }
  },
  allDurationOptions: [3, 6, 9, 12, 24, 36, 48, 60],
  defaultDuration: 12,
  interestRates: {
    50e3: [6, 8],
    150e3: [5, 7],
    500e3: [4, 6]
  },
  interestRateRounding: 1,
  locale: "nl_NL"
};

module.exports = config;
