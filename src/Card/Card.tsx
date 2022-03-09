import React, { ReactNode } from 'react'
import clsx from 'clsx'

import { IComponentBaseProps, ComponentSize } from '../types'

import CardActions, { CardActionsProps as ActionProps } from './CardActions'
import CardBody, { CardBodyProps as BodyProps } from './CardBody'
import CardTitle, { CardTitleProps as TitleProps } from './CardTitle'

export type CardActionsProps = ActionProps
export type CardBodyProps = BodyProps
export type CardTitleProps = TitleProps

export interface CardProps extends IComponentBaseProps {
  children?: ReactNode
  bordered?: boolean
  imageFull?: boolean

  // responsive props
  normal?: ComponentSize | boolean // Applies default paddings
  compact?: ComponentSize | boolean // Applies smaller padding
  side?: ComponentSize | boolean // The image in <figure> will be on to the side
}

interface ModifierMap {
  [key: string]: {
    [key: string]: string | undefined
  }
}

const DYNAMIC_MODIFIERS: ModifierMap = {
  compact: {
    true: 'card-compact',
    xs: 'xs:card-compact',
    sm: 'sm:card-compact',
    md: 'md:card-compact',
    lg: 'lg:card-compact',
  },
  normal: {
    true: 'card-normal',
    xs: 'xs:card-normal',
    sm: 'sm:card-normal',
    md: 'md:card-normal',
    lg: 'lg:card-normal',
  },
  side: {
    true: 'card-side',
    xs: 'xs:card-side',
    sm: 'sm:card-side',
    md: 'md:card-side',
    lg: 'lg:card-side',
  },
}

const Card = ({
  className,
  bordered = true,
  imageFull,
  normal,
  compact,
  side,
  ...props
}: CardProps) => (
  <div
    className={clsx('card', className, {
      'card-bordered': bordered,
      'image-full': imageFull,
      [(compact && DYNAMIC_MODIFIERS.compact[compact.toString()]) || '']:
        compact,
      [(normal && DYNAMIC_MODIFIERS.normal[normal.toString()]) || '']: normal,
      [(side && DYNAMIC_MODIFIERS.side[side.toString()]) || '']: side,
    })}
    {...props}
  />
)

Card.Actions = CardActions
Card.Body = CardBody
Card.Title = CardTitle

export default Card
