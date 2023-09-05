import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import React from "react";
import HomeMainItem from "./HomeMainItem";
import { content, section, subsection } from "@/interfaces/contentProps";
import { useRouter } from "next/router";

interface HomeMainContentProps {
  isLoading: boolean,
  data: content,
  currentLanguage: string
}

export default function HomeMainContent({isLoading, data, currentLanguage}: HomeMainContentProps) {
  const route = useRouter()

  return (
    <Stack textAlign={"justify"} h={{ md: "calc(100vh - 13em)" }} overflowY={{ md: "auto" }}>

      {isLoading ? (
        <>
          <Skeleton h={6} w={40} startColor='gray.500' endColor='gray.300' />
          <SkeletonText startColor='gray.500' endColor='gray.300' mt='2' noOfLines={4} spacing='2' skeletonHeight='2.5' />
          <SkeletonText startColor='gray.500' endColor='gray.300' mt='4' noOfLines={4} spacing='2' skeletonHeight='2.5' />
        </>
      ) : (
        <>
          {route.query.page && data[currentLanguage].map((sec: section) => (
            <React.Fragment key={sec.id}>
              {sec.content && sec.id === route.query.page![0] ? sec.content.map((item, i) => (
                <HomeMainItem
                  key={i}
                  item={item}
                />
              )) : sec.routes && sec.id === route.query.page![0] && sec.routes.map((sub: subsection) => (
                <React.Fragment key={sub.id}>
                  {sub.id === route.query.page![1] && sub.content.map((item, i) => (
                    <HomeMainItem
                      key={i}
                      item={item}
                    />
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </>
      )}
    </Stack>
  )
}