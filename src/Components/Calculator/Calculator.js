import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { isNumber, replace, toNumber } from 'lodash';

import Text from '../Text';
import Button from '../Button';
import Footer from '../Footer';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const FormContainer = styled.div`
  width: 420px;
  border: dashed 1px lightgray;
  display: flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
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
      <Container>
        <TitleContainer>
          <Text size="h2" margin="10px" bold>Tax Calculator</Text>
          <Text size="h4" margin="10px" color="gray" italic>Making taxes simpler.</Text>
        </TitleContainer>    
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
        </FormContainer>
        <Footer />
        <ReactTooltip />
      </Container>
    );
  }
}

Calculator.propTypes = {
  onCalculateClick: PropTypes.func,
};

export default Calculator;
