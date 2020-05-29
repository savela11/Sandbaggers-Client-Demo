import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)
// $DarkGreen: #425a41;
// $DarkBlue: #17252a;
// $Crimson: rgba(139, 38, 53, 0.7);
// $Black: #1a1423;
// $LightGreen: #b3e2c5;
// $White: #fff;
// $YankeeBlue: #102542;
// $primary: #425a41;
// $secondary: #17252a;
// $danger: #8b2635;
// $info: #117a8b;
export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#425a41',
        secondary: '#17252a',
        danger: '#8b2635',
      },
    },
  },
})
