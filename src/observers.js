import { getFirebase } from 'react-redux-firebase'
import DiffMatchPatch from 'diff-match-patch'
import { isCurrentPower } from './selectors/getCurrentPower'
import Board from './config/startingBoard'

const observeBoardChanges = (store) => {
  const dmp = new DiffMatchPatch();
  let currentBoardString = Board;

  function handleChange() {
    const state = store.getState()
    let nextBoardString = state.boardString;
    const currentGameId = state.firebase.profile.currentGameId
    if (currentGameId && nextBoardString !== currentBoardString && isCurrentPower(state)) {
      const firebase = getFirebase()
      let diffs = dmp.diff_main(currentBoardString, nextBoardString)
      dmp.diff_cleanupEfficiency(diffs)
      const patches = dmp.patch_make(currentBoardString, diffs)
      firebase.push(`/games/${currentGameId}/patches`, patches)
      currentBoardString = nextBoardString;
    }
  }
  store.subscribe(handleChange);
  handleChange();
}

const observeProfileChanges = (store) => {
  let currentProfile = {}

  function handleChange () {
    const nextFirebase = store.getState().firebase
    let nextProfile = nextFirebase.profile
    if (nextProfile.currentGameId && 
      nextProfile.currentGameId !== currentProfile.currentGameId) {
      currentProfile = nextProfile
      const firebase = getFirebase()
      const { currentGameId } = nextProfile
      firebase.ref(`/games/${currentGameId}`).once('value').then(snapshot => {
        const email = nextFirebase.auth.email
        const { powers, currentPowerIndex } = snapshot.val()
        const powersInOrder = [...powers.slice(currentPowerIndex), ...powers.slice(0, currentPowerIndex)]
        return powersInOrder.find(power => power.email === email)
      })
    }
  }
  store.subscribe(handleChange)
  handleChange()
}

const observe = store => {
  observeBoardChanges(store)
  observeProfileChanges(store)
}
export default observe
