import { Flex, IconButton, Image, Link, Tooltip, useColorMode } from "@chakra-ui/react";
import LogoBlack from "/public/img/logo-black.png"
import LogoWhite from "/public/img/logo-white.png"
import { content } from "@/interfaces/contentApi";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface HomeHeaderProps {
  data: { process: boolean, result: content },
  currentLanguage: string
}

export default function HomeHeader({data, currentLanguage}: HomeHeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex color={"black"} bgColor={"whiteAlpha.900"} _dark={{color: "white", bgColor: "blackAlpha.500"}} w={"full"} h={14} justifyContent={"center"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} maxW={"1400px"} h={"full"} px={16} py={"2.5"}>
        <Tooltip label="Início">
          <Link href={data.result ? `/${data.result[currentLanguage][0].id}` : "#"} h={"full"}>
            <Image src={colorMode === "light" ? LogoBlack.src : LogoWhite.src} h={"full"} />
          </Link>
        </Tooltip>
        <Tooltip label="Alterar tema">
          <IconButton onClick={toggleColorMode} variant={"unstyled"} minW={"fit-content"} minH={"fit-content"} aria-label="Tema" icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />} />
        </Tooltip>
      </Flex>
    </Flex>
  );
}
