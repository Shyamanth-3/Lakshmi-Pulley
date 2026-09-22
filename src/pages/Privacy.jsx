import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { site } from '../data/site';

// No formal privacy policy exists in the project's source material. Rather than invent legal language,
// this page states plainly what the site actually does (the enquiry form, GA4 analytics — both verifiable
// in the repository) and how to reach the company about privacy questions.
export default function Privacy() {
  return (
    <div className="bg-surface pb-20 pt-8">
      <div className="container mb-8">
        <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
      </div>

      <div className="container max-w-2xl">
        <h1 className="mb-6">Privacy Policy</h1>

        <div className="panel panel-notice mb-10 text-sm text-primary-700">
          A full, formal privacy policy has not yet been published for this site. This page describes,
          as accurately as we can, what the site actually does with your information.
        </div>

        <div className="flex flex-col gap-10">
          <section>
            <h2 className="mb-3">Enquiry form</h2>
            <p className="text-primary-600">
              When you submit the enquiry form, the details you enter (name, company, contact
              information and your technical requirement) are emailed to {site.name}'s sales team so
              they can respond to your request. We do not sell this information.
            </p>
          </section>

          <section>
            <h2 className="mb-3">Analytics</h2>
            <p className="text-primary-600">
              This site uses Google Analytics (GA4) to understand how the site is used.
            </p>
          </section>

          <section>
            <h2 className="mb-3">Contact</h2>
            <p className="text-primary-600">
              Questions about your information can be sent to{' '}
              <a href={`mailto:${site.contact.emails[0]}`} className="text-primary-600 hover:text-accent font-medium">
                {site.contact.emails[0]}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
