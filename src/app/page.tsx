import { Alert } from "../../components/bootstrap";

export default function Home() {
  return (
    <div>
      <Alert>
        <p>
          This is a simple project to show the new features of{" "}
          <strong>Next.js 13.5</strong>.
        </p>
        <ul>
          <li>Static and Dynamic server-side rendering</li>
          <li>Incremental Static Regeneration</li>
          <li>Client side rendering</li>
          <li>Image Optimization</li>
          <li>MetaData</li>
        </ul>
        <p className="mb-0">
          Every page uses different rendering method. Check the source code to
          see how it works.
        </p>
      </Alert>
      <Alert variant="secondary">
        <p>
          Note: In order to load the data on this site , you need to get a{" "}
          <a href="https://unsplash.com">free API key from Unsplash</a>and add
          it to your <strong>.env.local </strong> file{" "}
        </p>

        <p className="mb-0">
          Unplash has a free quota of 50 request per hour , so you might getting
          error if you try too often
        </p>
      </Alert>
    </div>
  );
}
