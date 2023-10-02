"use client";

import { Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { UnsplashImage } from "../../../models/unplash-image";
import Image from "next/image";
import styles from "./search.module.css";
import Link from "next/link";
const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(
    null
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/search?query=${query}`);
        console.log("res = ", res);
        const data: UnsplashImage[] = await res.json();
        setSearchResults(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }
  console.log("Results = ", searchResults);
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label className="fw-bold fs-2">Search</Form.Label>
          <Form.Control
            name="query"
            type="text"
            placeholder="E.g. cats, hotdogs, ..."
          />
        </Form.Group>
        <Button type="submit" className="mb-3" disabled={loading}>
          Search
        </Button>
      </Form>
      <div className="row w-100">
        {loading && <Spinner animation="border" />}
        {error && (
          <p>
            <strong>Something went worng !!!</strong>
          </p>
        )}
        {searchResults?.length === 0 && (
          <p>
            <strong>No results found</strong>
          </p>
        )}
        {searchResults?.map((image) => {
          return (
            <div
              key={image.urls.raw}
                className="col-12 col-md-4 col-lg-4 d-flex flex-column align-items-center"
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

export default SearchPage;
