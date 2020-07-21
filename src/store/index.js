import { createStore } from 'redux'
import { prependMiddleware } from 'use-async-ops'
import { reduxMiddleware } from 'use-async-ops-redux'

import reducer from './reducer'

const store = createStore(reducer)

prependMiddleware(reduxMiddleware(store.dispatch))

global.store = store

export default store