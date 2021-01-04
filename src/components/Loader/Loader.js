import React, { Component } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import PropTypes from 'prop-types';

class Loader extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div className="sweet-loading">
        <PacmanLoader size={20} color="#303f9f" loading={loading} />
      </div>
    );
  }
}

Loader.propTypes = {
  loading: PropTypes.bool,
};

export default Loader;
