import { Inter } from "next/font/google";
import { Stack, Heading, Text, Flex, Box, AccordionPanel, Accordion, AccordionItem, AccordionButton, AccordionIcon, Link, Button, Select, LinkBox, Image, Tooltip, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerCloseButton, DrawerHeader, useDisclosure, Divider, Skeleton, SkeletonText, grid, Grid, GridItem, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useState } from "react";
import { ArrowRightIcon, ChevronRightIcon, ExternalLinkIcon, HamburgerIcon, LinkIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { PageContext } from "@/context/PageProvider";
import { ContextProps, content, language, section, subsection } from "@/interfaces/contentApi";
import HomeHeader from "@/components/home/HomeHeader";
import HomeMainItem from "@/components/home/HomeMainItem";
import HomeAside from "@/components/home/HomeAside";
import HomeCurrentPage from "@/components/home/HomeCurrentPage";
import HomeLanguage from "@/components/home/HomeLanguage";
import HomeMainContent from "@/components/home/HomeMainContent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data, currentLanguage} = useContext<ContextProps>(PageContext)
  const route = useRouter();


  useEffect(() => {
    if (!data.process) {
      let foundUrl = false

      if (route.query.page) {
        data.result[currentLanguage].forEach((sec: section) => {
          if (sec.content && sec.id === route.query.page![0] && route.query.page![1] === undefined) foundUrl = true
          else if (sec.routes) {
            sec.routes.forEach((sub: subsection) => {
              if (route.query.page![1] && sub.id === route.query.page![1] && route.query.page![2] === undefined) foundUrl = true
            })
          }
        });
      }
      if (!foundUrl) route.push('/' + data.result[currentLanguage][0].id)
    }
  }, [data.process])

  /*

  FECHAR AUTOMATIZAMENTE QUANDO DIMINUE A TELA - *PERDA DE DESEMPENHO
  
  */
  // useEffect(() => {
  //   console.log('inicio')
  //   function resizeClose(e: any) {
  //     console.log('dentro')
  //     if (e.target.innerWidth >= 992 && isOpen) {
  //       onClose()
  //       window.removeEventListener("resize", resizeClose)
  //     }
  //   }

  //   window.addEventListener("resize", resizeClose)

  // }, [isOpen])

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
              data={data}
              currentLanguage={currentLanguage}
              fontSize={"xs"}
            />

            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody pl={"-2"} mt={2}>
            <HomeAside
              data={data}
              currentLanguage={currentLanguage}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>


      <Flex bgColor={"gray.100"} color={"black"} _dark={{ color: "white", bgColor: "gray.900" }} direction={"column"} minH={"100vh"} h={"full"} alignItems={"center"}>

        {/* HEADER */}
        <HomeHeader
          data={data}
          currentLanguage={currentLanguage}
        />

        <Flex w={"full"} maxW={"1400px"} flex={1} py={8} pr={{ base: 0, md: 12 }} pl={{ base: 4, md: 12 }} overflow={{ base: "auto", md: "hidden" }}>

          {/* ASIDE */}
          <Box w={"56"} display={{ base: "none", md: "initial" }} pr={12}>
            <HomeAside
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
                  data={data}
                  currentLanguage={currentLanguage}
                />
              </Box>
              <IconButton aria-label="Menu" variant={"unstyled"} icon={<HamburgerIcon />} minW={"min-content"} h={"min-content"} display={{ base: "initial", md: "none" }} onClick={onOpen} />
              <HomeLanguage />
            </Flex>

            {/* MAIN CONTENT */}
            <HomeMainContent
              data={data}
              currentLanguage={currentLanguage}
            />

          </Box>
        </Flex>

        {/* FOOTER */}
        <Flex align={"center"} justify={"center"} w={"full"} h={8} color={"black"} bgColor={"blackAlpha.200"} _dark={{ color: "white", bgColor: "blackAlpha.500" }}>
          <Text fontSize={"xs"}>INNOSEC - MANUAL DE UTILIZAÇÃO</Text>
        </Flex>
      </Flex>
    </>
  );
}
