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
    link: '/solutions/1',
    icon: '/icons/medical-s.svg',
  },
  {
    title: 'forClubs',
    description: 'loremIpsumLong',
    image: clubs,
    buttonText: 'showProducts',
    link: '/solutions/2',
    icon: '/icons/gym-s.svg',
  },
  {
    title: 'forSalons',
    description: 'loremIpsumLong',
    image: salons,
    imageSecondary: salons2,
    buttonText: 'showProducts',
    link: '/solutions/3',
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
  1: 'SOLUTION_MEDICAL',
  2: 'SOLUTION_BEAUTY',
  3: 'SOLUTION_FITNESS',
}
