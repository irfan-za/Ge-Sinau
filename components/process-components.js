import PropTypes from 'prop-types'

/**
 * List process component status
 * @namespace
 * @enum
 */
const componentStatus = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failed: 'FAILED',
  error: 'ERROR',
  unknown: 'UNKNOWN'
}

ProcessComponents.propTypes = {
  status: PropTypes.string.isRequired,
  renderOnStatus: PropTypes.string.isRequired
}

function ProcessComponents (props) {
  const isCanRenderComponent = props.status === props.renderOnStatus

  if (isCanRenderComponent) {
    return (props.children)
  } else {
    return null
  }
}

ProcessComponentsExpression.propTypes = {
  isCanRender: PropTypes.bool.isRequired,
  children: PropTypes.any
}

function ProcessComponentsExpression (props) {
  if (props.isCanRender) {
    return props.children
  }

  return null
}

export default ProcessComponents
export { ProcessComponents, ProcessComponentsExpression, componentStatus }
