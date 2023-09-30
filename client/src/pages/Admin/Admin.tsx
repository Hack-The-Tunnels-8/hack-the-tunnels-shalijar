import { Link } from "react-router-dom";
import { Page } from "../../components";
import { useAccountContext } from "../../context";
import "./Admin.style.scss";
import AdminChart from "./AdminChart"; // Import the AdminChart component

function Admin() {
  const { loggedIn } = useAccountContext();

  return (
    <Page>
      <div className="admin-page">
        <h1>Admin</h1>
        {loggedIn() === false ? (
          <div>Login to access admin</div>
        ) : (
          <div>
            <h2>Admin Actions:</h2>
            <Link to="/admin/create-product">Create Product</Link>
            <AdminChart /> {/* Use the AdminChart component here */}
          </div>
        )}
      </div>
    </Page>
  );
}

export default Admin;
