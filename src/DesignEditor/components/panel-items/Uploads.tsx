import { useEffect, useRef, useState } from "react"
import { useEditor } from "@scenify/react"
import DropZone from "~/components/DropZone"
// import { useAppDispatch } from "~/store/store"
// import { uniqueFilename } from "pages/DesignEditor/utils/unique"
// import { useSelector } from "react-redux"
// import { selectUploading, selectUploads } from "~/store/uploads/selectors"
// import { deleteUploadFile, setUploading, uploadFile, uploadFiles } from "~/store/uploads/actions"
import { Box, Button, Image } from "@chakra-ui/react"
import Icons from "~/components/Icons"
import Scrollbars from "@scenify/react-custom-scrollbar"

function Uploads() {
  const [currentFile, setCurrentFile] = useState<any>(null)
  const inputFileRef = useRef<HTMLInputElement>(null)
  // const dispatch = useAppDispatch()
  // const [a, b] = useState(false)
  // useEffect(() => {
  //   dispatch(uploadFiles())
  // }, [a])
  // const uploads = useSelector(selectUploads)
  // const uploading = useSelector(selectUploading)
  const editor = useEditor()

  const handleDropFiles = (files: FileList) => {
    const file = files[0]
    handleUploadFile(file)
    const reader = new FileReader()
    reader.addEventListener(
      "load",
      function () {
        setCurrentFile(reader.result)
      },
      false
    )

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleUploadFile = async (file: File) => {
    // try {
    //   const updatedFileName = uniqueFilename(file.name)
    //   const updatedFile = new File([file], updatedFileName)
    //   dispatch(
    //     setUploading({
    //       progress: 0,
    //       status: "IN_PROGRESS"
    //     })
    //   )
    //   dispatch(uploadFile({ file: updatedFile }))
    // } catch (err) {
    //   console.log({ err })
    // }
  }

  const addImageToCanvas = (url: any) => {
    const options = {
      type: "StaticVector",
      name: "Shape",
      src: url,
      metadata: {}
    }
    if (editor) {
      editor.objects.add(options)
    }
  }

  const handleFileInput = (e: any) => {
    handleDropFiles(e.target.files)
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleDelete = (id: string) => {
    // dispatch(deleteUploadFile(id))
    // b(!a)
  }

  return (
    <DropZone handleDropFiles={handleDropFiles}>
      <div style={{ display: "flex", height: "100%", flexDirection: "column", width: "100%" }}>
        <div style={{ padding: "2rem 2rem", display: "flex" }}>
          <div
            style={{
              display: "flex",
              paddingLeft: "1rem",
              fontSize: "1rem",
              alignItems: "center",
              background: "rgba(0,0,0,0.045)",
              cursor: "pointer",
              height: "50px",
              width: "100%"
            }}
            onClick={handleInputFileRefClick}
          >
            Upload file
          </div>
          <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />
        </div>
        <div style={{ flex: 1 }}>
          <Scrollbars>
            <div
              style={{
                display: "grid",
                gap: "0.5rem",
                padding: "0 2rem 2rem",
                gridTemplateColumns: "1fr 1fr"
              }}
            >
              {/* {uploading && <img width="100%" src={currentFile} alt="uploaded" />}
              {uploads?.uploads.map((upload: any, index: number) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  border="1px solid #d0d0d0"
                  _hover={{ cursor: "pointer" }}
                  onClick={() => addImageToCanvas(upload.url)}
                >
                  <Button
                    marginBottom="5rem"
                    marginLeft="4.8rem"
                    border="1px solid #d0d0d0"
                    size="sm"
                    background="white"
                    position="absolute"
                    _hover={{ color: "#fd7e14" }}
                    onClick={() => handleDelete(upload.id)}
                  >
                    <Icons.Trash size={20} />
                  </Button>
                  <Image width="100%" src={upload.url} alt="preview" />
                </Box>
              ))} */}
            </div>
          </Scrollbars>
        </div>
      </div>
    </DropZone>
  )
}

export default Uploads
