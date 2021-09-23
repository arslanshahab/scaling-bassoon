export const aboutUsAttributes: AboutAttribute[] = [
  {
    name: 'technology',
    icon: '/icons/technology.svg',
    description: 'technologyDesc',
  },
  {
    name: 'assistingServices',
    icon: '/icons/assisting-service.svg',
    description: 'assistingServicesDesc',
  },
  {
    name: 'training',
    icon: '/icons/training.svg',
    description: 'trainingDesc',
  },
  {
    name: 'supportService',
    icon: '/icons/support.svg',
    description: 'supportServiceDesc',
  },
]

export type AboutAttribute = {
  name: string
  icon: string
  description: string
}
