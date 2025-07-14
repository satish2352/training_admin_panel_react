import React, { lazy, Suspense } from "react";
import CompletionFormSkeleton from "./CompletionFormSkeleton"; // Import the skeleton component

const CompletionFrom = lazy(() => import("./CompletionDetailsPage")); // Lazy load the form

const LazyCompletionFrom = () => {
  return (
    <Suspense fallback={<CompletionFormSkeleton />}>
      <CompletionFrom />
    </Suspense>
  );
};

export default LazyCompletionFrom;
