import EventBus, { ACTIONS } from '../eventBus';

export const showSnackbar = message => {
  EventBus.$emit(ACTIONS.SNACKBAR, message);
};