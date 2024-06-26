// 3 test cases needed here
// 1) user's name is rendered in dom (can't use get by role bc name is rendered in div and divs don't have role by default 👎). so will have to use getByText method
// 2) pass admin user to component and assert edit btn is rendered
// 3) pass a non-admin user and assert the edit btn isn't in the dom (again, can't use getByRole bc will throw an error if element doesn't exist in dom). will have to use queryByRole method instead
import { User } from "../entities";

const UserAccount = ({ user }: { user: User }) => {
  return (
    <>
      <h2>User Profile</h2>
      {user.isAdmin && <button>Edit</button>}
      <div>
        <strong>Name:</strong> {user.name}
      </div>
    </>
  );
};

export default UserAccount;
