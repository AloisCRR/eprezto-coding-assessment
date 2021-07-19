import { GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import InsurancePolicies from "../components/InsurancePolicies";
import { Actions } from "../redux-store";
import { JSONData } from "./api/insurance-policies";

export default function Home({ insurancePolicies }: Props) {
  const dispatch = useDispatch<Dispatch<Actions>>();

  dispatch({ type: "ADD_INSURANCE_POLICIES", insurancePolicies });

  return (
    <>
      <Head>
        <title>Eprezto Coding Assessment</title>
        <meta
          name="description"
          content="Project for Eprezto Coding Assessment v1.0"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="bg-gradient-to-br from-eprezto-main to-eprezto-light min-h-screen">
        <article className="container px-8 mx-auto">
          <Header />
          <main>
            <InsurancePolicies />
          </main>
        </article>
      </main>
    </>
  );
}

type Props = {
  insurancePolicies: JSONData[];
};

interface Params extends ParsedUrlQuery {}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  const response = await fetch("http://localhost:3000/api/insurance-policies");
  const data = (await response.json()) as JSONData[];

  return { props: { insurancePolicies: data } };
};
