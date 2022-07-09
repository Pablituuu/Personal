export interface ShareTemplate {
  type: string
  image: string | undefined
  email: string
}

export interface createTemplate {
  template: {
    id: string
    name: string
    type: string
    drawifier_id: string
    published: boolean
    json: any
    preview: string
    size: null
    category_layout_id: null
    create_at: number
    description: null
  }
}
