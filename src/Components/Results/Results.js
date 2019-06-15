import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { map, reduce } from 'lodash';

import Text from '../Text';
import Button from '../Button';
import Footer from '../Footer';
import { calculateTaxes, currencyFormatter } from '../../utils';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center

  li {
    list-style-type: decimal;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const ResultsContainer = styled.div`
  width: 500px;
  border: dashed 1px lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const Results = ({ amount, onResetClick }) => {

  const taxData = calculateTaxes(amount);
  const taxValues = map(taxData, 'value');
  const totalTaxes = reduce(taxValues, (sum, n) => sum + n);

  // TODO: remember that each percentage is applied to a slice of the total amount

  return (
    <Container>
      <TitleContainer>
        <Text size="h2" bold>Tax Calculator</Text>
        <Text size="h4" color="gray" italic>Making taxes simpler.</Text>
      </TitleContainer>
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
      <Footer />
      <ReactTooltip />
    </Container>
  );
};

Results.propTypes = {
  amount: PropTypes.number,
  onResetClick: PropTypes.func,
};

export default Results;
