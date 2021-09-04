import { HTMLProps } from 'react'
import MuiCard from '@material-ui/core/Card'

interface CardProps extends HTMLProps<typeof MuiCard> {
    className: string
}

export default function Card (props: CardProps)
