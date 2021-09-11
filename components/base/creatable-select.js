import ReactCreatableSelect from 'react-select/creatable'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  reactSelect: {
    '& > span + div': {
      borderRadius: '2rem',
      padding: '0.1rem 0rem 0.1rem 1.5rem'
    },
    '& > span + div > div:first-child': {
      padding: '0'
    },
    '&:focus > span + div': {
      borderRadius: '2rem',
      borderColor: '#0591fa'
    },
    '& > span + div:hover': {
      boxShadow: 'none',
      borderRadius: '2rem',
      borderColor: 'rgba(0, 0, 0, 0.87)',
      borderWidth: '1px',
      padding: '0.1rem 0rem 0.1rem 1.5rem'
    },
    '& > span + div:focus-within': {
      boxShadow: 'none',
      borderRadius: '2rem',
      borderColor: '#0591fa',
      borderWidth: '2px',
      padding: 'calc(0.1rem - 1px) 0rem calc(0.1rem - 1px) calc(1.5rem - 1px)'
    }
  }
})

function CreatableSelect ({ ...rest }) {
  const classes = useStyles()

  return <ReactCreatableSelect className={classes.reactSelect} {...rest}/>
}

export default CreatableSelect
