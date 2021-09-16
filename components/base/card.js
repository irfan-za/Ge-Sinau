import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import MuiCard from '@material-ui/core/Card'
import MuiCardContent from '@material-ui/core/CardContent'

/**
 * Card style classes
 */
const useStyles = makeStyles({
  card: {
    '&.MuiCard-root': {
      boxShadow: '0 6px 10px 2px rgba(0, 0, 0, 0.25)',
      borderRadius: '0.8rem'
    }
  }
})

/**
 * JSX Card component
 * @param {*} props
 * @returns
 */
export default function Card (props) {
  const { children, ...other } = props
  const classes = useStyles()
  let customClassName = `${classes.card}`

  if (props.className) {
    customClassName += ` ${props.className}`
  }

  return (
    <MuiCard {...other} className={customClassName}>
      <MuiCardContent>
        { children }
      </MuiCardContent>
    </MuiCard>
  )
}

// ----------------------------- Warning --------------------------------
// | These PropTypes are generated from the TypeScript type definitions |
// |                To update them edit the d.ts file                   |
// ----------------------------------------------------------------------
Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}
