import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSearchId, getTickets } from '../../redux/reducer';

import App from './App';

class AppContainer extends Component {
  componentDidMount() {
    this.props.getSearchId();
    if (this.props.searchId) {
      this.props.getTickets(this.props.searchId);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchId !== prevProps.searchId || this.props.filters !== prevProps.filters) {
      this.props.getTickets(this.props.searchId);
    }
  }

  render() {
    return <App { ...this.props } />;
  }
}

const mapStateToProps = ({ searchId, tickets, methodSort, filters }) => ({
  searchId,
  tickets,
  methodSort,
  filters
});

export default connect(mapStateToProps, { getSearchId, getTickets })(AppContainer);
