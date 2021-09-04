import React from 'react'

interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  value: string
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
}

export default function TextField (props: TextFieldProps)
