import React from 'react';
import { mount } from 'enzyme';

import Calculator from '../Calculator';
import Button from '../../Button';
import Text from '../../Text';


describe('Calculator tests', () => {
  let props;
  let component;
  let onCalculateClick;

  const mountComponent = () => {
    component = mount(
      <Calculator {...props} />
    );
  };

  beforeEach(() => {
    onCalculateClick = jest.fn();
    props = {
      onCalculateClick,
    };
  });

  it('displays the component properly', () => {
    mountComponent();
    const text = component.find(Text);
    expect(text.length).toBe(1);
    expect(text.first().text()).toContain('Annual Gross Income:');

    const input = component.find('input');
    expect(input.length).toBe(2);
    expect(input.first().props().type).toBe('text');

    const button = component.find(Button);
    expect(button.length).toBe(1);
    expect(button.props().text).toContain('Calculate');    
  });

  it('displays the error message if the error flag is true', () => {
    mountComponent();
    component.instance().setState({ error: true });
    component.update();

    const text = component.find(Text);
    expect(text.length).toBe(2);
    expect(text.last().text()).toContain('Invalid value, please check it and try again.');
  });

  it('calculate function is called on button click', () => {
    mountComponent();
    const input = component.find('input');
    expect(input.length).toBe(2);
    input.first().instance().value = '60000';
    input.first().simulate('change');

    const button = component.find(Button);
    button.simulate('click');
    expect(onCalculateClick).toHaveBeenCalled();
  });
});
