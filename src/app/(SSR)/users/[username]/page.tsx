import { UnsplashUser } from "@/models/unplash-user";
import styles from "./user.module.css";
import { notFound } from "next/navigation";
import { Metadata } from "next";
interface PageProps {
  params: {
    username: string;
  };
}

async function getUser(username: string): Promise<UnsplashUser> {
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNPLASH_ACCESS_KEY}`
  );

  if (response.status === 404) notFound();
  return await response.json();
}

export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title:
      ([user.first_name, user.last_name].filter(Boolean).join(" ") ||
        user.username) + " - Unsplash",
    description: user.bio,
  };
}

const page = async ({ params: { username } }: PageProps) => {
  const user = await getUser(username);
  //   console.log("user", user);

  return (
    <div>
      <h1>
        {user.first_name}&nbsp; {user.last_name}
      </h1>
      <p>username - {username}</p>
      <img
        src={user.profile_image.large}
        alt={user.first_name}
        className={styles.image}
      />
      <br />
      <a href={"https://unsplash.com/" + user.username} target="_blank">
        Unplash Profile
      </a>
    </div>
  );
};

export default page;
