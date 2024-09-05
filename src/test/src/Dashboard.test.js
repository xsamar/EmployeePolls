import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';  
import rootReducer from '../../reducers';
import Dashboard from '../../components/Dashboard';

describe('Dashboard Snapshot', () => {
  it('should render correctly', () => {
    const initialState = {
      authedUser: 'sarahedo',
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
          answers: {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionOne',
            "am8ehyc8byjqgar0jgpub9": 'optionTwo',
            "loxhs1bqm25b708cmbf3g": 'optionTwo',
          },
          questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
        },
      },
      questions: {
        "8xf0y6ziyjabvozdd253nd": {
          id: '8xf0y6ziyjabvozdd253nd',
          author: 'sarahedo',
          timestamp: 1467166872634,
          optionOne: {
            votes: ['sarahedo'],
            text: 'Build our new application with Javascript',
          },
          optionTwo: {
            votes: [],
            text: 'Build our new application with Typescript',
          },
        },
        // Add more questions if needed
      },
    };

    const store = createStore(rootReducer, initialState);

    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter> 
            <Dashboard />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
