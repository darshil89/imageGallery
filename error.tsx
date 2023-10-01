"use client";

import React from "react";
import { Button } from "react-bootstrap";
interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorPageProps) => {
  return (
    <>
      <h2>Something went </h2>
      <p>Something went wrong</p>
      <Button onClick={reset}>Try again</Button>
    </>
  );
};

export default Error;
