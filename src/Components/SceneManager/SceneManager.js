import React from 'react';

import Calculator from '../Calculator';
import Results from '../Results';


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
    return component;
  };
}

export default SceneManager;
