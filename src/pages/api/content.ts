// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { content } from '@/interfaces/contentProps';
import type { NextApiRequest, NextApiResponse } from 'next'

const data: content = {
  "pt-br": [
    {
      id: "inicio",
      name: "Início",
      content: [
        {
          type: "text",
          fontSize: "3xl",
          fontWeight: "bold",
          value: "Início"
        },
        {
          type: "text",
          value: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, pariatur exercitationem! Iste deserunt adipisci, fuga omnis sequi aspernatur ad rerum nobis, doloribus odit maxime dignissimos commodi ex vitae totam. Quibusdam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non perspiciatis fuga vero dolorum quaerat, corporis numquam? Omnis, debitis alias tempore soluta doloremque recusandae quo explicabo officiis, reprehenderit molestias possimus in."
        },
        {
          type: "link",
          value: "Ir para produtos",
          url: "produtos/cadastro"
        }
      ]
    },
    {
      id: "produtos",
      name: "Produtos",
      routes: [
        {
          id: "cadastro_produtos",
          name: "Cadastro",
          content: [

          ]
        }
      ]
    }
  ],
  en: [
    {
      id: "inicio",
      name: "Welcome",
      content: [
        {
          type: "text",
          fontSize: "3xl",
          fontWeight: "bold",
          value: "Welcome"
        },
        {
          type: "text",
          value: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, pariatur exercitationem! Iste deserunt adipisci, fuga omnis sequi aspernatur ad rerum nobis, doloribus odit maxime dignissimos commodi ex vitae totam. Quibusdam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non perspiciatis fuga vero dolorum quaerat, corporis numquam? Omnis, debitis alias tempore soluta doloremque recusandae quo explicabo officiis, reprehenderit molestias possimus in."
        },
        {
          type: "link",
          value: "Go to products",
          url: "/produtos/cadastro"
        }
      ]
    },
    {
      id: "produtos",
      name: "Products",
      routes: [
        {
          id: "cadastro_produtos",
          name: "New product",
          content: [

          ]
        }
      ]
    }
  ]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query?.lang) res.status(200).json(data[req.query?.lang[0]]);
  else res.status(200).json(data);
}

