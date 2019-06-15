import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const getSize = (size) => ({
  'h1': '46px',
  'h2': '32px',
  'h3': '24px',
  'h4': '16px',
  'h5': '14px',
  'h6': '12px',
  'h7': '10px',
})[size];

const StyledSpan = styled.span`
  color: ${({ color }) => color || 'black'};
  font-size: ${({ size }) => getSize(size)};
  ${({ italic }) => italic && 'font-style: italic;'};
  ${({ bold }) => bold && 'font-weight: bold;'};
  ${({ block }) => block && 'display: block;'};
  text-align: ${({ align }) => align || 'center'};
  margin: ${({ margin }) => margin};
`;

export const Text = ({ children, color, size, italic, bold, align, block, margin }) => (
  <StyledSpan
    color={color}
    size={size}
    italic={italic}
    bold={bold}
    align={align}
    block={block}
    margin={margin}
  >
    {children}
  </StyledSpan>
);

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  color: PropTypes.string,
  size: PropTypes.string,
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  align: PropTypes.string,
  block: PropTypes.bool,
};

Text.defaultProps = {
  size: 'h5',
  margin: '10px 0px',
};

export default Text;
