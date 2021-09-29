export type SolutionPage = {
  id: number
  identifier: string
  name: string
  content: Content
}

type Content = {
  SOLUTION01: SolutionItem
  SOLUTION02: SolutionItem
  SOLUTION03: SolutionItem
}

export type SolutionItem = {
  title: SolutionSection
  shortDescription: SolutionSection
  longDescription: SolutionSection
  image01: SolutionImage
  image02: SolutionImage
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
