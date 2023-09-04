import { data } from "@/interfaces/contentApi";
import { useState, useEffect } from "react";

export default function useApi(api: string) {
  const [process, setProcess] = useState<boolean>(true);
  const [result, setResult] = useState<any>();

  async function getData() {
    setProcess(true);
    await fetch(api)
      .then((response) => response.json())
      .then(async (data) => {
        await setResult(data);
        setProcess(false);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return {
    process,
    result
  };
}
