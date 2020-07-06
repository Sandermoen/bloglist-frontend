import React, { useState, Fragment, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Toggleable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hiddenStyle = { display: visible ? 'none' : '' };
  const visibleStyle = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible((previous) => !previous);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <Fragment>
      <div style={hiddenStyle}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={visibleStyle}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </Fragment>
  );
});

Toggleable.displayName = 'Toggleable';

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Toggleable;
