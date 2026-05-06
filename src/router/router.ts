import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PodcastView from '../views/PodcastView.vue'
import EpisodeView from '../views/EpisodeView.vue'

const routes = [
  { 
    path: '/', 
    name: 'home',
    component: HomeView 
  },
  { 
    path: '/podcast/:podcastId',
    name: 'podcast',
    component: PodcastView 
  },
  { 
    path: '/podcast/:podcastId/episode/:episodeId',
    name: 'episode',
    component: EpisodeView 
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

export const router = createRouter({
  history: createWebHistory(), 
  routes,
})