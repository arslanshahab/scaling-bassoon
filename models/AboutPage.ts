export type AboutPage = {
  id: number
  identifier: string
  name: string
  content: Content
}

type Content = {
  ABOUTUS01: AboutUsItem
  ABOUTUS02: AboutUsItem
}

export type AboutUsItem = {
  text: AboutUsSection
  image: SolutionImage
}

type AboutUsSection = {
  helptext: string | null
  value: string
  type: string
}

type SolutionImage = {
  helptext: string | null
  value: string
  type: [string | null]
}
