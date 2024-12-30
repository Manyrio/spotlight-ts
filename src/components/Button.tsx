import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-zinc-800 font-semibold  hover:bg-zinc-700 active:bg-zinc-800  ',
  secondary:
    'bg-zinc-50 font-medium  hover:bg-zinc-100 active:bg-zinc-100 ',
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
    'inline-flex items-center bg-gray-200 text-white gap-2 justify-center rounded-md py-2 px-3  text-sm outline-offset-2 transition active:transition-none hover:brightness-[80%]',
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
