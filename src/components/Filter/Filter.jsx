import PropTypes from 'prop-types';

const Filter = ({ title, value, onChange }) => {
  return (
    <label>
      <span>{title}</span>
      <input type="text" name="filter" value={value} onChange={onChange} />
    </label>
  );
};

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
