import { useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return <div>Error Page</div>;
}

export default ErrorPage;
