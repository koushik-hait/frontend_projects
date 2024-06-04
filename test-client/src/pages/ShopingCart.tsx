import withAuth from "@/components/WithAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
type Cart = {
  id: number;
  details: {
    title: string;
    description: string;
    image: string;
    category: string;
    rating: number;
    stock: number;
    brand: string;
    discountPercentage: number;
  };
  price: number;
  quantity: number;
  totalPrice: number;
};
const carts = [
  {
    id: 1,
    details: {
      title: "Product 1",
      description: "Product 1 description",
      image: "https://picsum.photos/200",
      category: "Category 1",
      rating: 4.5,
      stock: 100,
      brand: "Brand 1",
      discountPercentage: 10,
    },
    price: 10,
    quantity: 1,
    totalPrice: 10,
  },
  {
    id: 2,
    details: {
      title: "Product 2",
      description: "Product 2 description",
      image: "https://picsum.photos/200",
      category: "Category 2",
      rating: 4.5,
      stock: 100,
      brand: "Brand 2",
      discountPercentage: 10,
    },
    price: 20,
    quantity: 1,
    totalPrice: 20,
  },
  {
    id: 3,
    details: {
      title: "Product 3",
      description: "Product 3 description",
      image: "https://picsum.photos/200",
      category: "Category 3",
      rating: 4.5,
      stock: 100,
      brand: "Brand 3",
      discountPercentage: 10,
    },
    price: 30,
    quantity: 1,
    totalPrice: 30,
  },
];

const ShopingCart = () => {
  const [total, setTotal] = React.useState(0);
  const [discount, setDiscount] = React.useState(0);
  const [cart, setCart] = React.useState<Cart[]>(carts);
  useEffect(() => {
    const totalPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    setTotal(totalPrice);
  }, [cart]);
  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white dark:bg-gray-900 px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Total
              </h3>
            </div>
            {cart.map((crt, index) => (
              <Card key={index} className="mb-5">
                <CardContent>
                  <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                    <div className="flex w-2/5">
                      <div className="w-20">
                        <img className="h-24" src={crt.details.image} alt="" />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">
                          {crt.details.title}
                        </span>
                        <span className="text-red-500 text-xs">
                          {crt.details.brand}
                        </span>
                        <Button
                          type="button"
                          onClick={(e) => {
                            setCart(cart.filter((c) => c.id !== crt.id));
                          }}
                          className="p-0 w-[40px] font-semibold hover:text-red-500 text-gray-500 text-xs bg-transparent hover:bg-transparent"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <Button
                        type="button"
                        onClick={(e) => {
                          setCart((prevCart) =>
                            prevCart.map((item) =>
                              item.id === crt.id
                                ? {
                                    ...item,
                                    quantity: item.quantity + 1,
                                    totalPrice:
                                      item.price * (item.quantity + 1),
                                  }
                                : item
                            )
                          );
                        }}
                      >
                        +
                      </Button>

                      <Input
                        className="mx-2 border text-center w-8"
                        type="text"
                        value={crt.quantity}
                      />

                      <Button
                        type="button"
                        disabled={crt.quantity === 1} // disable button if quantity is 1
                        onClick={(e) => {
                          setCart((prevCart) =>
                            prevCart.map((item) =>
                              item.id === crt.id
                                ? {
                                    ...item,
                                    quantity: item.quantity - 1,
                                    totalPrice:
                                      item.price * (item.quantity - 1),
                                  }
                                : item
                            )
                          );
                        }}
                      >
                        -
                      </Button>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ${crt.price}
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ${crt.totalPrice}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Link
              to="/"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {cart.length}
              </span>
              <span className="font-semibold text-sm">${total}</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>
            <div className="py-10">
              <label className="font-semibold inline-block mb-3 text-sm uppercase">
                Promo Code
              </label>
              <Input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>
            <Button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </Button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${total + 10}</span>
              </div>
              <Button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(ShopingCart);
