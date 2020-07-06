import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Notification.css';

const Notification = ({ error, hide, children }) => {
  useEffect(() => {
    setTimeout(() => {
      hide();
    }, 5000);
  });

  return (
    <div className={`notification ${error && 'notification--error'}`}>
      {children}
    </div>
  );
};

Notification.propTypes = {
  error: PropTypes.bool,
  hide: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Notification;
