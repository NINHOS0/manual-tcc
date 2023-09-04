import { section } from "@/interfaces/contentApi"
import { Button, FormControl, FormLabel, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react"
import { useState } from "react"


interface ModalNewListProps {
  info: (value: object) => void
  onClose: () => void
  data: section[]
  formatToId: (value: string) => string
}

export default function ModalNewList({ info, onClose, data, formatToId }: ModalNewListProps) {

  const [nameInput, setNameInput] = useState<string>();

  function createNewData() {
    const newData = data
    let error = false

    if (nameInput?.length === undefined) {
      info({
        title: "Campo de nome inválido",
        description: "O campo de nome está vazio!",
        status: "info",
        duration: 4000,
        isClosable: true,
      })
      return
    }

    data.forEach((sec: section) => {
      if (sec.id === formatToId(nameInput)) {

        error = true
        info({
          title: "Página/lista existente",
          description: "Já existe uma página/lista com este mesmo nome!",
          status: "error",
          duration: 4000,
          isClosable: true,
        })

      }
    })

    if (!error) {

      newData.push({ id: formatToId(nameInput), name: nameInput, routes: [] })

      info({
        title: "Lista criada",
        description: `Lista '${nameInput}' foi criada com sucesso!`,
        status: "success",
        duration: 4000,
        isClosable: true,
      })
      // data[1](newData)
      onClose()
    }
  }





  return (
    <ModalContent backgroundColor={"gray.900"} color={"white"}>
      <ModalHeader>Criar lista</ModalHeader>
      <ModalBody display={"flex"} flexDirection={"column"} gap={4}>
        <FormControl>
          <FormLabel>Nome:</FormLabel>
          <Input placeholder="Insira o nome da lista..." onChange={(e) => setNameInput(e.target.value)} />
        </FormControl>
      </ModalBody>
      <ModalFooter>

        <Button
          mr={4}
          onClick={createNewData}
          color={"white"}
          backgroundColor={"blue.500"}
          _hover={{ backgroundColor: "blue.600" }}
        >Criar</Button>

        <Button
          onClick={onClose}
          variant={"outline"}
          color={"red.600"}
          borderColor={"red.600"}
          _hover={{ color: "white", backgroundColor: "red.600" }}
        >Cancelar</Button>

      </ModalFooter>
    </ModalContent>
  )
}