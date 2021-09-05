import { HTMLProps } from 'react'
import MuiTextField from '@material-ui/core/TextField'

/**
 * Proptypes of TextField component
 */
interface TextFieldProps extends HTMLProps<typeof MuiTextField> {}

/**
 * JSX TextField component
 * @param props - component props
 */
export default function TextField (props: TextFieldProps)
