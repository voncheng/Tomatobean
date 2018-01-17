import { CHECK_AUTHORITY } from '../constants/bizTypes';

export const authorityStatus = (state = false, action) => {
  switch (action.type) {
    case CHECK_AUTHORITY:
      return action.visible;
    default:
      return state;
  }
};
