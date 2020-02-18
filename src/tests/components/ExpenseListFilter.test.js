import React, { memo } from 'react';
import { shallow } from 'enzyme';
import { filters, altFilters } from '../fixtures/filters';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;
beforeEach(()=>{
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(<ExpenseListFilters 
    filters={filters}
    setTextFilter={setTextFilter}
    sortByDate={sortByDate}
    sortByAmount={sortByAmount}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
  />);
});


test('should render ExpenseListFilters correctly', ()=>{
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with altData correctly', ()=>{
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle textChange', ()=>{
  const value = 'water';
  wrapper.find('input').simulate('change', {
    target: { value}
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});
test('should handle sortByDate', ()=>{
  const value = 'date';
  wrapper.setProps({
    filters: altFilters
  });
  wrapper.find('select').simulate('change', {
    target : { value }
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('should handle sortByAmount', ()=>{
  const value = 'amount';

  wrapper.find('select').simulate('change', {
    target : { value }
  });
  expect(sortByAmount).toHaveBeenCalled();
});
test('should handle date changes', ()=>{
  const startDate = moment(0).add(4, 'years');
  const endDate = moment(0).add(8, 'years');
  wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
});

test('should handle data focus changes', ()=>{
  const calanderFocused = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calanderFocused);
  expect(wrapper.state('calanderFocused')).toBe(calanderFocused);
});
