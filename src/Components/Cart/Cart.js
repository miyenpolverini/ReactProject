import React from 'react'
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cartContext from '../../Context/cartContext'
import './Cart.scss'
import { dataBase } from '../../Services/firebase/firebase'
import { collection, addDoc, writeBatch, getDoc, doc } from 'firebase/firestore'
import Loader from '../../Loader';

const Cart = () => {

    const { carrito, calculatePrecioTotal, emptyCart, removeProducto, parseNumber } = useContext(cartContext)

    const [processing, setProcessing] = useState(false)

    let navigate = useNavigate()

    const CartEmpty = () => {
        return (
            <div>
                <h2 className='tituloCartVacio'>¡El carrito de compras está vacío!</h2>
                <img className='avisoCart' src={'./img/cartEmpty.png'}></img>
                <div>
                    <Link to={'/'}>
                        <button className='btnStartBuy'>Empezar a comprar</button>
                    </Link>
                </div>
            </div>
        )
    }

    const CartFull = () => {
        return (
            <div>
                <table className="table table-light table-hover table-carrito">
                    <thead>
                        <tr>
                            <th className='table-dark table-tit-prod' scope="col">Producto</th>
                            <th className='table-dark table-tit-cant' scope="col">Cantidad</th>
                            <th className='table-dark table-tit-prec' scope="col">Precio</th>
                            <th className='table-dark table-tit-stot' scope="col">Subtotal</th>
                            <th className='table-dark table-tit-tach' scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {carrito.map(product => {
                            return (
                                <tr>
                                    <td className='prod-name'>{product.name}</td>
                                    <td>{product.cantidad}</td>
                                    <td className='prod-name'>$ {parseNumber(product.price)}</td>
                                    <td className='prod-name'>$ {parseNumber(`${product.cantidad * product.price}`)}</td>
                                    <td><img className='tachito' src='./img/tachito.svg'
                                        onClick={() => removeProducto(product.id)}></img></td>

                                </tr>
                            )
                        })}
                        <tr>
                            <td colspan="2"></td>
                            <td className='totalPrecio'>TOTAL</td>
                            <td className='totalPrecio'>$ {calculatePrecioTotal()}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <button className='botonTerminar' onClick={() => setUpOrder()}>Comprar ahora</button>
                <button className='botonVaciar' onClick={() => emptyCart()}>Vaciar carrito</button>

            </div>
        )
    }

    const setUpOrder = () => {

        setProcessing(true)

        setTimeout(() => {
            navigate('/formBuy')
            setProcessing(false)
        }, 3000)

    }

    return (
        <div>
            {processing ? <Loader tipo='preparando' /> :
                carrito.length > 0 ? <CartFull /> : <CartEmpty />}
        </div>
    )
}

export default Cart