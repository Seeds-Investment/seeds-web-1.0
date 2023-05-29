import {
  Accordion,
  AccordionBody,
  AccordionHeader
} from '@material-tailwind/react';
import type { ReactElement } from 'react';
import React, { useState } from 'react';

function Icon({ open }: { open: boolean }): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const CAccordion = ({
  title,
  description
}: {
  title: string;
  description: ReactElement<any, any>;
}): React.ReactElement => {
  const [open, setOpen] = useState(false);
  return (
    <Accordion icon={<Icon open={open} />} open={open}>
      <AccordionHeader
        onClick={() => {
          setOpen(c => !c);
        }}
      >
        <span
          className={`${
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            open && 'text-seeds-button-green transition-all'
          } text-left`}
        >
          {title}
        </span>
      </AccordionHeader>
      <AccordionBody>{description}</AccordionBody>
    </Accordion>
  );
};

export default CAccordion;
