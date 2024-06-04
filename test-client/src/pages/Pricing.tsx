import withAuth from "@/components/WithAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { expressApi } from "@/lib/axios-conf";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const makePayment = async ({ price, quantity, desc }: any) => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    const body = {
      products: [
        {
          price: price,
          quantity: quantity,
          description: desc,
        },
      ],
    };
    const response = await expressApi.post("/payment/stripe", body);

    const session = response.data;
    console.log(session);

    const result = await stripe?.redirectToCheckout({
      sessionId: session.data.id,
    });

    if (result?.error) {
      console.log(result?.error);
    }
  };

  return (
    <div className="w-full m-5 py-4">
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="mb-5 text-[42px] font-bold text-dark dark:text-dark-6">
              $0
              <span className="text-base font-medium text-body-color dark:text-dark-6">
                / Month
              </span>
            </h2>
            <p className="text-base text-body-color dark:text-dark-6">1 User</p>
            <p className="text-base text-body-color dark:text-dark-6">
              All UI components
            </p>
            <p className="text-base text-body-color dark:text-dark-6">
              Lifetime access
            </p>
            <p className="text-base text-body-color dark:text-dark-6">
              Free updates
            </p>
            <p className="text-base text-body-color dark:text-dark-6">
              Use on 1 (one) project
            </p>
            <p className="text-base text-body-color dark:text-dark-6">
              3 Months support
            </p>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              onClick={() =>
                makePayment({ price: 0, quantity: 1, desc: "Free" })
              }
            >
              Subscribe
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Professional</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="mb-5 text-[42px] font-bold text-dark dark:text-dark-6">
              $199
              <span className="text-base font-medium text-body-color dark:text-dark-6">
                / Month
              </span>
            </h2>
            <p className="text-base text-body-color dark:text-dark-6">
              50 User
            </p>
            <p className="text-base text-body-color dark:text-dark-6">
              All UI components
            </p>
            <p className="text-base text-body-color dark:text-dark-6">
              Lifetime access
            </p>
            <p className="text-base text-body-color dark:text-dark-6">
              Free updates
            </p>
            <p className="text-base text-body-color dark:text-dark-6">
              Use on 10 (one) project
            </p>
            <p className="text-base text-body-color dark:text-dark-6">
              24 Months support
            </p>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              onClick={() =>
                makePayment({ price: 199, quantity: 1, desc: "pro" })
              }
            >
              Subscribe
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="mb-5 text-[42px] font-bold text-dark dark:text-dark-6">
              $399
              <span className="text-base font-medium text-body-color dark:text-dark-6">
                / Month
              </span>
            </h2>
            <p className="text-base text-body-color dark:text-dark-6">
              100 User
            </p>
            <p className="text-base text-body-color dark:text-dark-6">
              All UI components
            </p>
            <p className="text-base text-body-color dark:text-dark-6">
              Lifetime access
            </p>
            <p className="text-base text-body-color dark:text-dark-6">
              Free updates
            </p>
            <p className="text-base text-body-color dark:text-dark-6">
              Use on 100 (one) project
            </p>
            <p className="text-base text-body-color dark:text-dark-6">
              36 Months support
            </p>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              onClick={() =>
                makePayment({ price: 399, quantity: 1, desc: "ent" })
              }
            >
              Subscribe
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default withAuth(Pricing);
