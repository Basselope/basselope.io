export const RESET_STATE = 'RESET_STATE'

export const resetState = () => {
  return {
    type: RESET_STATE,
    payload: null
  };
}