import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { PictureList, Picture } from './types/picture.type';
import fakeData from './fake-datas.json';
import Pictures from './components/pictures';

export type State = {
  counter : number,
  pictures : PictureList,
  selectedPicture : Picture;
}

export const defaultState : State = {
  counter : 3,
  pictures : fakeData.slice(0,3),
  selectedPicture : {
    previewFormat: '',
    webFormat: '',
    author: '',
    largeFormat: ''
  }
}; 

type Increment = { type: 'INCREMENT' };
type Decrement = { type: 'DECREMENT' };

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

type Action =
  | Increment
  | Decrement;

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT': {
      const newCounter = state.counter + 1;
      return { 
        ...state,
        counter: newCounter,
        pictures: fakeData.slice(0, newCounter) };
    }
    case 'DECREMENT': {
      if (state.counter <= 3) return state;
      const newCounter = state.counter - 1;
      return { 
        ...state,
        counter: newCounter,
        pictures: fakeData.slice(0, newCounter) };
    }
    case 'SELECT_PICTURE': {
      return {
        ...state,
        selectedPicture : action.picture
      };
    }
    case 'CLOSE_MODAL':
      return {
        ...state,
        selectedPicture : {
          previewFormat: '',
          webFormat: '',
          author: '',
          largeFormat: ''
        }
      };
    case 'FETCH_CATS_REQUEST':
      throw 'Not Implemented';
    case 'FETCH_CATS_COMMIT':
      throw 'Not Implemented';
    case 'FETCH_CATS_ROLLBACK':
      throw 'Not Implemented';
  }
};

export const counterSelector = (state: State) => {
  return state.counter;
};
export const picturesSelector = (state: State) => {
  return state.pictures;
};
export const getSelectedPicture = (state: State) => {
  return state.selectedPicture;
};

export default compose(liftState, reducer);
