import React from 'react';
import styled from 'styled-components';

import Text from '../Text';


const Container = styled.div`
  line-height: 0.8;
  margin-top: 70px;
`;

export const Footer = () => (
  <Container>
    <Text size="h6" color="gray" italic block>
      Calculations based on data extracted from{' '}
      <a href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html#federal">Canada.ca</a>.
    </Text>
    <Text size="h6" color="gray" italic block>
      LowBudget Development @ 2019 - All rights reserved.
    </Text>
  </Container>
)

export default Footer;
