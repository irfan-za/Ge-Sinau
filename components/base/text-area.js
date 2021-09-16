import { makeStyles } from '@material-ui/styles'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

const useStyles = makeStyles({
  textArea: {
    width: '100%',
    minHeight: '7rem',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    fontFamily: "'Roboto', sans-serif",
    padding: '0.8rem 1.5rem',
    borderRadius: '1.5rem',
    resize: 'none',
    '&:focus': {
      outline: 'none',
      border: '2px solid #0591fa',
      padding: 'calc(0.8rem - 1px) calc(1.5rem - 1px)'
    },
    '&:hover:not(:focus)': {
      border: '1px solid rgba(0, 0, 0, 0.87)'
    }
  }
})

export default function TextArea ({ ...rest }) {
  const classes = useStyles()
  const { className } = rest
  let customClassName = `${classes.textArea}`

  if (className) {
    customClassName += ` ${className}`
  }

  return (
    <TextareaAutosize {...rest} className={customClassName}/>
  )
}
