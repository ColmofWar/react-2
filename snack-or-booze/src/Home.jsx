/**
 * Home component that displays a welcome message and shows the count of available snacks and drinks.
 * Serves as the landing page for the Snack or Booze application.
 */
import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

function Home({ snacks, drinks }) {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
          </CardTitle>
          <p>We have {snacks.length} snacks and {drinks.length} drinks available.</p>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
