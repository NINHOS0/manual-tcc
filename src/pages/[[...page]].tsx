// import { Inter } from "next/font/google";
import { Text, Flex, Box, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerCloseButton, DrawerHeader, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { PageContext } from "@/context/PageProvider";
import { section, subsection } from "@/interfaces/contentProps";
import HomeHeader from "@/components/home/HomeHeader";
import HomeAside from "@/components/home/HomeAside";
import HomeCurrentPage from "@/components/home/HomeCurrentPage";
import HomeLanguage from "@/components/home/HomeLanguage";
import HomeMainContent from "@/components/home/HomeMainContent";
import { ContextProps } from "@/interfaces/contextProps";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoading, data, currentLanguage } = useContext<ContextProps>(PageContext)
  const route = useRouter();

  useEffect(() => {
    if (!isLoading) {
      let foundUrl = false

      if (route.query.page) {
        data[currentLanguage].forEach((sec: section) => {
          if (sec.content && sec.id === route.query.page![0] && route.query.page![1] === undefined) foundUrl = true
          else if (sec.routes) {
            sec.routes.forEach((sub: subsection) => {
              if (route.query.page![1] && sub.id.split('_')[0] === route.query.page![1] && route.query.page![2] === undefined) foundUrl = true
            })
          }
        });
        if (!foundUrl) route.push('/' + data[currentLanguage][0].id)
      }
    }
  }, [isLoading, data, currentLanguage, route])

  /*

  FECHAR AUTOMATIZAMENTE QUANDO DIMINUE A TELA - *PERDA DE DESEMPENHO
  
  */
  useEffect(() => {
    function resizeClose(e: any) {
      if (e.target.innerWidth >= 992 && isOpen) {
        onClose()
        window.removeEventListener("resize", resizeClose)
      }
    }

    window.addEventListener("resize", resizeClose)

  }, [isOpen, onClose])

  return (
    <>

      {/* ASIDE MOBILE */}

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        size={"xs"}
      >
        <DrawerOverlay />
        <DrawerContent bgColor={"gray.100"} color={"black"} _dark={{ color: "white", bgColor: "gray.900" }}>
          <DrawerHeader>

            <HomeCurrentPage
              isLoading={isLoading}
              data={data}
              currentLanguage={currentLanguage}
              fontSize={"xs"}
            />

            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody pl={"-2"} mt={2}>

            <HomeAside
              isLoading={isLoading}
              data={data}
              currentLanguage={currentLanguage}
            />

          </DrawerBody>
        </DrawerContent>
      </Drawer>


      <Flex bgColor={"gray.100"} color={"black"} _dark={{ color: "white", bgColor: "gray.900" }} direction={"column"} minH={"100vh"} h={"full"} alignItems={"center"}>

        {/* HEADER */}
        <HomeHeader
          isLoading={isLoading}
          data={data}
          currentLanguage={currentLanguage}
        />

        <Flex w={"full"} maxW={"1400px"} flex={1} py={8} pr={{ base: 4, sm: 8, md: 12 }} pl={{ base: 4, sm: 8, md: 12 }} overflow={{ base: "auto", md: "hidden" }}>

          {/* ASIDE */}
          <Box w={"56"} display={{ base: "none", md: "initial" }} pr={12}>
            <HomeAside
              isLoading={isLoading}
              data={data}
              currentLanguage={currentLanguage}
            />
          </Box>



          {/* MAIN */}

          <Box flex={1}>

            {/* MAIN HEADER */}
            <Flex justifyContent={"space-between"} mb={"8"} alignItems={"center"}>
              <Box display={{ base: "none", md: "inherit" }}>
                <HomeCurrentPage
                  isLoading={isLoading}
                  data={data}
                  currentLanguage={currentLanguage}
                />
              </Box>
              <IconButton aria-label="Menu" variant={"unstyled"} icon={<HamburgerIcon />} minW={"min-content"} h={"min-content"} display={{ base: "initial", md: "none" }} onClick={onOpen} />
              <HomeLanguage />
            </Flex>

            {/* MAIN CONTENT */}
            <HomeMainContent
              isLoading={isLoading}
              data={data}
              currentLanguage={currentLanguage}
            />

          </Box>
        </Flex>

        {/* FOOTER */}
        <Flex align={"center"} justify={"center"} w={"full"} h={8} color={"black"} bgColor={"blackAlpha.200"} _dark={{ color: "white", bgColor: "blackAlpha.500" }}>
          <Text fontSize={"xs"} fontWeight={"medium"}>INNOSEC - MANUAL DE UTILIZAÇÃO</Text>
        </Flex>
      </Flex>
    </>
  );
}
