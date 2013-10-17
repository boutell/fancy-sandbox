var site = require('apostrophe-site')({

  // This line is required and allows apostrophe-site to use require() and manage our NPM modules for us.
  root: module,
  shortName: 'fancy-sandbox',
  hostName: 'fancy-sandbox',
  title: 'Fancy Sandbox',
  sessionSecret: 'apostrophe sandbox demo party',
  adminPassword: 'demo',


  // Here we define what page templates we have and what they will be called in the Page Types menu.

  // For html templates, the 'name' property refers to the filename in ./views/pages, e.g. 'default'
  // refers to '/views/pages/default.html'.

  // The name property can also refer to a module, in the case of 'blog', 'map', 'events', etc.

  pages: {
    types: [
      { name: 'default', label: 'Default (Two Column)' },
      { name: 'onecolumn', label: 'One Column' },
      { name: 'marquee', label: 'Marquee' },
      { name: 'home', label: 'Home Page' },
      { name: 'blog', label: 'Blog' },
      { name: 'events', label: 'Events' },
      { name: 'map', label: 'Map' },
      { name: 'promoters', label: 'Promoters' },
      { name: 'caterers', label: 'Caterers' },
      { name: 'sections', label: 'Sections' },
      { name: 'groups', label: 'Directory' }
    ]
  },

  // These are the modules we want to bring into the project.
  modules: {
    'apostrophe-blog':     { },
    'apostrophe-events':     {
      'addFields': [
        // Join events with map locations
        {
          name: '_location',
          type: 'joinByOne',
          withType: 'mapLocation',
          idField: 'locationId'
        },
        // ... And with promoters
        {
          name: '_promoters',
          type: 'joinByArray',
          withType: 'promoter',
          idsField: 'promoterIds',
          sortable: true
        },
        {
          name: '_caterers',
          type: 'joinByArray',
          withType: 'caterer',
          sortable: true,
          idsField: 'catererIds',
          relationshipsField: 'catererRelationships',
          relationship: [
            {
              name: 'course',
              label: 'Course',
              type: 'select',
              choices: [
                {
                  value: 'appetizer',
                  label: 'Appetizer'
                },
                {
                  value: 'entree',
                  label: 'Entree'
                },
                {
                  value: 'dessert',
                  label: 'Dessert'
                }
              ]
            },
            {
              name: 'dish',
              label: 'Dish',
              type: 'string'
            },
            {
              name: 'donor',
              label: 'Donor',
              type: 'boolean'
            }
          ]
        }
      ]
    },
    'apostrophe-snippets':     { },
    'apostrophe-map':      {
      'addFields': [
        {
          name: '_events',
          type: 'joinByOneReverse',
          withType: 'event',
          idField: 'locationId',
          ifOnlyOne: true,
          withJoins: [ '_promoters._events' ]
        }
      ]
    },
    'apostrophe-sections': { },
    'apostrophe-people': { },
    'apostrophe-groups': { },
    'promoters': {
      extend: 'apostrophe-snippets',
      name: 'promoters',
      instance: 'promoter',
      addFields: [
        {
          name: '_events',
          type: 'joinByArrayReverse',
          withType: 'event',
          idsField: 'promoterIds'
        }
      ]
    },
    'caterers': {
      extend: 'apostrophe-snippets',
      name: 'caterers',
      instance: 'caterer',
      addFields: [
        {
          name: '_events',
          type: 'joinByArrayReverse',
          withType: 'event',
          idsField: 'catererIds',
          relationshipsField: 'catererRelationships'
        }
      ]
    }
  },

  // These are assets we want to push to the browser.
  // The scripts array contains the names of JS files in /public/js,
  // while stylesheets contains the names of LESS files in /public/css
  assets: {
    scripts: ['site'],
    stylesheets: ['site']
  }
});
