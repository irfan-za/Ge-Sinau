import { HTMLProps } from 'react'
import MuiCard from '@material-ui/core/Card'

interface CardProps extends HTMLProps<typeof MuiCard> {}

export default function Card (props: CardProps)
