import { useRef } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

interface FlashAlertObject {
  open: boolean
  status: string
  message: string
}

type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;

interface FlashAlertProps {
  open: boolean
  message: string
  status: Severity
  autoHideDuration?: number
  onClose?: Function
}

export default function FlashAlert (props: FlashAlertProps) {
  const snackBarRef = useRef(null)
  const muiAlertRef = useRef(null)

  /**
   * Handle flash alert close event
   * @param event
   * @param reason
   */
  const handleClose = (event: any) => {
    if (props.onClose) {
      props.onClose(event)
    }
  }

  return (
    <>
      <Snackbar ref={snackBarRef} open={props.open} autoHideDuration={props.autoHideDuration || null} onClose={handleClose}>
        <MuiAlert ref={muiAlertRef} elevation={6} variant="filled" onClose={handleClose} severity={props.status}>
          {props.message}
        </MuiAlert>
      </Snackbar>
    </>
  )
}

/**
 * Default state for flash alert
 * @namespace
 * @constant
 */
export const FlashAlertState = { open: false, status: 'info', message: '' }

/**
 * List all of flash alert status
 * @namespace
 * @enum
 */
export const FlashAlertStatus = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success'
}

/**
 * List all handler event for flash alert component
 * @namespace
 */
export const FlashAlertHandler = {
  close (state: FlashAlertObject, dispatch: (value: FlashAlertObject) => void) {
    dispatch({ open: false, status: state.status, message: state.message })
  },
  open (message: string, status: string, dispatch: (value: FlashAlertObject) => void) {
    dispatch({ open: true, status: status, message: message })
  }
}
