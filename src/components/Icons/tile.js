import { PROJECT_CATEGORY } from '../../const'

import ActiveCommunityTilePath from '../../../images/tiles/community-active.svg'
import InactiveCommunityTilePath from '../../../images/tiles/community-inactive.svg'
import ActiveEducationTilePath from '../../../images/tiles/education-active.svg'
import InactiveEducationTilePath from '../../../images/tiles/education-inactive.svg'
import ActiveGovernmentTilePath from '../../../images/tiles/government-active.svg'
import InactiveGovernmentTilePath from '../../../images/tiles/government-inactive.svg'
import ActiveHealthTilePath from '../../../images/tiles/health-active.svg'
import InactiveHealthTilePath from '../../../images/tiles/health-inactive.svg'
import ActivePoliceTilePath from '../../../images/tiles/police-active.svg'
import InactivePoliceTilePath from '../../../images/tiles/police-inactive.svg'
import ActiveRoadTilePath from '../../../images/tiles/road-active.svg'
import InactiveRoadTilePath from '../../../images/tiles/road-inactive.svg'
import ActiveTransportTilePath from '../../../images/tiles/transport-active.svg'
import InactiveTransportTilePath from '../../../images/tiles/transport-inactive.svg'
import ActiveUtilitiesTilePath from '../../../images/tiles/utilities-active.svg'
import InactiveUtilitiesTilePath from '../../../images/tiles/utilities-inactive.svg'

export default {
  [PROJECT_CATEGORY.COMMUNITY]: {
    active: ActiveCommunityTilePath,
    inactive: InactiveCommunityTilePath
  },
  [PROJECT_CATEGORY.EDUCATION]: {
    active: ActiveEducationTilePath,
    inactive: InactiveEducationTilePath
  },
  [PROJECT_CATEGORY.GOVERNMENT]: {
    active: ActiveGovernmentTilePath,
    inactive: InactiveGovernmentTilePath
  },
  [PROJECT_CATEGORY.HEALTH]: {
    active: ActiveHealthTilePath,
    inactive: InactiveHealthTilePath
  },
  [PROJECT_CATEGORY.POLICE]: {
    active: ActivePoliceTilePath,
    inactive: InactivePoliceTilePath
  },
  [PROJECT_CATEGORY.ROADS]: {
    active: ActiveRoadTilePath,
    inactive: InactiveRoadTilePath
  },
  [PROJECT_CATEGORY.TRANSPORT]: {
    active: ActiveTransportTilePath,
    inactive: InactiveTransportTilePath
  },
  [PROJECT_CATEGORY.UTILITIES]: {
    active: ActiveUtilitiesTilePath,
    inactive: InactiveUtilitiesTilePath
  },
}
