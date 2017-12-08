/**
 * File: /Users/fengchengpu/Project/moonlight/src/components/tabbar/Tabbar.jsx
 * Project: /Users/fengchengpu/Project/moonlight
 * Created Date: Friday November 10th 2017 2:39:53 pm
 * Author: chengpu
 * -----
 * Last Modified:Friday November 10th 2017 2:39:53 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { tabBarDecrementAndRedirect, linkTo } from '../../actions/kitAction.js';
import './tabbar.less';

const Tabbar = (props) => {
  const link = (e, actions, location, routing) => {
    e.stopPropagation();
    if (!routing.locationBeforeTransitions
        || routing.locationBeforeTransitions.pathname !== location.pathname) {
      actions.linkTo(location);
    }
  };
  const decrementAndRedirect = (e, actions, location) => {
    e.stopPropagation();
    actions.tabBarDecrementAndRedirect(location);
  };
  const { tabBarLocations, actions, routing } = props;
  const loopTabBars = data => (data.map((location, i) => {
    let active = 'tabbar-normal';
    if (location.state && location.state.mark) {
      if (routing.locationBeforeTransitions
        && routing.locationBeforeTransitions.state
        && routing.locationBeforeTransitions.state.mark
        && (routing.locationBeforeTransitions.state.mark === location.state.mark)) {
        active = 'tabbar-active';
      }
      if (routing.locationBeforeTransitions
        && routing.locationBeforeTransitions.pathname === location.pathname
        && location.state.mark) {
        active = 'tabbar-active';
      }
    }

    if (i === 0) {
      return (
        <span onClick={(e) => { link(e, actions, location, routing); }} className={`tabbar-cell ${active}`} key={location.state.mark}>
          <em className="fa fa-file-o" aria-hidden="true" />
          {location.state.mark}
        </span>);
    } else {
      return (
        <span onClick={(e) => { link(e, actions, location, routing); }} className={`tabbar-cell ${active}`} key={location.state.mark}>
          <em className="fa fa-file-o" aria-hidden="true" />
          {location.state.mark}
          <i className="fa fa-close" onClick={(e) => { decrementAndRedirect(e, actions, location); }} />
        </span>);
    }
  }));

  return (
    <div className="tabBarLocations">
      {loopTabBars(tabBarLocations)}
      <p className="separate-line" />
    </div>
  );
};
function mapState(state) {
  return { tabBarLocations: state.tabBarLocations, routing: state.routing };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators({ tabBarDecrementAndRedirect, linkTo }, dispatch),
  };
}

export default connect(mapState, mapDispatch)(Tabbar);
