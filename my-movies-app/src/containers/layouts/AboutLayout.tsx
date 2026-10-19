import LayoutShell from "./shared/LayoutShell";
import About from "../pages/About";
import { Suspense } from "react";
import Loading from "./shared/Loading";

function AboutLayout() {
  return (
    <LayoutShell>
      <Suspense fallback={<Loading />}>
        <About />
      </Suspense>
    </LayoutShell>
  );
}

export default AboutLayout;
