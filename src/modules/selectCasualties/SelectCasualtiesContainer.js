import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import SelectCasualtiesModal from './SelectCasualtiesModal'
import { combatants } from '../planCombat'
import { getFocusTerritory, attackerCasualties } from './selectors'
import { strengths, defenderCasualties, attackerCasualtyCount } from '../combatRolls'

const mapStateToProps = (state) => ({
  territory: getFocusTerritory(state),
  combatants: combatants(state),
  strengths: strengths(state),
  defenderCasualties: defenderCasualties(state),
  attackerCasualties: attackerCasualties(state),
  attackerCasualtyCount: attackerCasualtyCount(state)
})

const toggleCasualtyStatus = (id, territoryIndex) => {
  return (dispatch) => {
    dispatch({
      type: 'TOGGLE_CASUALTY',
      id,
      territoryIndex
    })
  }
}

const removeCasualties = (dispatch) => {
  return (dispatch) => {
    dispatch(push('/resolve-combat'))
    dispatch({ type: 'RESOLVE_COMBAT' })
  }
}

const defenderWins = (territoryIndex) => {
  return (dispatch) => {
    dispatch({
      type: 'DEFENDER_WINS',
      territoryIndex
    })
  }
}

const attackerWins = (territoryIndex) => {
  return (dispatch) => {
    dispatch({
      type: 'ATTACKER_WINS',
      territoryIndex
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ 
    toggleCasualtyStatus,
    removeCasualties
  }, dispatch)
}

const SelectCasualtiesContainer = connect(mapStateToProps, mapDispatchToProps)(SelectCasualtiesModal)

export default SelectCasualtiesContainer

