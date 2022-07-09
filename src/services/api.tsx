import axios from "axios"
import { SignupDto, User, SigninDto, UserMe, userInterface, ChangePasswordDto } from "~/interfaces/user"
import { interfaceUploads, ListRecentDto, Resource, SearchResourceDto } from "~/interfaces/editor"
import { IUpload, TemplatesDTO } from "~/interfaces/editor"
import { createTemplate, ShareTemplate } from "~/interfaces/template"

export const signup = (props: SignupDto): Promise<User> => {
  return new Promise((resolve, reject) => {
    axios
      .post("/v1/signup", props)
      .then(({ data }: any) => {
        const user = data.user as User
        resolve(user)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

export const deleteUploadFile = (props: any) => {
  return new Promise((resolve, reject) => {
    axios
      .delete("/v1/uploads/" + props)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => null)
  })
}

export const getUniquiTemplate = (props: any) => {
  return new Promise((resolve, reject) => {
    axios
      .get("/v1/templates/" + props)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => null)
  })
}

export const getUpdateTemplate = (id: any, props: any) => {
  return new Promise((resolve, reject) => {
    axios
      .put("/v1/templates/" + id, props)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => null)
  })
}

export const getCreateTemplate = (props: any) => {
  return new Promise<createTemplate>((resolve, reject) => {
    axios
      .post("/v1/templates", props)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => reject(err))
  })
}

export const shareTemplate = (props: any) => {
  return new Promise<ShareTemplate>((resolve, reject) => {
    console.log(props)
    axios
      .post("/v1/templates/share", props)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => reject(err))
  })
}

export const deleteTemplate = (props: any) => {
  return new Promise((resolve, reject) => {
    axios
      .delete("v1/templates/" + props)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => reject(err))
  })
}

export const duplicateTemplate = (props: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post("api", props)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => reject(err))
  })
}

export const getUpdateUser = (props: userInterface) => {
  return new Promise((resolve, reject) => {
    axios
      .put("/v1/user", props)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => reject(err))
  })
}

export const getUploads = (): Promise<interfaceUploads> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get("/v1/api")
      resolve(data.data)
    } catch (err) {
      reject(err)
    }
  })
}

export const getSignedURLForUpload = (props: {
  filename: string
  operation: string
}): Promise<{ signed_url: string; url: string }> => {
  return new Promise((resolve, reject) => {
    axios
      .post("/v1/uploads/signed", props)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => reject(err))
  })
}

export const getSave = (props: { name: string; type: string; url: string }): Promise<{ signed_url: string }> => {
  return new Promise((resolve, reject) => {
    axios
      .post("/v1/uploads", props)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => reject(err))
  })
}

export const getListPlans = (props: { active: boolean }): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post("/v1/subcription/plans/search", props)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => null)
  })
}

export const updateUploadFile = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post("/v1/uploads/search", {})
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => {})
  })
}

export const userMe = (): Promise<UserMe> => {
  return new Promise((resolve, reject) => {
    axios
      .get("/v1/user/me")
      .then(({ data }: any) => {
        const result = data as UserMe
        resolve(result)
      })
      .catch((err) => reject(err))
  })
}

export const signin = (props: Partial<SigninDto>): Promise<User> => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/v1/signin", props)
      .then(({ data }: any) => {
        const user = data as any
        resolve(user)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

export const getListTemplates = (props: TemplatesDTO) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/v1/templates/search", props)
      .then(({ data }: any) => {
        const listTemplate = data as any
        resolve(listTemplate)
      })
      .catch((err) => reject(err))
  })
}

export const changePassword = (props: ChangePasswordDto) => {
  axios
    .put("/v1/user/change-password", props)
    .then((res: any) => {
      alert(res.data)
    })
    .catch((err: any) => {
      alert(err)
    })
}

export const resourceSearch = (props: SearchResourceDto) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4000/v1/resource/search", props)
      .then(({ data }: any) => {
        const resources = data.resources as Resource[]
        resolve(resources)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const recentResource = (idResource: string) => {
  return new Promise(() => {
    axios.put("/v1/resource/" + idResource + "/use")
  })
}

export const favoriteResource = (idResource: string) => {
  return new Promise(() => {
    axios.put("/v1/resource/" + idResource + "/favorite")
  })
}

export const listFavoriteResource = () => {
  return new Promise((resolve, reject) => {
    axios.get("/v1/resource/favorite").then(({ data }: any) => {
      resolve(data.resources)
    })
  })
}

export const listRecentResource = () => {
  return new Promise((resolve, reject) => {
    axios.get("/v1/resource/used").then(({ data }: any) => {
      data.listRecentResources as ListRecentDto[]
      resolve(data.resources)
    })
  })
}

export const logout = () => {
  return new Promise((resolve, reject) => {
    axios.post("/v1/signout").then(resolve).catch(reject)
  })
}
