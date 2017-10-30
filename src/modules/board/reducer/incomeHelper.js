import { currentPowerNPL } from '../../income'

const incomeHelper = (state, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': 
      const { pathname } = action.payload.location
      if (pathname === '/income' && !state.currentPowerIncome) {
        return currentPowerNPL(state)
      } else if (pathname === '/confirm-finish') {
        return 0
      } else {
        return state.currentPowerIncome
      }
    default: 
      return state.currentPowerIncome
  }
}

export default incomeHelper

