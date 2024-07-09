"use client"
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { useContext } from 'react'
import { AppContext } from './providers'

export default function NotFound() {
  let { colors } = useContext(AppContext)
  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <p className="dark:text-gray-200 text-base font-semibold dark:text-gray-200 text-zinc-400 dark:dark:text-gray-200 text-zinc-500" style={{color: colors.attributes.hint}}>
          404
        </p>
        <h1 className="mt-4 dark:text-gray-200 text-4xl font-bold tracking-tight dark:text-gray-200 text-zinc-800 sm:dark:text-gray-200 text-5xl dark:dark:text-gray-200 text-zinc-100" style={{color: colors.attributes.accent}}>
          Page not found
        </h1>
        <p className="mt-4 dark:text-gray-200 text-base dark:text-gray-200 text-zinc-600 dark:dark:text-gray-200 text-zinc-400" style={{color: colors.attributes.indicator}}>
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button href="/" variant="secondary" className="mt-4" style={{background: colors.attributes.primary}}>
          Go back home
        </Button>
      </div>
    </Container>
  )
}
