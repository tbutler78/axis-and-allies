import { 
  COMBAT_UNDERWAY, 
  NEXT_TURN,
  VIEW_STRATEGIC_BOMBING_RESULTS
} from '../actions'

const missionComplete = (state = {}, action) => {
  const { type, unitIds, bombardmentIds } = action
  switch (type) {
  case COMBAT_UNDERWAY: {
    let newState = { ...state };//keep semicolon!
    (bombardmentIds || []).forEach(id => newState[id] = true)
    return newState
  }
  case VIEW_STRATEGIC_BOMBING_RESULTS: {
    let newState = { ...state }
    unitIds.forEach(id => newState[id] = true)
    return newState
  }
  case NEXT_TURN: {
    return {}
  }
  default:
    return state
  }
}

export default missionComplete

