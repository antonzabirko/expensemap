import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense,
});

// START_ADD_EXPENSE
export const startAddExpense = (expenseData = {}) => (
  (dispatch, getState) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0,
    } = expenseData;
    const expense = {
      description,
      note,
      amount,
      createdAt,
    };
    const uid = getState().auth.uid;

    return database.ref(`users/${uid}/expenses`)
      .push(expense)
      .then((ref) => {
        dispatch(addExpense({
          id: ref.key,
          ...expense,
        }));
      });
  }
);

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

// START_EDIT_EXPENSES
export const startEditExpense = (id, updates) => (
  (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users/${uid}/expenses/${id}`)
      .update({ ...updates })
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  }
);

// REMOVE_EXPENSE
export const removeExpense = (
  {
    id,
  },
) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

// START_REMOVE_EXPENSE
export const startRemoveExpense = ({ id }) => (
  (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users/${uid}/expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      });
  }
);

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses,
});

// START_SET_EXPENSES
export const startSetExpenses = (expenseData = []) => (
  (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users/${uid}/expenses`)
      .once('value')
      .then((snapshot) => {
        const expenses = expenseData;

        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        dispatch(setExpenses(expenses));
      });
  }
);
