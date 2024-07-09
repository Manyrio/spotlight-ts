import Link from 'next/link'
import clsx from 'clsx'
import { useContext } from 'react'
import { AppContext } from '@/app/providers'

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Card<T extends React.ElementType = 'div'>({
  as,
  className,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
  as?: T
  className?: string
}) {
  let Component = as ?? 'div'

  return (
    <Component
      className={clsx(className, 'group relative flex flex-col items-start')}
    >
      {children}
    </Component>
  )
}

Card.Link = function CardLink({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  const { colors } = useContext(AppContext)

  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
      <Link {...props}
        style={{ color: colors.attributes.accent }}
      >
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

Card.Title = function CardTitle<T extends React.ElementType = 'h2'>({
  as,
  href,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'href'> & {
  as?: T
  href?: string
}) {
  let Component = as ?? 'h1'
  const { colors } = useContext(AppContext)

  return (
    <Component
      className="dark:text-gray-200 text-2xl  font-semibold tracking-tight dark:text-gray-200 text-zinc-800 dark:dark:text-gray-200 text-zinc-100"
      style={{ color: colors.attributes.accent }}
    >
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  )
}

Card.Description = function CardDescription({
  children,
}: {
  children: React.ReactNode
}) {
  const { colors } = useContext(AppContext)

  return (
    <p
      className="relative z-10 mt-2 text-md "
      style={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: 6,
        lineHeight: '1.5em',
        color: colors.attributes.indicator,
      }}>
      {children}
    </p>
  )
}

Card.Cta = function CardCta({ children }: { children: React.ReactNode }) {
  const { colors } = useContext(AppContext)

  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium "
      style={{ color: colors.attributes.primary }}
    >
      {children}
      < ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div >
  )
}

Card.Eyebrow = function CardEyebrow<T extends React.ElementType = 'p'>({
  as,
  decorate = false,
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'decorate'> & {
  as?: T
  decorate?: boolean
}) {
  let Component = as ?? 'p'
  const { colors } = useContext(AppContext)

  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center dark:text-gray-200 text-sm dark:text-gray-200 text-zinc-400 dark:dark:text-gray-200 text-zinc-500',
        decorate && 'pl-3.5',
      )}
      style={{ color: colors.attributes.accent }}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  )
}
