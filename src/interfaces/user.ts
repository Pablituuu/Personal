export interface User {
  user: {
    avatar: string
    company_address: string
    country: string
    createdat: number
    first_name: string
    id: string
    lastname: string
  }
}

export interface UserMe {
  user: {
    id: string
    first_name: string
    last_name: string
    email: string
    avatar: string
    company_address: string
    country: string
    following: number
    favorites: number
    downloaded: number
    created_at: number
  }
}

export interface Drawifier {
  drawifier: {
    avatar: any
    company_address: string
    country: string
    createdat: number
    first_name: string
    id: string
    lastname: string
  }
}

export interface SigninDto {
  email: string
  password: string
}

export interface SignupDto extends SigninDto {
  first_name: string
  last_name: string
}

export interface userInterface {
  first_name: string | undefined
  last_name: string | undefined
  company_address: string | undefined
  country: string | undefined
}

export interface ChangePasswordDto {
  current_password: string
  new_password: string
}

export interface Resources {
  limit: number
  page: number
  query: {
    categories: string[]
    type: string
    published: boolean
  }
}

export type AuthType = "signin" | "signup"
