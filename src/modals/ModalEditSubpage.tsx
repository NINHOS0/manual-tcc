import { content, section, subsection } from "@/interfaces/contentApi"
import { Button, FormControl, FormLabel, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, ToastMessage, ToastProps, ToastState } from "@chakra-ui/react"
import { stringify } from "querystring"
import { useState } from "react"


interface ModalEditSubpageProps {
  info: (value: object) => void
  onClose: () => void
  data: section[]
  lang: string
  name: string
  id: string
  formatToId: (value: string) => string
}

export default function ModalEditSubpage({ info, onClose, data, lang, name, id, formatToId }: ModalEditSubpageProps) {
  const [nameInput, setNameInput] = useState<string>(name);
  const [listInput, setListInput] = useState<string>(id.split('_')[1]);

  function createNewData() {
    const newData = [...data]
    let error = false


    if (id.split('_')[1] === listInput) {
      newData.filter(sec => sec.id === id.split('_')[1])[0].routes?.forEach((sub: subsection) => {
        if (sub.id === formatToId(nameInput) + "_" + id.split('_')[1] || formatToId(sub.name) === formatToId(nameInput)) {
          info({
            title: lang === "pt-br" ? "Subpágina já existe" : "Subpage already exists",
            description: lang === "pt-br" ? "Já existe uma subpágina com este mesmo nome!" : "A subpage with the same name already exists!",
            status: "error",
            duration: 4000,
            isClosable: true,
          })
          error = true
        }
      })
    } else {
      newData.filter(sec => sec.id === listInput)[0].routes?.forEach((sub: subsection) => {
        if (sub.id === formatToId(nameInput) + "_" + id.split('_')[1] || formatToId(sub.name) === formatToId(nameInput)) {
          info({
            title: lang === "pt-br" ? "Subpágina já existe" : "Subpage already exists",
            description: lang === "pt-br" ? "Já existe uma subpágina com este mesmo nome na lista de destino!" : "A subpage with the same name already exists in the target list!",
            status: "error",
            duration: 4000,
            isClosable: true,
          })
          error = true
        }
      })
    }



    if (!error) {
      newData.forEach((sec, secI) => sec.id === id.split('_')[1] && sec.routes?.forEach((sub: subsection, subI: number) => {
        if (sub.id === id) {
          if (id.split('_')[1] === listInput) {

            if (lang === "pt-br") {
              newData[secI].routes![subI] = { ...newData[secI].routes![subI], id: formatToId(nameInput) + "_" + id.split('_')[1], name: nameInput }
            } else {
              newData[secI].routes![subI] = { ...newData[secI].routes![subI], name: nameInput }
            }

            info({
              title: lang === "pt-br" ? "Nome alterado" : "Updated name",
              description: lang === "pt-br" ? `O nome foi alterado para '${nameInput}' com sucesso!` : `The name was successfully changed to '${nameInput}'!`,
              status: "success",
              duration: 4000,
              isClosable: true,
            })

          } else if (lang === "pt-br") {

            newData.forEach(e => e.id === listInput && e.routes?.push({ id: formatToId(nameInput) + "_" + id.split('_')[1], name: nameInput, content: [] }))
            newData[secI].routes = newData[secI].routes?.filter(e => e.id !== id)

            info({
              title: lang === "pt-br" ? "Destino alterado" : "Changed destination",
              description: lang === "pt-br" ? `Destino alterado com sucesso!` : `destination changed successfully!`,
              status: "success",
              duration: 4000,
              isClosable: true,
            })
          }

          console.log(JSON.stringify(newData))

          fetch(`http://localhost:5000/content/`, {
            method: "POST",
            body: JSON.stringify({"pt-br": 1})
          }).then(res => console.log(res.json())).catch(error => console.log(error))
          onClose()
        }
      }))
    }
  }





  return (
    <ModalContent backgroundColor={"gray.900"} color={"white"}>
      <ModalHeader> {lang === "pt-br" ? "Editando subpágina" : "Editing subpage"}: {name}</ModalHeader>
      <ModalBody display={"flex"} flexDirection={"column"} gap={4}>
        <FormControl>
          <FormLabel>{lang === "pt-br" ? "Nome" : "Name"}:</FormLabel>
          <Input value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
        </FormControl>
        {lang === "pt-br" ? (
          <FormControl>
            <FormLabel>{lang === "pt-br" ? "Lista" : "List"}:</FormLabel>
            <Select value={listInput} onChange={(e) => setListInput(e.target.value)}>
              {data.map((sec, i) => sec.routes && (
                <option key={i} value={sec.id}>{sec.name}</option>
              ))}
            </Select>
          </FormControl>
        ) : ''}
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