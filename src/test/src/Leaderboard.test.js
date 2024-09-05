import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import Leaderboard from '../../components/Leaderboard';

describe('Leaderboard Component', () => {
  it('should display the correct user details', () => {
    const initialState = {
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
          answers: {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionOne',
          },
          questions: ['8xf0y6ziyjabvozdd253nd'],
        },
        tylermcginnis: {
          id: 'tylermcginnis',
          name: 'Tyler McGinnis',
          avatarURL: "https://tylermcginnis.com/would-you-rather/tyler.jpg",
          answers: {
            "vthrdm985a262al8qx3do": 'optionOne',
            "xj352vofupe1dqz9emx13r": 'optionTwo',
          },
          questions: ['loxhs1bqm25b708cmbf3g'],
        },
        mtsamis: {
          id: 'mtsamis',
          name: 'Mike Tsamis',
          avatarURL: "https://tylermcginnis.com/would-you-rather/dan.jpg",
          answers: {
            "xj352vofupe1dqz9emx13r": 'optionOne',
            "vthrdm985a262al8qx3do": 'optionTwo',
          },
          questions: ['6ni6ok3ym7mf1p33lnez'],
        }
      }
    };

    const store = createStore(rootReducer, initialState);

    const { getByText } = render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    expect(getByText(/sarahedo/i)).toBeInTheDocument();
    expect(getByText(/tylermcginnis/i)).toBeInTheDocument();
    expect(getByText(/mtsamis/i)).toBeInTheDocument();
  });
});
