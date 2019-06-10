import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { toNumber } from 'lodash';

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
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  font-size: 14px;
`;

const Label = styled.span`
  font-size: 14px;
  margin-right: 10px;
`;


export class Calculator extends React.Component {
  state = {
    amount: 0,
  };

  onAmountChange = (e) => {
    const { value } = e.currentTarget;
    const amount = value > 0 ? toNumber(value) : 0;
    this.setState({ amount });
  };

  handleCalculateClick = () => {
    const { onCalculateClick } = this.props;
    const { amount } = this.state;

    if (amount > 0) {
      onCalculateClick(amount);
    }
  }

  render() {
    return (  
      <Container>
        <TitleContainer>
          <Text size="h2" bold>Tax Calculator</Text>
          <Text size="h4" color="gray" italic>Making taxes simpler.</Text>
        </TitleContainer>    
        <FormContainer>      
          <Label data-tip="How much do you make in a year, before taxes?">
            Annual Gross Income: 
          </Label>
          <StyledInput type="text" placeholder="e.g. 60000" onChange={this.onAmountChange} />
          <Button type="button" text="Calculate" onClick={this.handleCalculateClick} />
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
