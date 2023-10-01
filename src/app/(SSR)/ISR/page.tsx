import { UnsplashImage } from "@/models/unplash-image";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Alert } from "../../../../components/bootstrap";

export const metadata: Metadata = {
  title: "Incremental Static Regeneration Image Gallery",
  description: "Image generation and gallery with Next.js",
};

// export const revalidate = 0;

const page = async () => {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNPLASH_ACCESS_KEY,
    {
      //   cache: "no-cache",
      next: {
        revalidate: 10,
      },
    }
  );

  const image: UnsplashImage = await response.json();

  const width = Math.min(image.width, 500);
  const height = (width / image.width) * image.height;
  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page uses <strong>Incremental Static Regeneration</strong> A new
        image is generated every 10 seconds
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
