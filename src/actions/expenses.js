import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense)=>({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = {description, note, amount, createdAt};

    return database.ref(`users/${uid}/expenses`).push(expense)
      .then((ref)=>{
        dispatch(addExpense({
          id: ref.key,
          ...expense
        }));
    });
  };
};


// REMOVE_EXPENSE
export const removeExpense = (
  { id = 0} = {}
)=>({
  type: 'REMOVE_EXPENSE',
  id
});

// START_REMOVE_EXPENSE
export const startRemoveExpense = ({id} = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`)
      .remove()
      .then(() => { 
        dispatch(removeExpense({id}));
      });
  };
};
// EDIT_EXPENSE
export const editExpense = (id, updates)=>({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};

// SET_EXPENSES
export const setExpenses = (expenses) => {
  return {
    type: 'SET_EXPENSES',
    expenses
  }
};

//START_SET_EXPENSES
export const startSetExpenses = ()=>{
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`)
    .once('value')
    .then((snapshot)=>{
      const expenses = [];

      snapshot.forEach(childSnapshot => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      return expenses;

    })
    .then(expenses => {
      dispatch(setExpenses(expenses));
    })
    .catch(err => console.log('Error while startSetExpenses then setExpenses', err));
  };
};
