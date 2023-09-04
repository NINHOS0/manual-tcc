import useApi from "@/hooks/useApi";
import { useRouter } from "next/router";
import { createContext, useState, useEffect } from "react";

export const PageContext = createContext()

export default function PageProvider({children}) {
  const route = useRouter()

  const data = useApi("http://localhost:5000/content")
  const languages = useApi("http://localhost:5000/languages")

  const [currentLanguage, setCurrentLanguage] = useState("");

  useEffect(() => {
    let value

    value = localStorage.getItem("currentLanguage") || "pt-br"
    setCurrentLanguage(value)
  }, [])

  useEffect(() => localStorage.setItem("currentLanguage", currentLanguage), [currentLanguage])

  return (
    <PageContext.Provider value={{data, languages, currentLanguage, setCurrentLanguage}}>
      {children}
    </PageContext.Provider>
  )
}
