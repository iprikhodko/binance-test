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
    const source = axios.CancelToken.source();

    dispatch({
      type: actions.pending,
      payload: {
        requestId,
      },
    });

    axios({
      ...config,
      cancelToken: source.token,
    }).then(
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

    requests[requestId] = source.cancel;

  } else if (action.type === ACTIONS.CANCEL_REQUEST) {
    const { requestId } = action.payload;
    const cancel = requests[requestId || ''];

    if (cancel) {
      cancel();
    }
  }

  return next(action);
};

export default requestMiddleware;
