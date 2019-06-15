import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { map, reduce } from 'lodash';

import Text from '../Text';
import Button from '../Button';
import { calculateTaxes, currencyFormatter } from '../../utils';


const ResultsContainer = styled.div`
  max-width: 500px;
  border: dashed 1px lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;

  @media (max-width: 499px) {
    max-width: 400px;
    flex-direction: column;
  }
`;

export const Results = ({ amount, onResetClick }) => {

  const taxData = calculateTaxes(amount);
  const taxValues = map(taxData, 'value');
  const totalTaxes = reduce(taxValues, (sum, n) => sum + n);

  return (
    <ResultsContainer>
      <Text size="h3" bold>Results:</Text>
      <Text italic>
        This is the tax data for a{' '}
        <Text bold>{currencyFormatter.format(amount)}</Text> annual gross income.
      </Text>
      <Text align="left">
        You'll pay <Text bold>{currencyFormatter.format(totalTaxes)}</Text>{' '}
        in taxes this year. Here's the detailed description of each value:
      </Text>
      <ul>
        {map(taxData, data => (
          <li key={data.value}>
            <Text>
              For <Text bold>{currencyFormatter.format(data.amount)}</Text> of the total{' '}
              you'll pay <Text bold>{currencyFormatter.format(data.value)}</Text>{' '}
              (<Text bold>{(data.percentage * 100).toFixed(1)}%</Text>).
            </Text>
          </li>
        ))}
      </ul>
      <Button type="button" text="Try again" onClick={onResetClick} />
    </ResultsContainer>
  );
};

Results.propTypes = {
  amount: PropTypes.number,
  onResetClick: PropTypes.func,
};

export default Results;
