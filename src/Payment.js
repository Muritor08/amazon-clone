import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from './StateProvider'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getCartTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';


function Payment() {

    const [{ cart,user },dispatch ]= useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing,setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {

        //generates the special client secret which allows to charge customer

        const getClientSecret = async () => {
            const response = await axios({
                method : 'post',
                // remember: stripe expects total in a currencies subunits
                url : `/payment/create?total=${getCartTotal(cart) * 100}`
            });

            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [cart])

    console.log('secret>> ', clientSecret)


    const handleSubmit = async (event) => {
        // stripe stuff 
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent = payment confirmation

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    cart : cart,
                    amount : paymentIntent.amount,
                    created : paymentIntent.created
                })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_CART'
            })

            history.replace('/orders')
        })
    }

    const handleChange = event => {
        //listen changes in card element and displays any error as the user types card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

  return (
    <div className='payment'>
        <div className='payment__container'>

            <h1>Checkout (
                <Link to='/checkout'>{cart?.length} items</Link>
                )
            </h1>

            {/* delivery address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>NMIMS Shirpur</p>
                    <p>Shirpur-425405,Maharashtra,India</p>
                </div>
            </div>

            {/* review items */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
                    {cart.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>

            {/* payment method */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    {/* stripe usage */}
                    
                    <form onSubmit={handleSubmit} >
                        <CardElement onChange={handleChange} />

                        <div className='payment__priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <>
                                    <h3>Order Total: {value}</h3>
                                    </>
                                )}
                                decimalScale={2}
                                value={getCartTotal(cart)}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'₹'}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>
                        {/* error */}
                        {error && <div>{error}</div>}
                    </form>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment