import PropTypes from 'prop-types';

export const Error = ({ texterror }) => {
  return (
    <div role="alert">
      <p text={texterror}>{texterror}</p>
    </div>
  );
};

Error.propTypes = {
  texterror: PropTypes.string.isRequired,
};
