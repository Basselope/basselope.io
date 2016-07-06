// TODO refactor animation to store node on 'end' event
export const PLOT_TRANS = 'FETCH_REDDIT';

export const fetchReddit = (n) => {
  let node = () => (n);

  return {
    type: PLOT_TRANS,
    payload: node
  };
};