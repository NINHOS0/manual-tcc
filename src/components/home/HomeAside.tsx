import { content, section, subsection } from "@/interfaces/contentProps"
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Link, SkeletonText, Stack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

interface HomeAsideProps {
  isLoading: boolean,
  data: content,
  currentLanguage: string,
}

export default function HomeAside({isLoading, data, currentLanguage }: HomeAsideProps) {
  const [currentPage, setCurrentPage] = useState<number[] | undefined>(undefined);
  const {query} = useRouter()

  useEffect(() => {
    if (!isLoading && query.page)
    setCurrentPage([data[currentLanguage].filter(sec => sec.routes !== undefined).indexOf(data[currentLanguage].filter(sec => sec.routes && sec.id === query.page![0])[0])])
  }, [isLoading, query])

  return (
    <>
      {isLoading
        ? <SkeletonText startColor='gray.500' endColor='gray.300' mt='2' noOfLines={3} spacing='4' skeletonHeight='3' />
        : currentPage && (
          <Accordion defaultIndex={currentPage} allowMultiple border={"none"}>
            {data[currentLanguage].map((sec: section) => {
              if (sec.content) {
                return (
                  <Link key={sec.id} pl={"2.8em"} my={2} href={`/${sec.id}`} fontWeight={query.page && query.page![0] === sec.id ? "medium" : "normal"}>{sec.name}</Link>
                )
              } else return (
                <AccordionItem key={sec.id} border={"none"} w={"fit-content"}>
                  <AccordionButton _hover={{bgColor: "transparent"}}>
                    <AccordionIcon />
                    <Box as="span" flex="1" mx={2} textAlign="left" fontWeight={query.page && query.page![0] === sec.id ? "medium" : "normal"}>
                      {sec.name}
                    </Box>
                  </AccordionButton>
                  <AccordionPanel p={0}>
                    <Stack pl={14} spacing={0}>
                      {sec.routes?.map((sub: subsection) => (
                        <Link key={sub.id} href={`/${sec.id}/${sub.id.split('_')[0]}`} fontWeight={query.page && query.page![0] === sec.id ? "medium" : "normal"}>{sub.name}</Link>
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