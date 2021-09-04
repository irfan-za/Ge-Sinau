import PropTypes from 'prop-types'

export default function TextField (props) {
  const {
    className,
    required = false,
    type = 'text',
    placeholder,
    value = '',
    onChange
  } = props

  return (
    <div className={`bg-gray-200 px-4 py-2 rounded-2xl ${className || ''}`}>
      <input
        required={required}
        value={value}
        className="bg-transparent focus:outline-none"
        type={type}
        placeholder={placeholder}
        onChange={onChange} />
    </div>
  )
}

// ----------------------------- Warning --------------------------------
// | These PropTypes are generated from the TypeScript type definitions |
// |                To update them edit the d.ts file                   |
// ----------------------------------------------------------------------
TextField.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}
