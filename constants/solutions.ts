import doctors from './../assets/images/for-doctors.png'
import doctors2 from './../assets/images/nurse.jpeg'
import clubs from './../assets/images/for-clubs.png'
import salons from './../assets/images/for-salons.png'
import salons2 from './../assets/images/skincare-woman.png'

// for home page static sections (solution cards)
export const solutions: Solution[] = [
  {
    title: 'forDoctors',
    description: 'loremIpsumLong',
    image: doctors,
    imageSecondary: doctors2,
    buttonText: 'showProducts',
    link: '/doctors',
    icon: '/icons/medical-s.svg',
  },
  {
    title: 'forClubs',
    description: 'loremIpsumLong',
    image: clubs,
    buttonText: 'showProducts',
    link: '/clubs',
    icon: '/icons/gym-s.svg',
  },
  {
    title: 'forSalons',
    description: 'loremIpsumLong',
    image: salons,
    imageSecondary: salons2,
    buttonText: 'showProducts',
    link: '/salons',
    icon: '/icons/beauty-s.svg',
  },
]

export type Solution = {
  title: string
  description: string
  image: StaticImageData
  buttonText: string
  link: string
  imageSecondary?: StaticImageData
  icon?: string
}

export const solutionIcons = [
  {
    identifier: 'SOLUTION01',
    icon: '/icons/medical-s.svg',
  },
  {
    identifier: 'SOLUTION02',
    icon: '/icons/gym-s.svg',
  },
  {
    identifier: 'SOLUTION03',
    icon: '/icons/beauty-s.svg',
  },
]

export type SolutionIcon = {
  title: string
  icon?: string
}

export const solutionsIdentifier: string = 'PAGE_SOLUTIONS_V1'
export const solutionDetailIdentifier: any = {
  medical: '2021-09-30_PAGE_1633037287',
  beauty: '2021-10-05_PAGE_1633470915',
  fitness: '2021-10-05_PAGE_1633471104',
}
