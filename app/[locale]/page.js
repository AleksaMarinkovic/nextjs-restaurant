import HighlightedFoods from "./highlightedFoods";
import Introduction from "./introduction";

export default function Home({ params }) {
  return (
    <div>
      <Introduction params={params}></Introduction>
      <HighlightedFoods params={params}></HighlightedFoods>
    </div>
  );
}
