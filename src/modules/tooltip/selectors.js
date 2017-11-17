import { createSelector } from 'reselect'
import { getCurrentPowerName } from '../../selectors/getCurrentPower'
import { 
  getUnits as getUnconsolidatedUnits,
  getTerritoryData 
} from '../../selectors/getTerritory'
import { industry, nonIndustry } from '../../selectors/units'
import { powerData } from '../../config/initialPowers'
export { getCurrentPowerName }

export const getUnits = createSelector(
  getUnconsolidatedUnits,
  units => (units.filter(nonIndustry))
)

export const getIndustry = createSelector(
  getUnconsolidatedUnits,
  units => units.find(industry)
)

export const getTerritoryName = createSelector(
  getTerritoryData,
  territory => territory.name
)

export const getTerritoryValue = createSelector(
  getTerritoryData,
  territory => territory.ipc_value
)

export const getSide = createSelector(
  getCurrentPowerName,
  currentPower => powerData[currentPower].side
)
