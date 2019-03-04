import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="text-center pt-4">
      <h1 className="display-4">Page Not Found</h1>
      <p>Sorry, this page does not exist.</p>
      <Link to="/" className="btn btn-info btn-sm">
        Let's get you home
      </Link>
    </div>
  );
};
