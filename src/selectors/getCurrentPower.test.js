import powers from '../config/initialPowers'
import { getLoggedInPower } from './getCurrentPower'

describe('getLoggedInPower', () => {
  const { resultFunc } = getLoggedInPower
  it('is empty object if no firebase profile exists', () => {
    expect(resultFunc(undefined)).toMatchObject({})
  })
  describe('when logged in as current power', () => {
    const currentPowerIndex = 3
    describe('and playing no other powers', () => {
      const profilePowers = { UK: 'Chuch' }
      it("identifies the user's screen name", () => {
        const loggedInPower = resultFunc(profilePowers, powers, currentPowerIndex)
        expect(loggedInPower.name).toEqual('UK')
        expect(loggedInPower.screenname).toEqual('Chuch')
      })
    })
    describe('and playing other powers', () => {
      const profilePowers = { USSR: 'Ivan', UK: 'Chuch', US: 'Franklin' }
      it("identifies the user's screen name", () => {
        const loggedInPower = resultFunc(profilePowers, powers, currentPowerIndex)
        expect(loggedInPower.name).toEqual('UK')
        expect(loggedInPower.screenname).toEqual('Chuch')
      })
    })
  })
  describe('when logged in but not as current power', () => {
    const currentPowerIndex = 4
    describe('and playing only a power which just took a turn', () => {
      const profilePowers = { UK: 'Chuch' }
      it("identifies the user's screen name", () => {
        const loggedInPower = resultFunc(profilePowers, powers, currentPowerIndex)
        expect(loggedInPower.name).toEqual('UK')
        expect(loggedInPower.screenname).toEqual('Chuch')
      })
    })
    describe('and playing other powers', () => {
      const profilePowers = { USSR: 'Ivan', UK: 'Chuch', US: 'Franklin' }
      it("identifies the user's next screen name", () => {
        const loggedInPower = resultFunc(profilePowers, powers, currentPowerIndex)
        expect(loggedInPower.name).toEqual('US')
        expect(loggedInPower.screenname).toEqual('Franklin')
      })
    })
  })
})
