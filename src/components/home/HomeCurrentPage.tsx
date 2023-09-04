import { content, section, subsection } from "@/interfaces/contentApi"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { Skeleton, Text } from "@chakra-ui/react"
import { RouterEvent, useRouter } from "next/router"

interface HomeCurrentPageProps {
  data: { process: boolean, result: content }
  currentLanguage: string
  fontSize?: string
}

export default function HomeCurrentPage({data, currentLanguage, fontSize = 'base'}: HomeCurrentPageProps) {
  const route = useRouter();

  return (
    <Skeleton h={3} minW={32} startColor='gray.500' endColor='gray.300' isLoaded={!data.process}>
      {(data.result && route.query.page) && data.result[currentLanguage].map((sec: section) => {
        if (sec.content && sec.id === route.query.page![0]) return <Text key={sec.id} fontSize={fontSize} color={"blackAlpha.700"} _dark={{ color: "whiteAlpha.700" }}>{sec.name}</Text>
        else if (sec.routes && route.query.page![1]) return <Text key={sec.id} fontSize={fontSize} color={"blackAlpha.700"} _dark={{ color: "whiteAlpha.700" }}> {sec.name} <ChevronRightIcon /> {sec.routes?.filter((sub: subsection) => sub.id === route.query.page![1])[0]?.name} </Text>
      })}
    </Skeleton>
  )
}