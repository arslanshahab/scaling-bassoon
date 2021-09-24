import doctors from './../assets/images/for-doctors.png'
import clubs from './../assets/images/for-clubs.png'
import salons from './../assets/images/for-salons.png'
import salons2 from './../assets/images/skincare-woman.png'

export const solutions: Solution[] = [
  {
    title: 'forDoctors',
    description: 'loremIpsumLong',
    image: doctors,
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
