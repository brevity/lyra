'use strict';
var React = require('react'),
    WalkthroughStep = require('./walkthrough/Step'),
    Hints = require('./hints/Hints'),
    connect = require('react-redux').connect,
    getIn = require('../util/immutable-utils').getIn;

function mapStateToProps(state) {
  return {
    showWalkthrough: getIn(state, 'walkthrough.activeWalkthrough'),
    hintsOn: getIn(state, 'hints.on'),
    hintsDisplay: getIn(state, 'hints.display')
  };
}

var Walkthroughs = React.createClass({
  render: function() {
    var props = this.props,
        showWalkthrough = props.showWalkthrough,
        walkthroughStep = showWalkthrough ? <WalkthroughStep/> : '',
        hints = showWalkthrough &&
                props.hintsOn &&
                props.hintsDisplay ? <Hints /> : '';
    return (
      <div>
        {hints}
        {walkthroughStep}
      </div>
    );
  }
});

module.exports = connect(mapStateToProps)(Walkthroughs);