import { actionTypes as asyncOpTypes } from 'use-async-ops-redux'
import * as names from '../../async/names'
import * as types from '../actions/types'

const initialState = {

}

const complete = (state, action) => action.response || initialState

const asyncComplete = (state, action) => {
  switch (action.name) {
    case names.GET_PODS: return complete(state, action)
    default: return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case asyncOpTypes.COMPLETE: return asyncComplete(state, action)
    default: return state
  }
}