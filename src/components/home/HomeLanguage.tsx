import { PageContext } from "@/context/PageProvider";
import { language } from "@/interfaces/contentProps";
import { ContextProps } from "@/interfaces/contextProps";
import { Select, Skeleton, Tooltip } from "@chakra-ui/react";
import { useContext } from "react";

export default function HomeLanguage() {
  const { isLoading, data, languages, currentLanguage, setCurrentLanguage } = useContext<ContextProps>(PageContext)
  
  return (
    <Skeleton startColor='gray.500' endColor='gray.300' isLoaded={!isLoading}>
      <Tooltip label="Idioma">
        <Select defaultValue={currentLanguage} variant="unstyled" w={"28"} onChange={(e) => setCurrentLanguage(e.target.value)}>
          {!isLoading && languages.map((lang: language) => (
            <option key={lang.id} style={{ color: "white", backgroundColor: "#171923" }} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </Select>
      </Tooltip>
    </Skeleton>
  )
}