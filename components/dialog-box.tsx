import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

interface DialogBoxProps {
  open: boolean
  title: string
  message: string
  onResponse?: Function
}

function DialogBox (props: DialogBoxProps) {
  /**
   * Triggered when dialog actions button clicked
   * @param response - dialog response
   */
  const handleResponse = (response: boolean) => {
    if (props.onResponse) {
      props.onResponse(response)
    }
  }

  return (
    <>
      <Dialog open={props.open} >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#0591fa' }} onClick={() => { handleResponse(false) }} color="primary">
            No
          </Button>
          <Button style={{ color: '#0591fa' }} onClick={() => { handleResponse(true) }} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

/**
 * Dialog handler namespace
 * @namespace
 */
const DialogBoxHandler = {
  open: (dispatch: (value: boolean) => void) => {
    dispatch(true)
  },
  close: (dispatch: (value: boolean) => void) => {
    dispatch(false)
  },
  response: (
    responseValue: boolean,
    callback: (value: Boolean) => void,
    dispatch: (value: Boolean) => void
  ) => {
    callback(responseValue)
    dispatch(false)
  }
}

export default DialogBox
export {
  DialogBox,
  DialogBoxHandler
}
