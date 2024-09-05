import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import PollDetails from '../../components/PollDetails';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('PollDetails Component', () => {
  it('calculates and displays the correct percentage of votes for each option', () => {
    const initialState = {
      authedUser: 'sarahedo',
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
          answers: {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
          },
          questions: ['8xf0y6ziyjabvozdd253nd'],
        }
      },
      questions: {
        "8xf0y6ziyjabvozdd253nd": {
          id: '8xf0y6ziyjabvozdd253nd',
          author: 'sarahedo',
          timestamp: 1467166872634,
          optionOne: {
            votes: ['sarahedo', 'tylermcginnis'],
            text: 'Option One Text',
          },
          optionTwo: {
            votes: ['mtsamis'],
            text: 'Option Two Text',
          }
        }
      }
    };

    const store = createStore(rootReducer, initialState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/questions/8xf0y6ziyjabvozdd253nd']}>
          <Routes>
            <Route path="/questions/:id" element={<PollDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const optionOnePercentageRegex = /66\.67%/;
    const optionTwoPercentageRegex = /33\.33%/;

    expect(screen.getByText(optionOnePercentageRegex)).toBeInTheDocument();
    expect(screen.getByText(optionTwoPercentageRegex)).toBeInTheDocument();
  });
});
