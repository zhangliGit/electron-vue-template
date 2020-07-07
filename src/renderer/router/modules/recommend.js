const recommendRoutes = [
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
    name: 'home',
    meta: {
      title: '发现音乐',
      icon: 'music',
      auth: false
    }
  }
]

const recommendMap = []
recommendRoutes.concat().forEach(route => {
  const map = {
    path: route.path,
    name: route.name,
    meta: route.meta
  }
  recommendMap.push(map)
})

export { recommendRoutes, recommendMap }
