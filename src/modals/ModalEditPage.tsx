import { content, section } from "@/interfaces/contentApi"
import { Button, FormControl, FormLabel, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, ToastMessage, ToastProps, ToastState } from "@chakra-ui/react"
import { useState } from "react"


interface ModalEditPageProps {
  info: (value: object) => void
  onClose: () => void
  data: section[]
  lang: string
  name: string
  id: string
  formatToId: (value: string) => string
}

export default function ModalEditPage({ info, onClose, data, lang, name, id, formatToId }: ModalEditPageProps) {

  const [nameInput, setNameInput] = useState<string>(name);

  function createNewData() {
    const newData = [...data]
    let error = false

    newData.forEach((sec, secI) => {
      if (sec.id === formatToId(nameInput) || sec.name === nameInput) {
        error = true
        info({
          title: lang === "pt-br" ? "Lista/Página já existe" : "List/Page already exists",
          description: lang === "pt-br" ? "Já existe uma página/lista com este mesmo nome!" : "A page/list with the same name already exists!",
          status: "error",
          duration: 4000,
          isClosable: true,
        })
      }
    })

    if (!error) {
      newData.forEach((sec, secI) => {
        if (sec.id === id) {
          if (lang === "pt-br") {
            newData[secI].id = formatToId(nameInput)
            newData[secI].name = nameInput
          } else {
            newData[secI].name = nameInput
          }
          info({
            title: lang === "pt-br" ? "Nome alterado" : "Updated name",
            description: lang === "pt-br" ? `O nome foi alterado para '${nameInput}' com sucesso!` : `The name was successfully changed to '${nameInput}'!`,
            status: "success",
            duration: 4000,
            isClosable: true,
          })
          // data[1](newData)
          onClose()   
        }
      })
    }
  }





  return (
    <ModalContent backgroundColor={"gray.900"} color={"white"}>
      <ModalHeader> {lang === "pt-br" ? "Editando página" : "Editing page"}: {name}</ModalHeader>
      <ModalBody display={"flex"} flexDirection={"column"} gap={4}>
        <FormControl>
          <FormLabel>{lang === "pt-br" ? "Nome" : "Name"}:</FormLabel>
          <Input value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
        </FormControl>
      </ModalBody>
      <ModalFooter>

        <Button
          mr={4}
          onClick={createNewData}
          color={"white"}
          backgroundColor={"blue.500"}
          _hover={{ backgroundColor: "blue.600" }}
        > {lang === "pt-br" ? "Salvar" : "Save"} </Button>

        <Button
          onClick={onClose}
          variant={"outline"}
          color={"red.600"}
          borderColor={"red.600"}
          _hover={{ color: "white", backgroundColor: "red.600" }}
        > {lang === "pt-br" ? "Cancelar" : "Cancel"} </Button>

      </ModalFooter>
    </ModalContent>
  )
}