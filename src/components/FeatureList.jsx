import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function FeatureList({ features }) {
  if (!features || features.length === 0) return null;
  
  return (
    <ul className="space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex gap-3 text-primary-700">
          <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={20} />
          <span className="leading-relaxed text-sm md:text-base">{feature}</span>
        </li>
      ))}
    </ul>
  );
}
