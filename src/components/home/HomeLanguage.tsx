import { PageContext } from "@/context/PageProvider";
import { ContextProps, content, language } from "@/interfaces/contentApi";
import { Select, Skeleton, Tooltip } from "@chakra-ui/react";
import { useContext } from "react";

export default function HomeLanguage() {
  const { data, languages, currentLanguage, setCurrentLanguage } = useContext<ContextProps>(PageContext)

  return (
    <Skeleton startColor='gray.500' endColor='gray.300' isLoaded={!data.process}>
      <Tooltip label="Idioma">
        <Select defaultValue={currentLanguage} variant="unstyled" w={"28"} onChange={(e) => setCurrentLanguage(e.target.value)}>
          {languages.result && languages.result.map((lang: language) => (
            <option key={lang.id} style={{ color: "white", backgroundColor: "#171923" }} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </Select>
      </Tooltip>
    </Skeleton>
  )
}