import { _saveQuestion, _saveQuestionAnswer } from '../../../utils/_DATA';

describe('Testing _DATA.js Functions', () => {
  
  describe('_saveQuestion', () => {

    it('should return the formatted question object when valid data is passed', async () => {
      const question = {
        optionOneText: 'Option One',
        optionTwoText: 'Option Two',
        author: 'sarahedo',
      };

      const savedQuestion = await _saveQuestion(question);

      expect(savedQuestion).toHaveProperty('id');
      expect(savedQuestion).toHaveProperty('timestamp');
      expect(savedQuestion).toMatchObject({
        author: question.author,
        optionOne: {
          text: question.optionOneText,
          votes: [],
        },
        optionTwo: {
          text: question.optionTwoText,
          votes: [],
        },
      });
    });

    it('should return an error if incorrect data is passed', async () => {
      const question = {
        optionOneText: '',
        optionTwoText: '',
        author: '',
      };

      await expect(_saveQuestion(question)).rejects.toEqual(
        'Please provide optionOneText, optionTwoText, and author'
      );
    });

  });

  describe('_saveQuestionAnswer', () => {

    it('should return true and update the data when valid data is passed', async () => {
      const answerData = {
        authedUser: 'sarahedo',
        qid: 'loxhs1bqm25b708cmbf3g',
        answer: 'optionOne',
      };

      const result = await _saveQuestionAnswer(answerData);
      expect(result).toBe(true);
    });

    it('should return an error if incorrect data is passed', async () => {
      const answerData = {
        authedUser: '',
        qid: '',
        answer: '',
      };

      await expect(_saveQuestionAnswer(answerData)).rejects.toEqual(
        'Please provide authedUser, qid, and answer'
      );
    });

  });

});
