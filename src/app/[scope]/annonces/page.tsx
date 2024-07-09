'use client';

import { type Metadata } from 'next'

import { Component, useState } from 'react'
import { Card } from '@/components/Card'
import { SimpleLayout, SimpleLayoutWithTitleFooter } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllArticles } from '@/models/articles'
import { Annonce, TypeTransaction, FinancesImmobilieres, TypePropriete, ClasseEnergie, ClasseGaz, TypeChauffage, EtatPropriete, OrientationPropriete } from '@/models/annonce'
import { formatDate } from '@/models/formatDate'
import { formatLocalisation } from '@/models/localisation'
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverGroup, PopoverPanel, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import AnnoncesContent from './content';


export default function Annonces() {

  return (
    <AnnoncesContent></AnnoncesContent>
  )
}
