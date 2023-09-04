import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Stack, Link, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalContent, FormControl, Input, FormLabel, ModalFooter, Select, Menu, MenuButton, MenuList, MenuItem, IconButton, Tag, Tooltip, Text, useToast, Heading, Editable, EditablePreview, EditableInput, EditableTextarea } from "@chakra-ui/react";
import { AddIcon, ArrowRightIcon, DeleteIcon, DragHandleIcon, EditIcon, LinkIcon } from '@chakra-ui/icons'
import { content, language, section, subsection } from "../interfaces/contentApi";
import React, { useEffect, useState, useContext } from "react";
import AsideSystem from "@/components/AsideSystem";
import ModalsContainer from "@/modals/ModalsContainer";
import MainSystem from "@/components/MainSystem";
import { PageContext } from "@/context/PageProvider";

interface ModalProps {
  type: 'new-page' | 'new-list' | 'new-subpage' | 'edit-page' | 'edit-list' | 'edit-subpage' | 'delete-page' | 'delete-list' | 'delete-subpage'
  content?: section | subsection
}

interface ContextProps {
  data: {process: boolean, result: content},
  languages: {process: boolean, result: language[]},
  currentLanguage: string,
  setCurrentLanguage: (v: string) => void
}

export default function AdminPage() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const info = useToast()

  const { data, languages } = useContext<ContextProps>(PageContext)

  const [modalProps, setModalProps] = useState<ModalProps>({} as any);
  function OpenModal(type: ModalProps['type'], content: ModalProps['content']) {
    if (content) setModalProps({type: type, content: content})
    else setModalProps({type: type})
    onOpen()
  }

  const [contentSelected, setContentSelected] = useState({} as any);

  return (
    <>
      {!data.process ? (
        <>

          <ModalsContainer
            modalProps={modalProps}
            isOpen={isOpen}
            onClose={onClose}
            info={info}
          />

          <Flex backgroundColor={"gray.900"} h={"100vh"}>

            <AsideSystem
              openModal={OpenModal}
              setContentSelected={setContentSelected}
            />

            <MainSystem
              contentSelected={contentSelected}
            />

            <Stack w={"60"} p={4}>
              <Button rightIcon={<AddIcon/>} w="full">Texto</Button>
              <Button rightIcon={<LinkIcon/>} w="full">Link</Button>
            </Stack>
          </Flex>
        </>
      ) : ''}


    </>
  )
}