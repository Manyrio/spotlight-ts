"use client"
import { Metadata } from "next";
import { ApiListResponse } from "@/models/other";
import { Legal } from "@/models/legals";
import { Method, call } from "@/scripts/api";
import { SimpleLayout } from "@/components/SimpleLayout";
import Markdown from "react-markdown";
import { components } from "../articles/[id]/content";
import { useContext } from "react";
import { AppContext } from "@/app/providers";


export default function PrivacyContent({ legal }: { legal: Legal }) {

  let { colors } = useContext(AppContext)

  return (
    <SimpleLayout
      title="Politique de confidentialité"
      intro="Politique de confidentialité du site internet"
    >


      <Markdown
        components={components(colors)}
      >{legal.attributes.privacy}</Markdown>

    </SimpleLayout>

  )
}

