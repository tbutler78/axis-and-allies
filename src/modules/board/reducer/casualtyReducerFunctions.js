import unitTypes from '../../../config/unitTypes'

const unitsIncludingDamaged = (units, undamagedUnits, casualties) => {
  const damagedUnits = units.filter(unit => unit.ids.some(id => casualties.includes(id)) && unitTypes[unit.name].canTakeDamage)
  const replacements = damagedUnits.map(unit => {
    const damaged = unitTypes[`damaged ${unit.name}`]
    return { 
      ...unit, 
      ids: unit.ids.filter(id => casualties.includes(id)), 
      name: damaged.name, 
      attack: damaged.attack, 
      defend: damaged.defend, 
      movement: damaged.movement, 
      landingSlots: damaged.landingSlots 
    }
  })
  return undamagedUnits.concat(replacements).filter(u => u.ids.length)
}

const survivingUnitsFrom = ({ unitsFrom, attackerCasualties }, complete) => {
  const casualties = attackerCasualties || [];
  const undamagedUnits = unitsFrom.map(unit => (
    { 
      ...unit, 
      ids: unit.ids.filter(id => !casualties.includes(id)), 
      mission: (complete ? 'complete' : unit.mission) 
    }
  ))
  return unitsIncludingDamaged(unitsFrom, undamagedUnits, casualties)
}

const survivingUnits = (units, casualties) => {
  const undamagedUnits = units.map(unit => (
    { ...unit, ids: unit.ids.filter(id => !casualties.includes(id)) }
  ))
  return unitsIncludingDamaged(units, undamagedUnits, casualties)
}

export const removeCasualties = (state, action) => {
  const { territoryIndex, defenderCasualties, currentPower } = action;
  return state.territories.map((territory, index) => {
    if (index === territoryIndex) {
      return { 
        ...territory, 
        unitsFrom: survivingUnitsFrom(territory),
        attackerCasualties: [],
        units: survivingUnits(territory.units, defenderCasualties)
      }
    } else if (territory.unitsFrom.length && !territory.units.length) {
      //TODO: what about sea spaces? 
      return {
        ...territory,
        unitsFrom: [],
        units: territory.unitsFrom,
        currentPower,
        newlyConquered: true
      }
    }
    return territory;
  });
}

export const toggleCasualties = (state, action) => {
  const { id, territoryIndex } = action;
  return state.territories.map((territory, index) => {
    if (index === territoryIndex) {
      territory.attackerCasualties = territory.attackerCasualties || [];
      if (territory.attackerCasualties.includes(id)) {
        return { ...territory, attackerCasualties: territory.attackerCasualties.filter(otherId => otherId !== id) }
      } else {
        return { ...territory, attackerCasualties: [...territory.attackerCasualties, id ] }
      }
    }
    return territory;
  });
}

export const defenderWins = (state, action) => {
  const { territoryIndex, defenderCasualties } = action;
  return state.territories.map((territory, index) => {
    if (index === territoryIndex) {
      return { 
        ...territory, 
        unitsFrom: [],
        units: survivingUnits(territory.units, defenderCasualties)
      }
    }
    return territory;
  });
}

//TODO: probably need victor in unitsFrom not units, so I can ensure they don't move during noncom
export const attackerWins = (state, action) => {
  const { territoryIndex, currentPower } = action;
  return state.territories.map((territory, index) => {
    if (index === territoryIndex) {
      const survivingUnits = survivingUnitsFrom(territory);
      const groundUnits = survivingUnits.filter(unit => unit.land);
      return { 
        ...territory, 
        currentPower: groundUnits.length ? currentPower : territory.currentPower,
        unitsFrom: [],
        units: survivingUnitsFrom(territory, true),
        newlyConquered: groundUnits.length
      }
    }
    return territory;
  });
}
