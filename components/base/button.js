import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import MuiButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'

/**
 * List button variants
 * @namespace
 */
export const ButtonVariant = {
  primary: 'primary',
  secondary: 'secondary'
}

/**
 * Button style classes
 */
const useStyles = makeStyles({
  primary: {
    '&.MuiButton-root': {
      width: '100%',
      borderRadius: '1rem',
      backgroundColor: '#0591fa',
      color: 'white',
      textTransform: 'none'
    }
  },
  secondary: {
    '&.MuiButton-root': {
      width: '100%',
      borderRadius: '1rem',
      border: '1px solid #5c5c5c',
      backgroundColor: 'white',
      color: '#5c5c5c',
      textTransform: 'none'
    }
  }
})

/**
 * JSX Button Component
 */
const Button = forwardRef((props, ref) => {
  const { children, variant, ...other } = props
  const classes = useStyles()
  let variantClasses = classes.primary

  if (variant === ButtonVariant.primary) {
    variantClasses = classes.primary
  } else if (variant === ButtonVariant.secondary) {
    variantClasses = classes.secondary
  }

  return (
    <MuiButton
      {...other}
      ref={ref}
      className={variantClasses}>
      {children}
    </MuiButton>
  )
})

Button.displayName = 'Button'

// ----------------------------- Warning --------------------------------
// | These PropTypes are generated from the TypeScript type definitions |
// |                To update them edit the d.ts file                   |
// ----------------------------------------------------------------------
Button.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node
}

export default Button
