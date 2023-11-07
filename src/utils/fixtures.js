export const itemFixtures = [
  {
    id: "react-server-components-rsc-no-framework",
    title: "React Server Components, without a framework",
    content:
      "Can we use React Server Components today, without a framework like Next.js? As our experiment shows, not without significant challenges - for now at least?" +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/)',
  },
  {
    id: "react-server-components-rsc-survival-guide",
    title: "RSC Survival Guide",
    content:
      "A quick reference for RSC" +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#rsc-survival-guide)',
  },
  {
    id: "react-server-components-rsc-model",
    title: "The React Server Components Model",
    content:
      "More than just components that run on the server" +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#the-react-server-components-model)',
  },
  {
    id: "migrating-a-react-notes-app-to-rsc-without-a-framework",
    title: "Demo: migrating a React Notes App to RSC without a framework",
    content:
      "### Objectives\n\n" +
      "- a somewhat functional React Notes App (listing, creating, editing & deleting notes with a text title & Markdown content)\n" +
      "- React Server Components used alongside Client Components\n" +
      "- some sort of server-side rendering\n" +
      "- some kind of data-fetching using Server Components\n" +
      "- routing that somewhat works both in the client & on the server\n" +
      "- refreshing server components from the client\n" +
      "- above all else: learn\n" +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#demo%3A-migrating-a-react-notes-app-to-rsc-without-a-framework)',
  },
  {
    id: "react-server-react-flight-apis",
    title: "React Server & React Flight APIs",
    content:
      "The traditional React dependencies are no longer sufficient when it comes to using Server Component" +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#react-server-%26-react-flight-apis)',
  },
  {
    id: "our-first-react-server-component",
    title: "Our first React Server Component",
    content:
      "In this hypothetical example, <App /> and all its subtree are Shared Components. They do not use any client-specific APIs, they can be both Server Components or Client Components, they can be both rendered on the server or on the client." +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#our-first-react-server-component)',
  },
  {
    id: "server-side-rendering-of-server-components",
    title: "Server-Side Rendering of Server Components",
    content:
      "React Server & React Flight APIs being completely undocumented as mentioned earlier, properly rendering output of React Server Components to HTML, and streaming it efficiently to the browser, without a framework, is quite challenging." +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#server-side-rendering-of-server-components)',
  },
  {
    id: "data-fetching-in-server-components",
    title: "Data-Fetching in Server Components",
    content:
      "Fetching data in components is inherently subject to waterfall, even when leveraging best practices with React Server Components, Suspense, use() & async rendering, simply because the data fetching within a component, cannot start until this component has started to render, which is potentially blocked by the data-fetching of the parent component." +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#data-fetching-in-server-components)',
  },
  {
    id: "routing-with-server-components",
    title: "Routing with Server Components",
    content:
      "I invite you to take a look at our RSC React Notes App routing implementation & experiment for yourself." +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#routing-with-server-components%3F)',
  },
  {
    id: "form-handling-with-server-components",
    title: "Form handling with Server Components",
    content:
      'React Client Actions (like React Server Actions) are async functions that can be passed to the `<form action={...}>` & `<button formAction={...}>`, `<input type="submit" formAction={...} />` React host / native elements props.' +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#react-client-actions)',
  },
  {
    id: "should-you-be-writing-your-own-rsc-framework",
    title: "Should you be writing your own RSC framework?",
    content:
      "There is no doubt, the RSC model is very powerful." +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#should-you-be-writing-your-own-rsc-framework%3F)',
  },
  {
    id: "should-you-be-migrating-your-full-stack-react-framework-to-rsc",
    title: "Should you be migrating your Full-Stack React Framework to RSC?",
    content:
      "On one hand, I absolutely want to recommend teams with an existing in-house Full-Stack React Framework to progressively migrate to RSC." +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#should-you-be-migrating-your-full-stack-react-framework-to-rsc%3F)',
  },
  {
    id: "steps-to-migrating-your-full-stack-react-framework-to-rsc",
    title: "Steps to migrating a Full-Stack React Framework to RSC?",
    content:
      "If I were to progressively migrate an existing Full-Stack React Framework (and a huge code base of many production applications relying on it) to RSC, I'm not 100% sure but I would try to take the following steps ..." +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#what-steps-would-you-take-to-progressively-migrate-a-full-stack-react-framework-to-rsc%3F)',
  },
  {
    id: "going-further-with-rsc",
    title: "Going further with RSC",
    content:
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#going-further-with-rsc)',
  },
  {
    id: "server-only-and-client-only-packages",
    title: "server-only & client-only packages",
    content:
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#server-only-%26-client-only-packages)',
  },
  {
    id: "react-taint-apis",
    title: "server-only & client-only packages",
    content:
      "The server-only & client-only packages (or equivalent) are strongly recommended when working with RSC / Server Actions, for security reasons first, and potentially bundle size or load/runtime performance second." +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#react-taint-apis)',
  },
  {
    id: "react-server-and-client-actions",
    title: "React Server & Client Actions",
    content:
      "React Server & Client Actions were announced on October 23rd 2023 to be available in React Canary releases, starting from October 5, 2023 (18.3.0-canary-546178f91-20231005)." +
      "\n\n" +
      'Read more at ["React Server Components, without a framework" on Tim\'s Tech Blog](https://timtech.blog/react-server-components-rsc-no-framework/#react-server-%26-client-actions)',
  },
];

// export const itemFixtures = Array.from(Array(10), (_, i) => ({
//   id: `${i + 1}`,
//   title: `Note #${i + 1}`,
//   content: `**hello _world_**`,
// }));
