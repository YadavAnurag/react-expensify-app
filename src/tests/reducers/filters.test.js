import filterReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter reducer state', ()=>{
  const state = filterReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sort by date', ()=>{
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  };
  const state = filterReducer(undefined, { type: 'SORT_BY_DATE' });
  expect(state).toEqual({
    text: '',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    sortBy: 'date'
  });
});

test('should set sort by amount', ()=>{
  const state = filterReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

test('should set start date', ()=>{
  const state = filterReducer(undefined, { type: 'SET_START_DATE', startDate: moment(0) });
  expect(state.startDate).toEqual(moment(0));
});

test('should set end date', ()=>{
  const state = filterReducer(undefined, { type: 'SET_END_DATE', endDate: moment(100) });
  expect(state.endDate).toEqual(moment(100));
});