import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

function Password() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hi");
    setLoading(true);
    // var user = firebase.auth().currentUser;
    const resp = await auth.currentUser.updatePassword(password);
    console.log(resp);
    resp
      .then(() => {
        setLoading(false);
        toast.success("Password updated successfully");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateFrom = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter your new password"
          disabled={loading}
          value={password}
        />
        <button
          className="btn btn-primary"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          {passwordUpdateFrom()}
        </div>
      </div>
    </div>
  );
}

export default Password;
