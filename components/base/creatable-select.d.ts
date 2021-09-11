/* eslint-disable no-undef */
import { ComponentProps } from 'react'
import ReactCreatableSelect from 'react-select/creatable'

export type CreatableProps = ComponentProps<typeof ReactCreatableSelect>

/**
 * JSX CreatableSelect component
 * @param props - component props
 */
export default function CreatableSelect (props: CreatableProps): JSX.Element
