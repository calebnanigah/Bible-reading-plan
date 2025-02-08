const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'chaptersToday', component: () => import('pages/IndexPage.vue') },
      {
        path: 'chapters',
        name: 'chaptersIndex',
        component: () => import('pages/AllChaptersPage.vue'),
      },
      { path: 'settings', name: 'settings', component: () => import('pages/SettingsPage.vue') },
    ],
  },

  // Always leave this as the last one
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
