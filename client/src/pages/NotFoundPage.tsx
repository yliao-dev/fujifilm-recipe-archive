import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <section>
      <FaExclamationTriangle className="text-yellow-400 fa-4x mb-4" />
      <h1>404 Not Found</h1>
      <p>This page does not exist</p>
      <Link to="/">Go Back</Link>
    </section>
  );
};

export default NotFoundPage;
