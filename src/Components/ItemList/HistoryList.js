import React from 'react'
import History from '../Item/History'

const HistoryList = ({ordenes}) => {
    return (
        <div>
            <h2 className='mt-5'>Mi historial de compras</h2>
            {ordenes.map(order =>
                <History key={order.id} orden={order} />
            )}
        </div>
    )
}

export default HistoryList