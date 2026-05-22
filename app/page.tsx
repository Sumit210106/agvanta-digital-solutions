import { SiteLayout } from "@/components/site/SiteLayout";
// import { Hero } from "@/components/site/Hero";
import { PartnersMarquee } from "@/components/site/PartnersMarquee";
// import { WhyAgvanta } from "@/components/site/WhyAgvanta";
import { Solutions } from "@/components/site/Solutions";
import { AboutBlock } from "@/components/site/AboutBlock";
import { Process } from "@/components/site/HowItWorks";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
// import { Blog } from "@/components/site/Blog";
import { CtaBanner } from "@/components/site/CtaBanner";
import Merged from "@/components/site/Merged" ;
import { getCategoryTree, getPosts } from "@/lib/wp-api";

// export const metadata = {
//   title: "Agvanta — Empowering Agriculture with Smart Solutions",
//   description:
//     "Premium seeds, crop nutrition, protection, biologicals and digital advisory. Agvanta helps modern farmers grow more, sustainably.",
//   openGraph: {
//     title: "Agvanta — Empowering Agriculture with Smart Solutions",
//     description:
//       "One trusted agritech partner across seeds, nutrition, protection, biologicals & digital advisory.",
//   },
// };

export default async function HomePage() {
  const [categories, postsData] = await Promise.all([
    getCategoryTree(),
    getPosts({ page: 1, perPage: 3 }),
  ]);

  return (
    <SiteLayout>
      {/* <Hero /> */}
      <Merged />
      <AboutBlock />
      {/* <WhyAgvanta /> */}
      <Solutions categories={categories} />
      <Process />
      <PartnersMarquee />
      <Testimonials />
      <Faq />
      {/* <Blog initialPosts={postsData.posts} totalPages={postsData.totalPages} /> */}
      <CtaBanner />
    </SiteLayout>
  );
}