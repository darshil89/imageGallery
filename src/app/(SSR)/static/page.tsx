import { UnsplashImage } from "@/models/unplash-image";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Alert } from "../../../../components/bootstrap";

export const metadata: Metadata = {
  title: "Static Image Gallery",
  description: "Image generation and gallery with Next.js",
};

const page = async () => {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNPLASH_ACCESS_KEY
  );

  const image: UnsplashImage = await response.json();

  const width = Math.min(image.width, 500);
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert variant="primary">
        This page <strong>fetches and caches data at build time </strong> Even
        though the unplash api always return a new image , wee see the same
        image after refreshing the page until we compile the project again
      </Alert>
      <Image
        src={image.urls?.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded shadow-lg mw-100 h-100 "
      />
      <Link href={"/users/" + image.user.username}>
        by - {image.user.username}
      </Link>
    </div>
  );
};

export default page;
