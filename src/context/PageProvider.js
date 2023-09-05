import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const PageContext = createContext();

export default function PageProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [languages, setLanguages] = useState();

  const [currentLanguage, setCurrentLanguage] = useState("");

  useEffect(() => {
    async function getData() {
      await axios.get("http://localhost:3000/api/content").then((res) => setData(res.data));
      await axios.get("http://localhost:3000/api/language").then((res) => setLanguages(res.data));
      setIsLoading(false);
    }
    getData()

    let value;
    value = localStorage.getItem("currentLanguage") || "pt-br";
    setCurrentLanguage(value);
  }, []);

  useEffect(() => localStorage.setItem("currentLanguage", currentLanguage), [currentLanguage]);

  return <PageContext.Provider value={{ isLoading, data, languages, currentLanguage, setCurrentLanguage }}>{children}</PageContext.Provider>;
}
