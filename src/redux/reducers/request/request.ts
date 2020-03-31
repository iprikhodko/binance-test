import axios from 'axios';
import { Middleware } from 'redux';
import shortid from 'shortid';
import { IState } from '../index';
import { ACTIONS, IAllRequestActions } from './actions';

export const requests: {
  [requestId: string]: () => void;
} = {};

const requestMiddleware: Middleware<any, IState> = store => next => (action: IAllRequestActions) => {
  if (action.type === ACTIONS.MAKE_REQUEST) {
    const { dispatch } = store;
    const { config, actions } = action.payload;
    const requestId = shortid.generate();

    dispatch({
      type: actions.pending,
      payload: {
        requestId,
      },
    });

    axios(config).then(
      ({ data }) => {
        delete requests[requestId];
        dispatch({
          type: actions.success,
          payload: {
            requestId,
            data: data ? data.data : null,
          },
        });
      },
      () => {
        delete requests[requestId];
        dispatch({
          type: actions.error,
          payload: {
            requestId,
            error: {},
          },
        });
      },
    );

    // ToDo implement cancel function
    requests[requestId] = () => {};
  } else if (action.type === ACTIONS.CANCEL_REQUEST) {
    // ToDo handle cancel action
  }

  return next(action);
};

export default requestMiddleware;
