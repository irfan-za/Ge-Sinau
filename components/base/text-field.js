import MuiTextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  textField: {
    width: '100%',
    padding: '0rem',
    fontFamily: "'Poppins', sans-serif",
    '& .MuiInputBase-root': {
      borderRadius: '2rem'
    },
    '& .MuiInputBase-root:focus-within': {
      borderColor: '#0591fa',
      borderWidth: '2px'
    },
    '& .MuiInputBase-root:focus-within .MuiInputBase-input': {
      padding: 'calc(0.6rem - 2px) calc(1.25rem - 2px)'
    },
    '& .MuiInputBase-input': {
      padding: '0.6rem 1.25rem'
    },
    '& .MuiOutlinedInput-root:focus-within .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0591fa',
      borderWidth: '0'
    }
  }
})

export default function TextField ({ ...rest }) {
  const classes = useStyles()
  const { className } = rest
  let customClassName = `${classes.textField}`

  if (className) {
    customClassName += ` ${className}`
  }

  return (
    <MuiTextField {...rest} className={customClassName} variant='outlined'/>
  )
}
