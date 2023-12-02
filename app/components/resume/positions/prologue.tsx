import type { JSX } from 'react';

import { ExperienceCard } from '../experience-card';

export function Prologue(): JSX.Element {
  return (
    <ExperienceCard
      endDate="Jul 2021"
      methodologiesUsed={['rest']}
      startDate="Jan 2021"
      techUsed={['php', 'yii', 'vue', 'laravel']}
      title="Prologue Technology"
    >
      <li>
        Extended public shipment tracking pages for international and domestic
        shipments with Vue and Laravel.
      </li>
      <li>
        Worked with an application for delivering quotes and booking shipments
        for clients through multiple logistics carriers such as FedEx, UPS, and
        others.
      </li>
      <li>
        Supported and maintained APIs for third-party consumption in order to
        rate, quote, and ship deliveries for small packages, LTL, and
        truckloads.
      </li>
    </ExperienceCard>
  );
}
