import { createStore ,compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import { persistStore } from 'redux-persist';
import reducers from '../reducers/index';

//-----------------------|| REDUX - MAIN STORE ||-----------------------//

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
const persister = persistStore(store);

export { store, persister };

