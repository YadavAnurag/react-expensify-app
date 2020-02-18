import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {})=>({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {})=>({
  type: 'DECREMENT',
  decrementBy
});

const resetCount = ()=>({
  type: 'RESET'
});

const setCount = ({ setBy = 50 } = {})=>({
  type: 'SET',
  setBy
});


const store = createStore((state={ count: 10 }, action)=>{
  switch (action.type){
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      }
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      }
    case 'RESET':
      return {
        count: 0
      }
    case 'SET':
      return {
        count: action.setBy
      }
    default:
      return state;
  }
});

const unsubscribe = store.subscribe(()=>{
  console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 6 }));
store.dispatch(decrementCount({ decrementBy: 100 }));
store.dispatch(resetCount());
store.dispatch(setCount({ setBy: 500 }))