export default {
  widgets: [
    // {
    //   name: 'sanity-tutorials',
    //   options: {
    //     templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
    //   }
    // },
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '62175ba3acfe419aae5f12e6',
                  title: 'Sanity Studio',
                  name: 'the-pragmatic-pr-studio',
                  apiId: '81baef78-b236-46ac-b2bd-be25b91fc7a6'
                },
                {
                  buildHookId: '62175ba3a65bbfb2c1647c40',
                  title: 'Landing pages Website',
                  name: 'the-pragmatic-pr',
                  apiId: 'bcb15daf-0bfe-4a32-a227-74fc33d0de27'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/ardamutlu/the-pragmatic-pr',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://the-pragmatic-pr.netlify.app', category: 'apps' }
        ]
      }
    },
    {
      name: 'document-list',
      options: { title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page'] },
      layout: { width: 'medium' }
    },
    { name: 'project-users', layout: { height: 'auto' } }
  ]
}
