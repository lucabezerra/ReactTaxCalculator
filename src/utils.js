
const thresholds = [47630, 95259, 147667, 210371];

const taxPercentages = [0.15, 0.205, 0.26, 0.29, 0.33];

export const calculateTax = (amount) => {
  if (amount < 0) return null;

  if (amount <= thresholds[0]) {
    return taxPercentages[0];
  } else if (amount > thresholds[0] && amount <= thresholds[1]) {
    return taxPercentages[1];
  } else if (amount > thresholds[1] && amount <= thresholds[2]) {
    return taxPercentages[2];
  } else if (amount > thresholds[2] && amount <= thresholds[3]) {
    return taxPercentages[3];
  } else {
    return taxPercentages[4];
  }
}