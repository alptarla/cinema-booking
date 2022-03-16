import { FadeLoader } from "react-spinners";

interface Props {
  color?: string;
}

function PageLoader({ color = "#333" }: Props) {
  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <FadeLoader color={color} />
    </div>
  );
}
export default PageLoader;
