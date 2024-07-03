import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-zinc-800 font-semibold dark:text-gray-200 text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:dark:text-gray-200 text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:dark:text-gray-200 text-zinc-100/70',
  secondary:
    'bg-zinc-50 font-medium dark:text-gray-200 text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:dark:text-gray-200 text-zinc-900/60 dark:bg-zinc-800/50 dark:dark:text-gray-200 text-zinc-300 dark:hover:bg-zinc-800 dark:hover:dark:text-gray-200 text-zinc-50 dark:active:bg-zinc-800/50 dark:active:dark:text-gray-200 text-zinc-50/70',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
)

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  className = clsx(
    'inline-flex items-center !bg-gray-200 !text-gray-700 gap-2 justify-center rounded-md py-2 px-3 dark:text-gray-200 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
