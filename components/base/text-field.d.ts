import { HTMLProps } from 'react'
import MuiTextField from '@material-ui/core/TextField'

interface TextFieldProps extends HTMLProps<typeof MuiTextField> {}

export default function TextField (props: TextFieldProps)
