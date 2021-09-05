import { HTMLProps } from 'react'
import MuiCard from '@material-ui/core/Card'

/**
 * Proptypes of Card component
 */
interface CardProps extends HTMLProps<typeof MuiCard> {
    className: string
}

/**
 * JSX Card component
 * @param props - component props
 */
export default function Card (props: CardProps)
