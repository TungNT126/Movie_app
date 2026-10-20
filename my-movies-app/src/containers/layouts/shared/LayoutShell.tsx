import { Suspense } from "react";
import { Container } from "react-bootstrap";
import DefaultHeader from "../DefaultHeader";
import DefaultFooter from "../DefaultFooter";
import Loading from "./Loading";

type LayoutProps = {
  showHeader?: boolean;
  showFooter?: boolean;
  children: React.ReactNode;
};

function LayoutShell({
  showHeader = true,
  showFooter = true,
  children,
}: LayoutProps) {
  return (
    <>
      <div className="text-primary-txt min-h-screen">
        <main className="flex-1">
          {showHeader ? (
            <Suspense fallback={<Loading />}>
              <DefaultHeader />
            </Suspense>
          ) : null}
          <Container className="bg-bg-secondary py-16">{children}</Container>
        </main>
      </div>
      {showFooter ? (
        <Suspense fallback={<Loading />}>
          <DefaultFooter />
        </Suspense>
      ) : null}
    </>
  );
}

export default LayoutShell;
