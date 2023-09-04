import { content, section } from "@/interfaces/contentApi"
import { Button, FormControl, FormLabel, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Text, ToastMessage, ToastProps, ToastState } from "@chakra-ui/react"
import { useState } from "react"


interface ModalDeleteListProps {
  info: (value: object) => void
  onClose: () => void
  data: section[]
  id: string
}

export default function ModalDeleteList({ info, onClose, data, id }: ModalDeleteListProps) {

  function createNewData() {
    let newData = [...data]
    let name_

    data.forEach(sec => {
      if (sec.routes && sec.id === id) {
        if (name_! === undefined) name_ = sec.name
        newData = newData.filter(e => e.id !== id)
      }
    })

    info({
      title: "Lista excluída",
      description: `Lista '${name_}' foi excluída com sucesso!`,
      status: "success",
      duration: 4000,
      isClosable: true,
    })
    // data[1](newData)
    onClose()
  }





  return (
    <ModalContent backgroundColor={"gray.900"} color={"white"}>
      <ModalHeader>Excluir lista</ModalHeader>
      <ModalBody display={"flex"} flexDirection={"column"} gap={4}>
        <Text>Tem certeza que deseja excluir essa lista? Após a exclusão todos os dados relacionados a ele serão perdidos!</Text>
      </ModalBody>
      <ModalFooter>

        <Button
          mr={4}
          onClick={createNewData}
          color={"white"}
          backgroundColor={"red.500"}
          _hover={{ backgroundColor: "red.600" }}
        >Excluir</Button>

        <Button
          onClick={onClose}
          variant={"outline"}
          color={"white"}
          borderColor={"white"}
          _hover={{ color: "black", backgroundColor: "white" }}
        >Cancelar</Button>

      </ModalFooter>
    </ModalContent>
  )
}