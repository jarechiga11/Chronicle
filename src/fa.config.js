import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//Icons used
import { faChevronDown, faHome, faCalendar, faChartBar, faUser, faSignOutAlt, faSquare, faPlus, faAngleLeft, faBook, faShare, faArchive, faCog } from '@fortawesome/free-solid-svg-icons'


// List all individual icons used...
library.add(
  faChevronDown,
  faHome,
  faCalendar,
  faChartBar,
  faUser,
  faSignOutAlt,
  faSquare,
  faPlus,
  faAngleLeft,
  faBook,
  faShare,
  faArchive,
  faCog,
)

Vue.component('fa-icon', FontAwesomeIcon)