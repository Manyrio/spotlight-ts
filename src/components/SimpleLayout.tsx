import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { useContext } from 'react'

export function SimpleLayout({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children?: React.ReactNode
}) {

  let { colors } = useContext(AppContext)
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="dark:text-gray-200 text-4xl font-bold tracking-tight dark:text-gray-200 text-zinc-800 sm:dark:text-gray-200 text-5xl dark:dark:text-gray-200 text-zinc-100"
          style={{ color: colors.attributes.accent }}
        >
          {title}
        </h1>
        <p className="mt-6 dark:text-gray-200 text-base dark:text-gray-200 text-zinc-600 dark:dark:text-gray-200 text-zinc-400"
          style={{ color: colors.attributes.indicator }}
        >
          {intro}
        </p>
      </header>
      {children && <div className="mt-16 sm:mt-20">{children}</div>}
    </Container>
  )
}

export function SimpleLayoutWithTitleFooter({
  title,
  footer,
  children,
}: {
  title: string
  footer: React.ReactNode
  children: React.ReactNode
}) {
  let { colors } = useContext(AppContext)

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="dark:text-gray-200 text-4xl font-bold tracking-tight dark:text-gray-200 text-zinc-800 sm:dark:text-gray-200 text-5xl dark:dark:text-gray-200 text-zinc-100"
          style={{ color: colors.attributes.accent }}
        >
          {title}
        </h1>
      </header>
      {footer}
      {children && <div className="mt-16 sm:mt-20">{children}</div>}
    </Container>
  )
}
