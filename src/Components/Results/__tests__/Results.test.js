import React from 'react';
import { mount } from 'enzyme';

import Results from '../Results';
import Button from '../../Button';
import Text from '../../Text';


describe('Results tests', () => {
  let props;
  let component;
  let onResetClick;

  const mountComponent = () => {
    component = mount(
      <Results {...props} />
    );
  };

  beforeEach(() => {
    onResetClick = jest.fn();
    props = {
      onResetClick,
      amount: 60000,
    };
  });

  it('displays the component properly', () => {
    mountComponent();
    const text = component.find(Text);
    expect(text.length).toBe(14); // 6 regular + (4 * number of tax tiers)
    expect(text.at(2).text()).toContain('60,000');    
    expect(text.at(4).text()).toContain('9,680.35'); // total taxes to pay
    expect(text.at(5).text()).toContain('16.1%'); // total tax percentage
    expect(text.at(8).text()).toContain('7,144.50'); // first tier's tax to pay
    expect(text.at(11).text()).toContain('12,370.00'); // second tier's remaining value
    expect(text.at(12).text()).toContain('2,535.85'); // second tier's tax to pay

    const button = component.find(Button);
    expect(button.length).toBe(1);
    expect(button.props().text).toContain('Try again');    
  });

  it('correctly calculates tax for value below first tier', () => {
    props = { ...props, amount: 2000 };
    mountComponent();
    const text = component.find(Text);
    expect(text.length).toBe(10); // 6 regular + (4 * number of tax tiers)
    expect(text.at(2).text()).toContain('2,000'); // annual gross income
    expect(text.at(4).text()).toContain('300'); // total taxes to pay
    expect(text.at(5).text()).toContain('15.0%'); // total tax percentage    
    expect(text.at(8).text()).toContain('300'); // first tier's tax to pay

    const button = component.find(Button);
    expect(button.length).toBe(1);
    expect(button.props().text).toContain('Try again');    
  });

  it('correctly calculates tax for value above last tier', () => {
    props = { ...props, amount: 500000 };
    mountComponent();
    const text = component.find(Text);
    expect(text.length).toBe(26); // 6 regular + (4 * number of tax tiers)
    expect(text.at(2).text()).toContain('500,000'); // annual gross income
    expect(text.at(4).text()).toContain('144,296.26'); // total taxes to pay
    expect(text.at(5).text()).toContain('28.9%'); // total tax percentage    
    expect(text.at(8).text()).toContain('7,144.50'); // first tier's tax to pay
    expect(text.at(12).text()).toContain('9,763.95'); // second tier's tax to pay
    expect(text.at(16).text()).toContain('13,626.08'); // third tier's tax to pay
    expect(text.at(20).text()).toContain('18,184.16'); // fourth tier's tax to pay
    expect(text.at(24).text()).toContain('95,577.57'); // last tier's tax to pay

    const button = component.find(Button);
    expect(button.length).toBe(1);
    expect(button.props().text).toContain('Try again');    
  });

  it('reset function is called on button click', () => {
    mountComponent();    
    const button = component.find(Button);
    button.simulate('click');
    expect(onResetClick).toHaveBeenCalled();
  });
});
