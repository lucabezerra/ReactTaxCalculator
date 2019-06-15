import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { isNumber, replace, toNumber } from 'lodash';

import Text from '../Text';
import Button from '../Button';


const FormContainer = styled.div`
  max-width: 420px;
  border: dashed 1px lightgray;
  display: flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px;

  @media (max-width: 499px) {
    min-width: 300px;
    max-width: 400px;
    flex-direction: column;
  }
`;

const StyledInput = styled.input`
  font-size: 14px;
`;

export class Calculator extends React.Component {
  state = {
    amount: 0,
    error: false,
  };

  onAmountChange = (e) => {
    const { value } = e.currentTarget;
    const sanitizedValue = replace(value, ',', '');
    const amount = sanitizedValue > 0 ? toNumber(sanitizedValue) : 0;
    this.setState({ amount, error: false });
  };

  onAmountFocus = () => {
    this.setState({ error: false });
  }

  handleCalculateClick = () => {
    const { onCalculateClick } = this.props;
    const { amount } = this.state;

    if (isNumber(amount) && amount > 0) {
      onCalculateClick(amount);
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    const { error } = this.state;

    return (  
        <FormContainer>      
          <Text margin="10px" data-tip="How much do you make in a year, before taxes?">
            Annual Gross Income: 
          </Text>
          <StyledInput
            type="text"
            placeholder="e.g. 60000"
            onChange={this.onAmountChange}
            onFocus={this.onAmountFocus}
          />
          <Button type="button" text="Calculate" onClick={this.handleCalculateClick} />
          {error &&
            <Text size="h6" color="red" italic block>
              Invalid value, please check it and try again.
            </Text>
          }
        <ReactTooltip />
        </FormContainer>
    );
  }
}

Calculator.propTypes = {
  onCalculateClick: PropTypes.func,
};

export default Calculator;
