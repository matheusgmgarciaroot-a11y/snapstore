import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_JERSEYS, getJerseyBySlug } from "@/data/jerseys";
import { ProductConfigurator } from "@/components/product/ProductConfigurator";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_JERSEYS.map((jersey) => ({ slug: jersey.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const jersey = getJerseyBySlug(slug);
  if (!jersey) {
    return { title: "Produto não encontrado" };
  }
  return {
    title: jersey.title,
    description: jersey.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const jersey = getJerseyBySlug(slug);

  if (!jersey) {
    notFound();
  }

  const related = ALL_JERSEYS.filter(
    (item) => item.divisionId === jersey.divisionId && item.id !== jersey.id
  ).slice(0, 4);

  return <ProductConfigurator jersey={jersey} related={related} />;
}
