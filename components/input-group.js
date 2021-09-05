import PropTypes from 'prop-types'

InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  className: PropTypes.string
}

function InputGroup ({ label, children, className }) {
  return (
    <div className={`mb-6 ${(className) || ''}`}>
      <div className="mb-2 font-roboto text-lg font-medium text-gray-800">{label}</div>
      { children }
    </div>
  )
}

export default InputGroup
