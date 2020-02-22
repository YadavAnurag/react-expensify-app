import { ExpensesSummary } from '../../components/ExpensesSummary';
import React from 'react';
import { shallow } from 'enzyme';

test('should render Expneses Summary with 1 expense correctly', ()=>{
  const wrapper = shallow(<ExpensesSummary  expenseCount={1} expenseTotal={100} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render Expneses Summary with multiple expenses correctly', ()=>{
  const wrapper = shallow(<ExpensesSummary expenseCount={3} expenseTotal={200} />);
  expect(wrapper).toMatchSnapshot();
});