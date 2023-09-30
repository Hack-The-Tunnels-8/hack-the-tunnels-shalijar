import { Page } from "../../components";
import "./NotFound.style.scss";
import notFoundGif from "./liverpool-fc.mp4";

function NotFound() {
  return (
    <Page>
      <div className="notFound-page">
        <h1>404: Not Found</h1>
        <video src={notFoundGif}/>
      </div>
    </Page>
  );
}

export default NotFound;
