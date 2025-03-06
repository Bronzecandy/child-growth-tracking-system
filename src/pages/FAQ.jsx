import React from "react";
import { Typography, Card } from "@material-tailwind/react";

const faqs = [
  {
    title: 'What do you mean by "Figma assets"?',
    desc: "You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.",
  },
  {
    title: 'What does "lifetime access" exactly mean?',
    desc: "Once you have purchased either the design, code, or both packages, you will have access to all of the future updates based on the roadmap, free of charge.",
  },
  {
    title: "How does support work?",
    desc: "We're aware of the importance of well-qualified support, which is why we decided that support will only be provided by the authors that actually worked on this project. Feel free to contact us, and we'll help you out as soon as we can.",
  },
  {
    title: "I want to build more than one project. Is that allowed?",
    desc: "You can use Windster for an unlimited amount of projects, whether it's a personal website, a SaaS app, or a website for a client. As long as you don't build a product that will directly compete with Windster either as a UI kit, theme, or template, it's fine. Find out more information by reading the license.",
  },
  {
    title: 'What does "free updates" include?',
    desc: "The free updates that will be provided are based on the roadmap that we have laid out for this project. It is also possible that we will provide extra updates outside of the roadmap as well.",
  },
  {
    title: "What does the free version include?",
    desc: "The free version of Windster includes minimal style guidelines, component variants, and a dashboard page with the mobile version alongside it. You can use this version for any purposes, as it is open-source under the MIT license.",
  },
  {
    title: "What is the difference between Windster and Tailwind UI?",
    desc: "Although both Windster and Tailwind UI are built for integration with Tailwind CSS, the main difference is in the design, the pages, the extra components, and the UI elements that Windster includes. Additionally, Windster is a project that is still in development and will later include both application, marketing, and e-commerce UI interfaces.",
  },
  {
    title: "Can I use Windster in open-source projects?",
    desc: "Generally, it is accepted to use Windster in open-source projects, as long as it is not a UI library, a theme, a template, or a page-builder that would be considered an alternative to Windster itself. With that being said, feel free to use this design kit for your open-source projects. Find out more information by reading the license.",
  },
];

export function FAQ() {
  return (
    <section className="px-8 py-20 bg-gray-50 rounded-lg">
      <div className="container mx-auto">
        <div className="mb-14 text-center">
          <Typography
            variant="h1"
            color="black"
            className="mb-4 text-4xl font-bold tracking-tight"
          >
            Frequently Asked Questions
          </Typography>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-x-24 gap-y-6">
          {faqs.map(({ title, desc }) => (
            <Card key={title} className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <Typography color="black" className="flex items-center text-lg font-semibold mb-3">
                <i className="fas fa-question-circle mr-2 text-blue-600 text-xl"></i>
                {title}
              </Typography>
              <Typography className="text-gray-700 text-base leading-relaxed">
                {desc}
              </Typography>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
