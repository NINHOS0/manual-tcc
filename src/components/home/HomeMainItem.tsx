import { galleryItem, linkItem, textItem } from "@/interfaces/itensProps"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Flex, Image, Link, Text } from "@chakra-ui/react"

interface HomeMainItemProps {
  item: (textItem | linkItem | galleryItem)
}

export default function HomeMainItem({ item }: HomeMainItemProps) {
  return (
    <>
      {
      item.type === "text"
      ? <Text fontSize={item.fontSize} fontWeight={item.fontWeight}>{item.value}</Text>
      : item.type === "link"
      ? <Link display={"inline-flex"} alignItems={"center"} gap={"1"} color={"blue.500"} w={'fit-content'} fontSize={item.fontSize} fontWeight={item.fontWeight} href={`${item.url}`}><ExternalLinkIcon boxSize={'3.5'} />{item.value}</Link>
      : item.type === "gallery"
      ? (
        <Flex flexWrap={{ base: "wrap", lg: "nowrap" }} gap={4} justifyContent={"center"} mt={8} mx={8}>
          {item.images.map((img, i) => (
            <Image key={1} src={`./img/${img.src}`} alt={img.alt} minW={"200px"} w={{ base: "250px", lg: "350px" }} borderRadius={"lg"} />
          ))}
        </Flex>
      )
      : ''}
    </>
  )
}