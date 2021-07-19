import Head from "next/head";
import Header from "../components/Header";
import InsurancePolicies from "../components/InsurancePolicies";

export default function Home() {
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

      <main className="bg-gradient-to-br from-eprezto-main to-eprezto-light h-screen">
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
