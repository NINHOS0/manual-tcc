import { PageContext } from "@/context/PageProvider";
import { ContextProps, content, language, section, subsection } from "@/interfaces/contentApi";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, IconButton, Menu, MenuButton, MenuItem, MenuList, Select, Stack, Tooltip} from "@chakra-ui/react";
import { useContext, useState } from 'react';

interface ModalProps {
  type: 'new-page' | 'new-list' | 'new-subpage' | 'edit-page' | 'edit-list' | 'edit-subpage' | 'delete-page' | 'delete-list' | 'delete-subpage'
  content?: section | subsection
}

interface AsideSystemProps {
  openModal: (type: ModalProps['type'], content?: ModalProps['content']) => void
  setContentSelected: (value: section | subsection) => void
}

export default function AsideSystem({openModal, setContentSelected}: AsideSystemProps) {

  const { data, languages, currentLanguage, setCurrentLanguage } = useContext<ContextProps>(PageContext)
  const [createType, setCreateType] = useState<any>('new-page');
  console.log(languages)
  return (
    <Stack direction={"column"} m={4} w={"72"} color={"white"}>
      <Box w={"full"} display={"flex"} justifyContent={"center"} color={"white"} mb={"2"}>
        <Tooltip label={currentLanguage === "pt-br" ? "Idioma" : "Language"}>
          <Select variant={"unstyled"} w={"auto"} textAlign={"right"} value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}>
            {languages.result?.map((language: language) => (
              <option key={language.id} style={{ background: "#171923", textAlign: "left" }} value={language.id}>{language.name}</option>
            ))}
          </Select>
        </Tooltip>
      </Box>
      {currentLanguage === "pt-br" ? (
        <Box display={"flex"}>
          <Select defaultValue={'page'} color={"white"} h={10} borderTopRightRadius={0} borderBottomRightRadius={0} value={createType} onChange={(e) => setCreateType(e.target.value)}>
            <option style={{ background: "#171923" }} value='new-page'>Página</option>
            <option style={{ background: "#171923" }} value='new-list'>Lista</option>
          </Select>
          <Tooltip textAlign={"center"} label='Adicionar'>
            <IconButton aria-label="Adicionar" variant={"solid"} w={'10'} h={'10'} bg={'white'} borderTopLeftRadius={0} borderBottomLeftRadius={0} icon={<AddIcon w={3} />} onClick={() => openModal(createType)} />
          </Tooltip>
        </Box>
      ) : ''}
      {data.result && data.result[currentLanguage].map((sec: section) => sec.routes ? (
        <Accordion key={sec.id} allowMultiple border={"none"}>
          <AccordionItem border={"none"} w={'fit-content'}>
            <Box display={'flex'}>
              <AccordionButton pr={0} width={'fit-content'}>
                <AccordionIcon color={"white"} />
                <Box as="span" ml={2} color={"white"}>
                  {sec.name}
                </Box>
              </AccordionButton>
              <Menu>
                <MenuButton as={IconButton} icon={<EditIcon />} variant={'unstyled'} color={'whiteAlpha.700'} _hover={{ color: 'white' }} _active={{ color: 'white' }} />
                <MenuList color={"white"} bgColor={"gray.800"} border={"none"}>
                  {currentLanguage === "pt-br" && <MenuItem icon={<AddIcon />} onClick={() => openModal("new-subpage", sec)} bgColor={"transparent"} _hover={{bgColor: "whiteAlpha.50"}}>Nova página</MenuItem>}
                  <MenuItem icon={<EditIcon />} onClick={() => openModal("edit-list", sec)} bgColor={"transparent"} _hover={{bgColor: "whiteAlpha.50"}}>Editar</MenuItem>
                  {currentLanguage === "pt-br" && <MenuItem icon={<DeleteIcon />} onClick={() => openModal("delete-list", sec)} bgColor={"transparent"} _hover={{bgColor: "whiteAlpha.50"}}>Deletar</MenuItem>}
                </MenuList>
              </Menu>
            </Box>
            <AccordionPanel p={0}>
              <Stack pl={14} spacing={-2}>
                {sec.routes.map((sub: subsection) => (
                  <Box key={sub.id} display={'flex'} flexDirection={"row"} alignItems={"center"}>
                    <Link href={''} color={"white"} onClick={(e) => { e.preventDefault(); setContentSelected(sub) }}>{sub.name}</Link>
                    <Menu>
                      <MenuButton as={IconButton} icon={<EditIcon />} variant={'unstyled'} color={'whiteAlpha.700'} _hover={{ color: 'white' }} _active={{ color: 'white' }} />
                      <MenuList color={"white"} bgColor={"gray.800"} border={"none"}>
                        <MenuItem icon={<EditIcon />} onClick={() => openModal("edit-subpage", sub)} bgColor={"transparent"} _hover={{bgColor: "whiteAlpha.50"}}>Editar</MenuItem>
                        {currentLanguage === "pt-br" && <MenuItem icon={<DeleteIcon />} onClick={() => openModal("delete-subpage", sub)} bgColor={"transparent"} _hover={{bgColor: "whiteAlpha.50"}}>Deletar</MenuItem>}
                      </MenuList>
                    </Menu>
                  </Box>
                ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : (
        <Box key={sec.id} display={"flex"} alignItems={"center"} ml={"45px"} color={"white"}>
          <Link onClick={(e) => { e.preventDefault(); setContentSelected(sec) }}>{sec.name}</Link>
          <Menu>
            <MenuButton as={IconButton} icon={<EditIcon />} variant={'unstyled'} color={'whiteAlpha.700'} _hover={{ color: 'white' }} _active={{ color: 'white' }} />
            <MenuList color={"white"} bgColor={"gray.800"} border={"none"}>
              <MenuItem icon={<EditIcon />} onClick={() => openModal("edit-page", sec)} bgColor={"transparent"} _hover={{bgColor: "whiteAlpha.50"}}>Editar</MenuItem>
              {currentLanguage === "pt-br" && <MenuItem icon={<DeleteIcon />} onClick={() => openModal("delete-page", sec)} bgColor={"transparent"} _hover={{bgColor: "whiteAlpha.50"}}>Deletar</MenuItem>}
            </MenuList>
          </Menu>
        </Box>
      ))}

    </Stack >

  )
}