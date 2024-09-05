import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import rootReducer from '../../reducers';
import Login from '../../components/Login';

describe('Login Component', () => {
  it('should handle user selection and submission', () => {
    const initialState = {
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
          answers: {},
          questions: [],
        },
        tylermcginnis: {
          id: 'tylermcginnis',
          name: 'Tyler McGinnis',
          avatarURL: "https://tylermcginnis.com/would-you-rather/tyler.jpg",
          answers: {},
          questions: [],
        }
      },
      authedUser: null
    };

    const store = createStore(rootReducer, initialState);

    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(getByRole('combobox'), { target: { value: 'sarahedo' } });

    fireEvent.click(getByRole('button', { name: /login/i }));

    expect(store.getState().authedUser).toBe('sarahedo');
  });
});
