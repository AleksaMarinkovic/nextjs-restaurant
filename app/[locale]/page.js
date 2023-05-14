import Introduction from "./introduction";

export default function Home({ params }) {
  return (
    <div>
      <Introduction params={params}></Introduction>
    </div>
  );
}
