
import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import './Button.css'

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx('ws-btn', className)}
      {...props}
    />
  )
}
