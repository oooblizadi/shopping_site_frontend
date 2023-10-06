'use client'
import DeleteIcon from '@mui/icons-material/Delete';
import {EmptyCart} from "./EmptyCart";
import {useEffect, useState} from "react";
import Link from "next/link";

export function Cart() {
    let [state, setState] = useState({})
    let [count, setCount] = useState<any[] | undefined>()
    const [fade, setFade] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('ShoppingCard') || '{}' === null) {

            let count = JSON.parse(localStorage.getItem('ShoppingCard') || '{}')
            const nonDuplicatedData: any = [];
            count.map((x: any) => {
                if (!nonDuplicatedData[x.id]) {
                    nonDuplicatedData[x.id] = x;
                }
            });
            const filteredData = nonDuplicatedData.filter((n: any) => {
                return n != undefined
            });
            state = filteredData
            setState({...state})
        } else {
            window.localStorage.setItem('ShoppingCard', "[]")
        }
    }, []);
    const values = Object.values(state).map((key: any, value: number) => key)

    function ClearAll() {
        localStorage.setItem('ShoppingCard', "[]")
        window.location.reload();
    }

    function ClearSelected(id: number) {
        let items = Object.values(state);
        items = items.filter((item: any) => item.id !== id);
        localStorage.setItem("ShoppingCard", JSON.stringify(items));
        setState(items)
        if (items.length === 0) {
            localStorage.removeItem("ShoppingCard");
        }
    }

    function CounterPlus(LocalCounter: any, id: number, indexItem: number) {
        let localData: any = localStorage.getItem('ShoppingCard');
        let newList = JSON.parse(localData)
        let index = newList.findIndex((item: any) => item.id === id)
        let LocalItems = newList[indexItem].count++;
        localStorage.setItem("ShoppingCard", JSON.stringify(newList));
        count = newList;
        setCount(newList);
    }

    function CounterSubtract(LocalCounter: any, id: number, indexItem: number) {
        let localData: any = localStorage.getItem('ShoppingCard');
        let newList = JSON.parse(localData)
        let index = newList.findIndex((item: any) => item.id === id)
        if (newList[indexItem].count > 1) {
            let LocalItems = newList[indexItem].count--;
        } else {
            let LocalItems = newList[indexItem].count;
        }
        localStorage.setItem("ShoppingCard", JSON.stringify(newList));
        count = newList;
        setCount(newList);
    }
    function GetPrice(index: number){
        let localData: any = localStorage.getItem('ShoppingCard');
        let newList = JSON.parse(localData)
        return newList[index].price
    }
    function TotalProducts(index: number) {
        let localData: any = localStorage.getItem('ShoppingCard');
        let newList = JSON.parse(localData)
        return newList[index].count * newList[index].price
    }

    let Taxes: number = Number(1.99);

    function AllTotal() {
        let localData: any = localStorage.getItem('ShoppingCard');
        let newList = JSON.parse(localData)
        const nonDuplicatedData: any = [];
        if (newList){
            newList.map((x: any) => {
                if (!nonDuplicatedData[x.id]) {
                    nonDuplicatedData[x.id] = x;
                }
            });
        }
        const filteredData = nonDuplicatedData.filter((n: any) => {
            return n != undefined
        });
        if (filteredData == null && undefined){
            const sum = filteredData.map((datum: any, index: number) => filteredData[index]["count"] * filteredData[index]["price"]).reduce((a: any, b: any) => a + b)
            return sum.toFixed(2)
        }
    }
    const triggerFade = () => {
        setFade(!fade)
    }
    return (
        <>

            {(() => {
                // @ts-ignore
                if (state[0] === undefined) {
                    return (
                        <EmptyCart/>
                    )
                } else {
                    return (
                        <div className="bg-gray-100 h-screen py-8">
                            <div className="container mx-auto px-4">
                                <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="md:w-3/4">
                                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                            <table className="w-full">
                                                <thead>
                                                <tr>
                                                    <th className="text-left font-semibold">Products</th>
                                                    <th className="text-center font-semibold">Price</th>
                                                    <th className="text-center font-semibold">Quantity</th>
                                                    <th className="text-center font-semibold">Total</th>
                                                    <th className="text-center font-semibold">Delete</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {values.map((Items: any, index: number) => {
                                                    return (
                                                        <tr key={Items.id} data-id={index}  className={fade ? '' : 'visibleClass'}>
                                                            <td className="py-4">
                                                                <div className="flex items-center">
                                                                    <img className="h-16 w-16 mr-4" src={Items.image}
                                                                         alt="Product image"/>
                                                                    <span
                                                                        className="font-semibold overflow-hidden text-ellipsis w-24  sm:w-full ">{(() => {
                                                                        if (Items.title.length > 32) {
                                                                            return (
                                                                                Items.title.substring(0, 32) + "..."
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                Items.title
                                                                            )
                                                                        }
                                                                    })()}</span>
                                                                </div>
                                                            </td>

                                                            <td className="py-4 text-center">{(() => {
                                                                return (
                                                                    GetPrice(index)
                                                                )
                                                            })()}</td>
                                                            <td className="py-4">
                                                                <div className="flex items-center justify-center">
                                                                    <button onClick={() => {
                                                                        CounterSubtract(Items.count, Items.id, index)
                                                                    }}
                                                                            className="border rounded-md py-2 px-4 mr-2">-
                                                                    </button>
                                                                    <span className="text-center w-8">{(() => {
                                                                        let Counter: any;
                                                                        let localData: any = localStorage.getItem('ShoppingCard');
                                                                        let newList = JSON.parse(localData)
                                                                        let LocalItems = newList[index].count;
                                                                        if (count !== undefined) {
                                                                            Counter = count[index].count
                                                                        } else {
                                                                            Counter = LocalItems;
                                                                        }
                                                                        return (
                                                                            Counter
                                                                        )
                                                                    })()}</span>
                                                                    <button
                                                                        onClick={() => {
                                                                            CounterPlus(Items.count, Items.id, index)
                                                                        }}
                                                                        className="border rounded-md py-2 px-4 ml-2">+
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td className="py-4 text-center">{(() => {
                                                                let GetTotalProducts = TotalProducts(index)
                                                                return (
                                                                    GetTotalProducts.toFixed(2)
                                                                )
                                                            })()}
                                                            </td>
                                                            <td className="py-4 text-center">
                                                                <DeleteIcon
                                                                    style={{width: "40px", height: "40px"}}
                                                                    className="text-red-800 hover:text-black"
                                                                    onClick={() => {
                                                                        triggerFade()
                                                                        ClearSelected(Items.id)
                                                                    }}
                                                                />
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="md:w-1/4">
                                        <div className="bg-white rounded-lg shadow-md p-6">
                                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                            <div className="flex justify-between mb-2">
                                                <span>Subtotal</span>
                                                <span>
                                                    {(() => {
                                                        let GetAllTotal = AllTotal()
                                                        return (
                                                            GetAllTotal
                                                        )
                                                    })()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span>Taxes</span>
                                                <span>${Taxes}</span>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span>Shipping</span>
                                                <span>Free</span>
                                            </div>
                                            <hr className="my-2"/>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-semibold">Total</span>
                                                <span className="font-semibold">
                                                    {(() => {
                                                        let GetAllTotal:any =Number(AllTotal()) + Taxes
                                                        return (
                                                            GetAllTotal.toFixed(2)
                                                        )
                                                    })()}
                                                </span>
                                            </div>
                                            <Link href="checkout">
                                             <button
                                                  className="bg-blue-500 text-white py-3 px-4 rounded-lg mt-4 w-full">Checkout
                                            </button>
                                            </Link>

                                            <button
                                                onClick={ClearAll}
                                                className="bg-red-800 text-white py-2 px-4 rounded-lg mt-4 w-full">Delete
                                                All
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })()}
            <style jsx>{`
              .visibleClass {
                animation: OpenCart 1s ease-out forwards;
              }
              @keyframes OpenCart {
                0% {opacity: 0.4}
                100% {opacity: 1}
              }`}</style>
        </>
    )
}