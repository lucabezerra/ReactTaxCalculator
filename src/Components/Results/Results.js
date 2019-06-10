import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

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

const ResultsContainer = styled.div`
  width: 420px;
  border: dashed 1px lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const Results = ({ amount, onResetClick }) => (
  <Container>
    <TitleContainer>
      <Text size="h2" bold>Tax Calculator</Text>
      <Text size="h4" color="gray" italic>Making taxes simpler.</Text>
    </TitleContainer>    
    <ResultsContainer>      
      <Text size="h3" bold>Results:</Text>
      <Text size="h5" italic>
        This is the tax data for a{' '}
        <Text size="h5" margin="0" bold>{amount}</Text> CAD annual gross income.
      </Text>
      <Button type="button" text="Try again" onClick={onResetClick} />
    </ResultsContainer>
    <Footer />
    <ReactTooltip />
  </Container>
);

Results.propTypes = {
  amount: PropTypes.number,
  onResetClick: PropTypes.func,
};

export default Results;
