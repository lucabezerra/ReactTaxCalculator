import React from 'react';
import styled from 'styled-components';

import Text from '../Text';
import Calculator from '../Calculator';
import Results from '../Results';
import Footer from '../Footer';


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
  margin-top: 20px;
  margin-bottom: 40px;
`;


export class SceneManager extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      amount: -1,
    };
  }

  onCalculateClick = (amount) => {
    if (amount >= 0) {
      this.setState({ amount });
    }
  }

  onResetClick = () => {
    this.setState({ amount: -1 });
  }

  render() {
    const { amount } = this.state;
    const component = (
      amount >= 0 ?             
      <Results amount={amount} onResetClick={this.onResetClick} />
      :
      <Calculator onCalculateClick={this.onCalculateClick} />
    );
    return (
      <Container>
        <TitleContainer>
          <Text size="h2" margin="10px" bold>Tax Calculator</Text>
          <Text size="h4" margin="10px" color="gray" italic>Making taxes simpler.</Text>
        </TitleContainer>   
        {component}
        <Footer />
      </Container>
    );
  };
}

export default SceneManager;
