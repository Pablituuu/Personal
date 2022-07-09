export interface SearchResourceDto {
  limit: number
  page: number
  query: {
    categories: string[]
    type: string
    published: boolean
  }
}

export interface interfaceUploads {
  uploads: [{ id: string; name: string; url: string; type: string }]
}

export interface TemplatesDTO {
  page: number
  limit: number
  query: {}
}

export interface Resource {
  drawifier: {
    name: string
    avatar: string
  }
  id: string
  name: string
  type: string
  url: string
}

export interface Favorite {
  id: string
  name: string
  type: string
  url: string
}

export interface Recent {
  id: string
  name: string
  type: string
  url: string
}

export interface IUpload {
  id: string
  contentType: string
  folder: string
  name: string
  type: string
  url: string
}

export interface Uploading {
  status: string
  progress: number
}
export interface ListRecentDto {
  resources: {
    id: string
    name: string
    type: string
    url: string
    drawifier: {
      name: string
      avatar: any
    }
    last_used_at: number
  }
}

export interface ListFavoriteDto {
  resources: {
    id: string
    name: string
    type: string
    url: string
    drawifier: {
      name: string
      avatar: any
    }
  }
}
