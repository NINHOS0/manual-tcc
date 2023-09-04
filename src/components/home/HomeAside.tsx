import { content, section, subsection } from "@/interfaces/contentApi"
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Link, SkeletonText, Stack, useColorMode } from "@chakra-ui/react"

interface HomeAsideProps {
  data: { process: boolean, result: content },
  currentLanguage: string
}

export default function HomeAside({ data, currentLanguage }: HomeAsideProps) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      {data.process
        ? <SkeletonText startColor='gray.500' endColor='gray.300' mt='2' noOfLines={3} spacing='4' skeletonHeight='3' />
        : (
          <Accordion allowMultiple border={"none"}>
            {data.result && data.result[currentLanguage].map((sec: section) => {
              if (sec.content) {
                return (
                  <Link key={sec.id} pl={"2.8em"} my={2} href={`/${sec.id}`}>{sec.name}</Link>
                )
              } else return (
                <AccordionItem key={sec.id} border={"none"} w={"fit-content"}>
                  <AccordionButton _hover={{bgColor: "transparent"}}>
                    <AccordionIcon />
                    <Box as="span" flex="1" mx={2} textAlign="left">
                      {sec.name}
                    </Box>
                  </AccordionButton>
                  <AccordionPanel p={0}>
                    <Stack pl={14} spacing={0}>
                      {sec.routes?.map((sub: subsection) => (
                        <Link key={sub.id} href={`/${sec.id}/${sub.id}`}>{sub.name}</Link>
                      ))}
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              )
            })}
          </Accordion>
        )}
    </>
  )
}