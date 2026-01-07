import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

function NotFound() {
  return (
    <section className="col-md-6">
      <Card>
        <CardBody className="text-center">
          <CardTitle className="font-weight-bold" style={{ fontSize: "4rem", color: "#f0f2f5" }}>
            404
          </CardTitle>
          <CardTitle className="font-weight-bold">
            Oops! Page Not Found
          </CardTitle>
          <CardText>
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </CardText>
          <div className="mt-4">
            <Link to="/">
              <Button color="primary" className="mr-2">
                Go Home
              </Button>
            </Link>
            <Link to="/snacks">
              <Button color="secondary" className="mr-2">
                Browse Snacks
              </Button>
            </Link>
            <Link to="/drinks">
              <Button color="secondary">
                Browse Drinks
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

export default NotFound;