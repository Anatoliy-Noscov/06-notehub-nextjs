import type { CSSProperties } from "react";
import { BeatLoader } from "react-spinners";

const override: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  margin: "0 auto",
  borderColor: "red",
  color: "gray",
};

export default function Loader() {
  return (
    <>
      <BeatLoader
        cssOverride={override}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
}
