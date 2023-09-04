import { PageContext } from "@/context/PageProvider";
import { ContextProps, content, item, section, sizes, subsection, weights } from "@/interfaces/contentApi";
import { ArrowDownIcon, ArrowUpIcon, DragHandleIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Editable, EditableInput, EditablePreview, EditableTextarea, Flex, Heading, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Select, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";

interface MainSystemProps {
  contentSelected: section | subsection
}

export default function MainSystem({ contentSelected }: MainSystemProps) {
  const { data, languages, currentLanguage, setCurrentLanguage } = useContext<ContextProps>(PageContext)
  const [tempData, setTempData] = useState<section[]>(data.result && [...data.result[currentLanguage]]);
  const [itemSelected, setItemSelected] = useState<number>(-1);

  const fontWeight = useRef<any>('')
  const fontSize = useRef<any>('')

  function moveItem(direction: number) {
    const newData = [...tempData]

    tempData.forEach((sec: section, secI) => {
      if (sec.id === contentSelected.id) {
        const itemToMove = tempData[secI].content![itemSelected]
        if (direction === 1 && tempData[secI].content![itemSelected + 1]) {
          newData[secI].content?.splice(itemSelected, 1)
          newData[secI].content?.splice(itemSelected + 1, 0, itemToMove)
          setItemSelected(itemSelected + 1)
          return
        } else if (direction === -1 && tempData[secI].content![itemSelected - 1]) {
          newData[secI].content?.splice(itemSelected, 1)
          newData[secI].content?.splice(itemSelected - 1, 0, itemToMove)
          setItemSelected(itemSelected - 1)
          return
        }
      }
    });
    setTempData(newData)
    forceRender()
  }

  function updateTempData() {
    const newData = [...tempData]

    // tempData.forEach((sec: section, secI) => {
    //   if (sec.id === contentSelected.id) newData[secI].content![itemSelected] = { ...tempData[secI].content![itemSelected], fontSize: fontSize.current.value, fontWeight: fontWeight.current.value }
    //   else sec.routes?.filter((sub, subI) => {
    //     if (sub.id === contentSelected.id) newData[secI].routes![subI].content[itemSelected] = { ...tempData[secI].routes![subI].content[itemSelected], fontSize: fontSize.current.value, fontWeight: fontWeight.current.value }
    //   })
    // })
    setTempData(newData)
    forceRender()
  }

  function resetData() {
    setTempData([...data.result[currentLanguage]])
    forceRender()
  }

  function sendData() {
    //setData(tempData)
  }

  const [state, setState] = useState(false)
  const forceRender = () => {
    setState(currentState => !currentState)
  }

  return (
    <Flex flex={1} direction={"column"} p={4} alignItems={"center"} px={10}>
      <Box mb={4} textAlign={"center"}>
        <Heading color={"white"} size={"lg"}>{contentSelected.name}</Heading>
        {contentSelected.id?.split('_')[1] ? <Text color={"whiteAlpha.500"} fontSize={'md'}>{contentSelected.id.split('_')[1]}</Text> : null}
      </Box>
      <Stack flex={1} color={"white"} alignSelf={'baseline'} w={"full"}>

        {tempData?.filter((sec) => sec.id === contentSelected.id)[0]?.content?.map((cont, contI) => (
          <>
            <Flex key={contI} alignItems={"center"} gap={4} w={"full"} _hover={{ backgroundColor: "whiteAlpha.50" }} px={4}>
              <Editable p={2} value={cont.value} fontSize={cont.fontSize} fontWeight={cont.fontWeight} w={"full"} placeholder="Insira um texto...">
                <EditablePreview />
                <EditableInput _focusVisible={{ outline: "none" }} />
              </Editable>
              <Popover isOpen={contI === itemSelected}>
                <PopoverTrigger>
                  <IconButton variant={"unstyled"} aria-label="Editar" icon={<EditIcon />} m={0} p={0} minW={"8"} h={"8"} onClick={() => setItemSelected(contI)} />
                </PopoverTrigger>
                <PopoverContent color="white" bgColor={"gray.700"} border={"none"}>
                  <PopoverCloseButton onClick={() => setItemSelected(-1)} />
                  <PopoverHeader>Editar</PopoverHeader>
                  <PopoverBody >
                    <Stack gap={4}>
                      <Flex alignItems={"center"} justifyContent={"space-between"} mt={2}>
                        Posição:
                        <Stack direction={"row"} gap={2}>
                          <IconButton bg="gray.800" color={"white"} _hover={{ color: "gray.700", bgColor: "white" }} variant={"outline"} aria-label="Subir" icon={<ArrowUpIcon />} onClick={() => moveItem(-1)} />
                          <IconButton bg="gray.800" color={"white"} _hover={{ color: "gray.700", bgColor: "white" }} variant={"outline"} aria-label="Descer" icon={<ArrowDownIcon />} onClick={() => moveItem(1)} />
                        </Stack>
                      </Flex>
                      <Divider />
                      <Flex alignItems={"center"} justifyContent={"space-between"}>
                        Tamanho da fonte:
                        <Select value={cont.fontSize} w={"32"} bg="gray.800" ref={fontSize} onChange={updateTempData}>
                          <option style={{ backgroundColor: "#1A202C" }} value={"xs"}>xs</option>
                          <option style={{ backgroundColor: "#1A202C" }} value={"sm"}>sm</option>
                          <option style={{ backgroundColor: "#1A202C" }} value={"md"}>md</option>
                          <option style={{ backgroundColor: "#1A202C" }} value={"lg"}>lg</option>
                          <option style={{ backgroundColor: "#1A202C" }} value={"xl"}>xl</option>
                          <option style={{ backgroundColor: "#1A202C" }} value={"2xl"}>2xl</option>
                          <option style={{ backgroundColor: "#1A202C" }} value={"3xl"}>3xl</option>
                          <option style={{ backgroundColor: "#1A202C" }} value={"4xl"}>4xl</option>
                        </Select>
                      </Flex>
                      <Divider />
                      <Flex alignItems={"center"} justifyContent={"space-between"} mb={2}>
                        Grossura da fonte:
                        <Select defaultValue={cont.fontWeight} w={"32"} bg="gray.800" ref={fontWeight} onChange={updateTempData}>
                          <option style={{ backgroundColor: "#1A202C" }} value={"light"}>Light</option>
                          <option style={{ backgroundColor: "#1A202C" }} value={"normal"}>Normal</option>
                          <option style={{ backgroundColor: "#1A202C" }} value={"bold"}>Bold</option>
                        </Select>
                      </Flex>
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
          </>
        ))}



      </Stack>
      <Stack direction={"row"} gap={2}>
        <Button colorScheme="green" onClick={sendData}> Salvar </Button>
        <Button variant={"outline"} color={"white"} _hover={{ color: "black", bgColor: "white" }} onClick={resetData}> Resetar </Button>
      </Stack>
    </Flex>
  )
}