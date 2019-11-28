import Types from "../../action/types"

const defaultState = {
	theme: '#ff6268'
}

export default function onAction(state = defaultState, action) {
	if (action.type === Types.THEME_CHANGE) {
		const newState = {...state}
		newState.theme = action.theme
		return newState
	}

	return state
}