import {User} from '../../shared/model/user.model';
import * as Auth from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(state: State = initialState, action: Auth.Actions): State {
  switch (action.type) {
    case Auth.AUTH_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate);
      return {
        ...state,
        authError: null,
        loading: false,
        user
      };
    case Auth.LOGOUT:
      return {
        ...state,
        authError: null,
        user: null
      };
    case Auth.LOGIN_START:
    case Auth.SIGNUP_START:
      return {
        ...state,
        loading: true,
        authError: null
      };
    case Auth.AUTH_FAIL:
      return {
        ...state,
        authError: action.payload,
        loading: false,
        user: null
      };
    case Auth.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}
