import { HTMLProps } from 'react'
import MuiButton from '@material-ui/core/Button'

/**
 * Proptypes of Button component
 */
interface ButtonProps extends HTMLProps<typeof MuiButton> {
    variant: string
}

/**
 * ButtonVariant namespace types
 * @namespace
 */
export type ButtonVariant = {
    primary: string
    secondary: string
}

/** JSX Button Component props definition */
export default function Button (props: ButtonProps)
