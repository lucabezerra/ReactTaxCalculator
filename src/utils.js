
const thresholds = [47630, 47629, 52408, 62704];

const taxPercentages = [0.15, 0.205, 0.26, 0.29, 0.33];

export const calculateTaxes = (amount) => {
  let currAmount = amount;
  const values = [];
  let i = 0;
  
  while (currAmount > 0) {
    // if we're at the last tax tier, all that's left is multiplied by it
    // if the current amount is less than the threshold, we stop
    if (i === thresholds.length || currAmount < thresholds[i]) {
      values.push({
        amount: currAmount,
        percentage: taxPercentages[i],
        value: currAmount * taxPercentages[i],
      });
      break;
    } else if (currAmount >= thresholds[i]) { // everything else follows this logic
      values.push({
        amount: thresholds[i],
        percentage: taxPercentages[i],
        value: thresholds[i] * taxPercentages[i],
      });
    }

    // otherwise we keep going
    currAmount = currAmount - thresholds[i];
    i++;
  }

  return values;
}

export const currencyFormatter = new Intl.NumberFormat(
  'en-US', {
    style: 'currency',
    currency: 'CAD',
  }
);