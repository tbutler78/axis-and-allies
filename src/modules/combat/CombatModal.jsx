import React from 'react';
import Forces from '../../components/Forces';
import '../../assets/styles/combat.css';

const CombatModal = ({ 
  combatants, 
  strengths, 
  territory,
  attackerCasualties,
  defenderCasualties,
  rollForCombat 
}) => {
  const { attackers, defenders } = combatants;
  return (
    <div className="battleBoard">
      <h1>Combat in {territory.name}</h1>
      <h2>Defender</h2>
      <div className="defenderSpace"> 
        {strengths.map(n => {
          return <Forces 
                    key={n}
                    filterFct={id => !defenderCasualties.includes(id)}
                    units={defenders.filter(u => u.defend === n)}/>
        })}
      </div>
      <div className="midSpace">
        {strengths.map(n => {
          return <div key={n}>{n}{n > 1 ? <span>or less</span> : ''}</div>
        })}                       
      </div>
      <div className="attackerSpace"> 
        {strengths.map(n => {
          return (
            <Forces
              key={n}
              units={attackers.filter(u => u.attack === n)}
            />
          )
        })}
      </div>
      <h2>Attacker</h2>
      <nav>
        <button>Back</button>
        <button 
          onClick={rollForCombat.bind(null, territory.index)}
        >Roll for combat</button>
      </nav>
    </div>
  )
}
export default CombatModal
