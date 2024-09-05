import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from '../../reducers';
import Nav from '../../components/Nav';

describe('Nav Component', () => {
  it('should display all expected links', () => {
    const store = createStore(rootReducer, {
      authedUser: 'sarahedo', 
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
          answers: {},
          questions: [],
        }
      }
    });

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );

    expect(getByText(/home/i)).toBeInTheDocument();
    expect(getByText(/new poll/i)).toBeInTheDocument();
    expect(getByText(/leaderboard/i)).toBeInTheDocument();
  });
});
