import PropTypes from 'prop-types'
import Rating from '@material-ui/lab/Rating'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1)
    }
  }
}))

HalfRating.propTypes = {
  ratingValue: PropTypes.any.isRequired
}

export default function HalfRating ({ ratingValue }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Rating name="half-rating-read" defaultValue={ratingValue} precision={0.5} readOnly />
    </div>
  )
}
