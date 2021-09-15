import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button'

/**
 * Merge with MuiButton props and replace variant type attributes
 */
interface ButtonProps extends MuiButtonProps {
    variant: 'primary' | 'secondary'
}

/** JSX Button Component props definition */
export default function Button (props: ButtonProps)
