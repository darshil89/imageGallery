import { UnsplashImage } from "@/models/unplash-image";
import Image from "next/image";
import Link from "next/link";
import styles from "./topic.module.css";
import { Alert } from "../../../../../components/bootstrap";
import { Metadata } from "next";
interface PageProps {
  params: {
    topic: string;
  };
  // searchParams: {
  //   [key: string]: string | string[] | undefined;
  // };
}
//this below code helps us to generate the dynamic paths
// export const revalidate = 0;
//this below helps us to get only the generated paths since it is flase it will not generate the dynamic paths
// export const dynamicParams = false

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: "images of " + topic,
    description: `Images related to ${topic}`,
  };
}

export async function generateStaticParams() {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
}

const page = async ({ params: { topic } }: PageProps) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=9&client_id=${process.env.UNPLASH_ACCESS_KEY}`
  );

  const images: UnsplashImage[] = await response.json();
  return (
    <div>
      <h1 className={styles.heading}>{topic}</h1>
      <Alert>
        This pages uses <strong>generateStaticParams</strong>to render and cache
        static page at build time , even though the url have dynamic parameter .
        Pages that are not included in the generateStaticParams will be fetched
        & rendered on the first access and then{" "}
        <strong>cached for subsequent requests</strong>
      </Alert>
      <div className="row w-100">
        {images.map((image) => {
          return (
            <div
              key={image.urls.raw}
              className="d-flex flex-column mx-3 col-md-3"
            >
              <Image
                src={image.urls?.raw}
                width={250}
                height={250}
                alt={image.description}
                className={styles.image}
              />
              <Link href={"/users/" + image.user.username}>
                by - {image.user.username}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
