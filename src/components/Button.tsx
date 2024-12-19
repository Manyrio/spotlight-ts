import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800  text-zinc-100/70 text-zinc-100/70',
  secondary:
    'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100  text-zinc-900/60  text-zinc-300  text-zinc-50  text-zinc-50/70',
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
  const isButton = props.href === undefined;

  className = clsx(
    'inline-flex items-center bg-gray-200 text-gray-200 gap-2 justify-center rounded-md py-2 px-3  text-sm outline-offset-2 transition active:transition-none hover:brightness-[80%]',
    variantStyles[variant],
    `${isButton && props['disabled'] ? 'opacity-50' : ''}`,
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
