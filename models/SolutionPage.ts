export type SolutionPage = {
  id: number
  identifier: string
  name: string
  content: SolutionContent
}

export type SolutionContent = {
  [key: string]: SolutionItem
}

export type SolutionItem = {
  title: SolutionSection
  shortDescription: SolutionSection
  longDescription: SolutionSection
  image?: SolutionImage
  image01?: SolutionImage
  image02?: SolutionImage
}

type SolutionSection = {
  helptext: string | null
  value: string
  type: string
}

type SolutionImage = {
  helptext: string | null
  value: string
  type: [string | null]
}
