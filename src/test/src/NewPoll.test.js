import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import rootReducer from '../../reducers';
import NewPoll from '../../components/NewPoll';
import { handleAddQuestion } from '../../actions/questions';
import { useNavigate } from 'react-router-dom';

jest.mock('../../actions/questions', () => ({
  handleAddQuestion: jest.fn(() => ({ type: 'ADD_QUESTION', question: {} }))
}));


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(), 
  }));
  
  describe('NewPoll Component', () => {
    it('should update the input fields and enable the submit button when both options are filled', () => {
      const store = createStore(rootReducer, applyMiddleware(thunk));
  
      const { getByPlaceholderText, getByRole } = render(
        <Provider store={store}>
          <MemoryRouter>
            <NewPoll />
          </MemoryRouter>
        </Provider>
      );
  
      const optionOneInput = getByPlaceholderText('Option One');
      const optionTwoInput = getByPlaceholderText('Option Two');
      const submitButton = getByRole('button', { name: /submit/i });
  
      expect(submitButton).toBeDisabled();
  
      fireEvent.change(optionOneInput, { target: { value: 'Option One Text' } });
      fireEvent.change(optionTwoInput, { target: { value: 'Option Two Text' } });
  
      expect(submitButton).not.toBeDisabled();
    });
  
  });