import React from 'react'
import PropTypes from 'prop-types'
import * as AccordionComponent from '@radix-ui/react-accordion'

// import { PlusIcon } from 'icons'
import './Accordion.scss'

import Content from 'components/content/Content'

const propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  title: PropTypes.string,
}

const defaultProps = {
  className: '',
  items: [],
  title: '',
}

function Accordion({
  className,
  items,
  title,
}) {
  const classes = `accordion ${className}`

  return (
    <div className={classes}>
        {title && (
            <header className="accordion__header">
                <h2>{title}</h2>
            </header>
        )}
        <AccordionComponent.Root className="acccordion__list" collapsible>
          {items.map(({ accordion_content, accordion_title }, index) => {
            const title = accordion_title?.text;
            const content = accordion_content?.raw;
            const id = title?.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g , '-').toLowerCase()

            return (
              <AccordionComponent.Item className="accordion__item" key={`accordion-item-${index}`} value={`accordion-item-${index}`} id={id}>
                <AccordionComponent.Header className="accordion__item-header">
                  <AccordionComponent.Trigger className="accordion__item-trigger">
                    <span className="accordion__item-title">{title}</span>
                    <div className="accordion__item-icon-wrapper">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.8643 4.25647L7.37665 11.7441" stroke="currentColor" stroke-width="1.78133"/>
                        <path d="M8.62402 11.7435L1.13642 4.25592" stroke="currentColor" stroke-width="1.78133"/>
                      </svg>
                    </div>
                  </AccordionComponent.Trigger>
                </AccordionComponent.Header>
                <AccordionComponent.Content className="accordion__item-content">
                  <Content content={content} />
                </AccordionComponent.Content>
              </AccordionComponent.Item>
            )
          })}
        </AccordionComponent.Root>
    </div>
  )
}

Accordion.propTypes = propTypes
Accordion.defaultProps = defaultProps

export default Accordion
