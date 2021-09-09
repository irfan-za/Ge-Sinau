import { HTMLProps } from 'react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

/**
 * Proptypes of Card component
 */
interface TextAreaProps extends HTMLProps<typeof TextareaAutosize> {}

/**
 * JSX Card component
 * @param props - component props
 */
export default function TextArea (props: TextAreaProps)
