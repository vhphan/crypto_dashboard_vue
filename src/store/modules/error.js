export default ({
  state: {
    show: false,
    text: 'Error'
  },
  mutations: {
    showError(state, message) {
      state.show = true;
      state.text = message;
    }
  }
});