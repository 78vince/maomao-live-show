import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const WORKS_DS = process.env.NOTION_WORKS_DS_ID!;
const PRODUCTS_DS = process.env.NOTION_PRODUCTS_DS_ID!;

export type Work = {
  id: string;
  title: string;
  slug: string;
  category: string;
  coverUrl: string;
  videoUrl: string | null;
  tags: string;
  description: string;
  featured: boolean;
  placeholderColor: string;
  publishedAt: string | null;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverUrl: string;
  shopeeUrl: string | null;
  pinkoiUrl: string | null;
  featured: boolean;
  active: boolean;
};

function getText(prop: any): string {
  return prop?.rich_text?.[0]?.plain_text ?? prop?.title?.[0]?.plain_text ?? "";
}

function getUrl(prop: any): string | null {
  return prop?.url ?? null;
}

function getSelect(prop: any): string {
  return prop?.select?.name ?? "";
}

function getCheckbox(prop: any): boolean {
  return prop?.checkbox ?? false;
}

function getDate(prop: any): string | null {
  return prop?.date?.start ?? null;
}

function pageToWork(page: any): Work {
  const p = page.properties;
  return {
    id: page.id,
    title: getText(p["作品名稱"]),
    slug: getText(p["Slug"]),
    category: getSelect(p["分類"]),
    coverUrl: getUrl(p["封面圖 URL"]) ?? "",
    videoUrl: getUrl(p["影片 URL"]),
    tags: getText(p["標籤"]),
    description: getText(p["簡介"]),
    featured: getCheckbox(p["精選首頁"]),
    placeholderColor: getText(p["佔位色"]) || "#F3EFE8",
    publishedAt: getDate(p["發布日期"]),
  };
}

function pageToProduct(page: any): Product {
  const p = page.properties;
  return {
    id: page.id,
    title: getText(p["商品名稱"]),
    slug: getText(p["Slug"]),
    description: getText(p["描述"]),
    coverUrl: getUrl(p["封面圖 URL"]) ?? "",
    shopeeUrl: getUrl(p["Shopee 連結"]),
    pinkoiUrl: getUrl(p["Pinkoi 連結"]),
    featured: getCheckbox(p["精選首頁"]),
    active: getCheckbox(p["上架中"]),
  };
}

export async function getWorks(): Promise<Work[]> {
  const response = await notion.dataSources.query({
    data_source_id: WORKS_DS,
    sorts: [{ property: "發布日期", direction: "descending" }],
  });
  return response.results.map(pageToWork);
}

export async function getFeaturedWorks(): Promise<Work[]> {
  const response = await notion.dataSources.query({
    data_source_id: WORKS_DS,
    filter: { property: "精選首頁", checkbox: { equals: true } },
    sorts: [{ property: "發布日期", direction: "descending" }],
  });
  return response.results.map(pageToWork);
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const response = await notion.dataSources.query({
    data_source_id: WORKS_DS,
    filter: { property: "Slug", rich_text: { equals: slug } },
  });
  if (!response.results.length) return null;
  return pageToWork(response.results[0]);
}

export async function getProducts(): Promise<Product[]> {
  const response = await notion.dataSources.query({
    data_source_id: PRODUCTS_DS,
    filter: { property: "上架中", checkbox: { equals: true } },
  });
  return response.results.map(pageToProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await notion.dataSources.query({
    data_source_id: PRODUCTS_DS,
    filter: {
      and: [
        { property: "上架中", checkbox: { equals: true } },
        { property: "精選首頁", checkbox: { equals: true } },
      ],
    },
  });
  return response.results.map(pageToProduct);
}
