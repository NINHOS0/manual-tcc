import { Inter } from "next/font/google";
import { Stack, Heading, Text, Flex, Box, AccordionPanel, Accordion, AccordionItem, AccordionButton, AccordionIcon, Link, Button, Select, LinkBox, Image, Tooltip, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerCloseButton, DrawerHeader, useDisclosure, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { ArrowRightIcon, ChevronRightIcon, ExternalLinkIcon, HamburgerIcon, LinkIcon, SunIcon } from "@chakra-ui/icons";
import LogoBlack from "../../public/img/logo-black.png"
import LogoWhite from "../../public/img/logo-white.png"
import { PageContext } from "@/context/PageProvider";
import { content, section, subsection } from "@/interfaces/contentApi";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //const theme = extendTheme({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const route = useRouter();
  console.log(route.query);

  const { data, languages, currentLanguage, setCurrentLanguage } = useContext(PageContext)


  useEffect(() => {
    if (!data.process) {
      let foundUrl = false
      data.result[currentLanguage].forEach((sec: section) => {
        if (sec.id === route.query.page![0]) foundUrl = true
        if (route.query.page![1] && sec.routes) {
          sec.routes.forEach((sub: subsection) => {
            if (sub.id === route.query.page![1]) foundUrl = true
          })
        }
        if (route.query.page![1] && !sec.routes) foundUrl = false
      });
      if (!foundUrl) route.push('/' + data.result[currentLanguage][0].id)
    }
  }, [data])

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
        <DrawerContent bgColor={"gray.900"} color={"white"}>
          <DrawerHeader>
            <Text fontSize={"xs"} color={"whiteAlpha.700"}>Produtos <ChevronRightIcon /> Consulta</Text>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody pl={"-2"} mt={2}>
            <Accordion allowMultiple allowToggle border={"none"}>
              <Box pl={"2.8em"} my={2}>
                <Link color={"white"}>Início</Link>
              </Box>
              <AccordionItem border={"none"} w={"fit-content"}>
                <h2>
                  <AccordionButton>
                    <AccordionIcon color={"white"} />
                    <Box as="span" flex="1" mx={2} textAlign="left" color={"white"}>
                      Produtos
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel p={0} color={"white"}>
                  <Stack pl={14} spacing={0}>
                    <Link>Cadastro</Link>
                    <Link>Consulta</Link>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem border={"none"} w={"fit-content"}>
                <h2>
                  <AccordionButton>
                    <AccordionIcon mr={2} color={"white"} />
                    <Box as="span" flex="1" textAlign="left" color={"white"}>
                      Estoque
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel p={0} color={"white"}>
                  <Stack pl={14} spacing={0}>
                    <Link>Cadastro</Link>
                    <Link>Consulta</Link>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>


      <Flex bgColor={"gray.900"} direction={"column"} h={"100vh"} alignItems={"center"}>



        {/* HEADER */}

        <Flex color={"white"} bgColor={"blackAlpha.500"} w={"full"} h={14} justifyContent={"center"}>
          <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} maxW={"1400px"} h={"full"} px={16} py={"2.5"}>
            <Tooltip label="Início">
              <Link href="#" h={"full"}><Image src={LogoWhite.src} h={"full"} /></Link>
            </Tooltip>
            <Tooltip label="Tema claro">
              <Link><SunIcon /></Link>
            </Tooltip>
          </Flex>
        </Flex>
        <Flex w={"full"} maxW={"1400px"} flex={1} py={8} pr={{ base: 0, md: 12 }} pl={{ base: 4, md: 12 }} overflow={"hidden"}>



          {/* ASIDE */}

          <Box w={"56"} display={{ base: "none", md: "initial" }}>
            <Accordion allowMultiple allowToggle border={"none"}>
              <Box pl={"2.8em"} my={2}>
                <Link color={"white"}>Início</Link>
              </Box>
              <AccordionItem border={"none"} w={"fit-content"}>
                <h2>
                  <AccordionButton>
                    <AccordionIcon color={"white"} />
                    <Box as="span" flex="1" mx={2} textAlign="left" color={"white"}>
                      Produtos
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel p={0} color={"white"}>
                  <Stack pl={14} spacing={0}>
                    <Link>Cadastro</Link>
                    <Link>Consulta</Link>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem border={"none"} w={"fit-content"}>
                <h2>
                  <AccordionButton>
                    <AccordionIcon mr={2} color={"white"} />
                    <Box as="span" flex="1" textAlign="left" color={"white"}>
                      Estoque
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel p={0} color={"white"}>
                  <Stack pl={14} spacing={0}>
                    <Link>Cadastro</Link>
                    <Link>Consulta</Link>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>



          {/* MAIN */}

          <Box flex={1}>
            <Flex justifyContent={"space-between"} mb={"8"} alignItems={"center"} color={"white"}>
              <Text display={{ base: "none", md: "initial" }}>Inicio</Text>
              <IconButton aria-label="Menu" variant={"unstyled"} icon={<HamburgerIcon />} minW={"min-content"} h={"min-content"} display={{ base: "initial", md: "none" }} onClick={onOpen} />
              <Tooltip label="Idioma">
                <Select defaultValue={"pt-br"} variant="unstyled" w={"28"}>
                  <option style={{ color: "white", backgroundColor: "#171923" }} value="pt-br">
                    Português
                  </option>
                  <option style={{ color: "white", backgroundColor: "#171923" }} value="en">
                    English
                  </option>
                </Select>
              </Tooltip>
            </Flex>
            <Stack color={"white"} textAlign={"justify"} h={"calc(100vh - 13em)"} overflowY={"auto"} pr={4}>
              <Heading size={"lg"} mb={2}>
                Produtos
              </Heading>
              <Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, pariatur exercitationem! Iste deserunt adipisci, fuga omnis sequi aspernatur ad rerum nobis, doloribus odit maxime
                dignissimos commodi ex vitae totam. Quibusdam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non perspiciatis fuga vero dolorum quaerat, corporis numquam? Omnis, debitis alias
                tempore soluta doloremque recusandae quo explicabo officiis, reprehenderit molestias possimus in.
              </Text>
              <Link display={"inline-flex"} alignItems={"center"} gap={"1"} color={"blue.300"}><ExternalLinkIcon boxSize={'3.5'} /> Redirecionar para cadastro de produtos!</Link>
              <Link display={"inline-flex"} alignItems={"center"} gap={"1"} color={"blue.300"}><ExternalLinkIcon boxSize={'3.5'} /> Redirecionar para cadastro de produtos!</Link>
              <Heading size={"lg"} mb={2}>
                Produtos
              </Heading>
              <Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, pariatur exercitationem! Iste deserunt adipisci, fuga omnis sequi aspernatur ad rerum nobis, doloribus odit maxime
                dignissimos commodi ex vitae totam. Quibusdam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non perspiciatis fuga vero dolorum quaerat, corporis numquam? Omnis, debitis alias
                tempore soluta doloremque recusandae quo explicabo officiis, reprehenderit molestias possimus in.
              </Text>
              <Link display={"inline-flex"} alignItems={"center"} gap={"1"} color={"blue.300"}><ExternalLinkIcon boxSize={'3.5'} /> Redirecionar para cadastro de produtos!</Link>
              <Link display={"inline-flex"} alignItems={"center"} gap={"1"} color={"blue.300"}><ExternalLinkIcon boxSize={'3.5'} /> Redirecionar para cadastro de produtos!</Link>
              <Heading size={"lg"} mb={2}>
                Produtos
              </Heading>
              <Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, pariatur exercitationem! Iste deserunt adipisci, fuga omnis sequi aspernatur ad rerum nobis, doloribus odit maxime
                dignissimos commodi ex vitae totam. Quibusdam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non perspiciatis fuga vero dolorum quaerat, corporis numquam? Omnis, debitis alias
                tempore soluta doloremque recusandae quo explicabo officiis, reprehenderit molestias possimus in.
              </Text>
              <Link display={"inline-flex"} alignItems={"center"} gap={"1"} color={"blue.300"}><ExternalLinkIcon boxSize={'3.5'} /> Redirecionar para cadastro de produtos!</Link>
              <Link display={"inline-flex"} alignItems={"center"} gap={"1"} color={"blue.300"}><ExternalLinkIcon boxSize={'3.5'} /> Redirecionar para cadastro de produtos!</Link>
            </Stack>
          </Box>
        </Flex>
        <Flex align={"center"} justify={"center"} bgColor={"blackAlpha.500"} textColor={"white"} w={"full"} h={8}>
          <Text fontSize={"xs"}>INNOSEC - MANUAL DE UTILIZAÇÃO</Text>
        </Flex>
      </Flex>
    </>
  );
}

// <div className='flex flex-col justify-center items-center h-screen bg-zinc-50'>
//       <header className='w-screen bg-zinc-300 h-14 py-2'>
//         <div>

//         </div>
//       </header>
//       <div className='flex flex-1 w-10/12 py-8'>
//         <aside className='flex flex-col gap-2 w-60 pr-8'>
//           <Heading size={'lg'} mb={2}>Manual</Heading>
//             <details>
//               <summary className='text-xl font-medium select-none cursor-pointer'>Loren</summary>
//               <Text ml={8} fontSize={'md'} fontWeight={'medium'}>Loren 1</Text>
//               <Text ml={8} fontSize={'md'} fontWeight={'medium'}>Loren 2</Text>
//             </details>
//         </aside>
//         <main className='flex-1 px-8'>
//           <div className='flex justify-between w-full mb-8 text-sm font-medium'>
//             <div> Page / Page 2</div>
//             <div>Portuguese (pt-br)</div>
//           </div>
//           <Heading size={'lg'} mb={2}>Loren ipson</Heading>
//           <Text fontSize={'md'} fontWeight={'medium'}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo impedit quia, ducimus provident aliquid laudantium vel quam, voluptates error suscipit deleniti, placeat tenetur itaque voluptate similique. Explicabo impedit ipsa repellendus?</Text>
//         </main>
//       </div>
//       <footer className='flex justify-center items-center w-screen h-6 bg-zinc-300'> <Text fontSize={'sm'} fontWeight={'medium'}>Innosec • Manual de utilização</Text></footer>
//     </div>
