import { ChangeEvent } from 'react'

/**
 * Handle onChange React input component trigger
 * @param event - input event
 * @param dispatch - state dispatcher function
 * @param maxLength - maximum input length
 */
const handleInputChange = (event: ChangeEvent<any>, dispatch: Function, maxLength: number = 0) => {
  if (maxLength > 0) {
    const str = `${event.target.value}`
    if (str.length <= maxLength) {
      dispatch(event.target.value)
    }
  } else {
    dispatch(event.target.value)
  }
}

/**
 * Handle onChange React file component trigger
 * @param event - input file event
 * @param dispatch - state dispatcher
 */
function handleInputFileChange (event: ChangeEvent<any>, dispatch: (file: File) => void) {
  const files = event.target.files
  if (files.length > 0) {
    dispatch(files[0])
  }
}

/**
 * Handle onChange React file component trigger with multiple files input
 * @param event - file input event
 * @param dispatch - state dispatcher
 */
function handleInputFilesChange (event: ChangeEvent<any>, dispatch: (file: Array<File>) => void) {
  dispatch(event.target.files)
}

/**
 * Set state for React component ref
 * @param element - JSX element
 * @param dispatch - state dispatcher
 */
function refCallback (element: HTMLElement|null, dispatch: (element: HTMLElement|null) => void) {
  dispatch(element)
}

export {
  handleInputChange,
  handleInputFileChange,
  handleInputFilesChange,
  refCallback
}
