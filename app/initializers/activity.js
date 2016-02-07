export function initialize(application) {
  application.options('service:activity', { singleton: false, instantiate: true });
}

export default {
  name: 'activity',
  initialize
};
