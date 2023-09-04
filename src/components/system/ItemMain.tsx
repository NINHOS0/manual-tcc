import { EditIcon } from "@chakra-ui/icons";
import { Divider, Editable, EditableInput, EditablePreview, Flex, IconButton, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Select, Stack } from "@chakra-ui/react";

export default function ItemMain() {
  return (
    <Flex key={contI} alignItems={"center"} gap={4} w={"full"} _hover={{ backgroundColor: "whiteAlpha.50" }} px={4}>
      <Editable p={2} value={cont.value} fontSize={cont.size} fontWeight={cont.weight} w={"full"} placeholder="Insira um texto...">
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
          <PopoverBody>
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
                <Select value={cont.size} w={"32"} bg="gray.800" ref={fontSize} onChange={updateTempData}>
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
                <Select defaultValue={cont.weight} w={"32"} bg="gray.800" ref={fontWeight} onChange={updateTempData}>
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
  )
}