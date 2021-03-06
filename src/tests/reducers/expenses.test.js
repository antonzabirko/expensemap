import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

import moment from 'moment';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([ expenses[0], expenses[2] ]);
});

test('should not remove expense if the id is not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        description: 'Test Expense',
        amount: 50000,
        createdAt: moment(0),
        id: '100',
        note: 'Test Note'
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([ ...expenses, expense ]);
});

test('should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            note: 'update'
        }
    };
    const state = expensesReducer(expenses, action);

    expect(state[0].note).toBe('update');
});

test('should not edit an expense if id is not matched', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: 10,
        updates: {
            note: 'update'
        }
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});