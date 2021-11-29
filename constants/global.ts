export const global = {
  ourNews: {
    mobileMaxWidth: 640,
    tabletMaxWidth: 1025,
    maxDescriptionLength: 60,
  },
  // these values are based on db values for each category
  blogCategory: {
    event: 2,
    reference: 3,
    education: 4,
  },
  productFilterType: {
    categories: 'categories',
    brands: 'brands',
    labels: 'labels',
  },
  productFilterColumn: {
    categories: 'categories:category_id',
    brands: 'brand:brand_id',
    labels: 'labels:label_id',
  },
  blogPage: {
    events: 'events',
    references: 'references',
    education: 'education',
  },
}

export enum SortingDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export enum BlogCategory {
  EVENT = 2,
  REFERENCE = 3,
  EDUCATION = 4,
}
