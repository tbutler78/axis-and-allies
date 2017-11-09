import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlanCombatModal from './PlanCombatModal'
import { 
  combatants,
  getCurrentPower, 
  getFocusTerritory, 
  getCommittedIds,
  hasIndustrialComplex,
  landingSlots,
  unitsInRange, 
} from './selectors'
import { PLAN_ATTACKS } from '../../actions'

const mapStateToProps = (state) => ({
  combatants: combatants(state),
  committed: getCommittedIds(state),
  currentPower: getCurrentPower(state),
  hasIndustry: hasIndustrialComplex(state),
  landingSlots: landingSlots(state),
  territory: getFocusTerritory(state),
  unitsInRange: unitsInRange(state)
})

const planOtherAttack = () => {
  return {
    type: PLAN_ATTACKS
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ 
    planOtherAttack
  }, dispatch)
}

const PlanCombatContainer = connect(mapStateToProps, mapDispatchToProps)(PlanCombatModal)

export default PlanCombatContainer

