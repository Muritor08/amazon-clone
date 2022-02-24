import React from 'react'
import './Home.css';
import Product from './Product';

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img className='home__image' src="https://m.media-amazon.com/images/I/71YRVbUfCNL._SX3740_.jpg" alt='' />
        </div>

        <div className='home__row'>
            <Product
                id='7894561' 
                title='The Lean Startup: How Constant Innovation Creates Radically Successful Businesses' 
                price={449} 
                image='https://m.media-amazon.com/images/I/81RCff1NpnL._AC_UY218_.jpg'
                rating={4} />
            <Product 
                id='7894565'
                title='Noise Buds VS201 V2 Truly Wireless Earbuds with Dual Equalizer | Total 14-Hour Playtime | Full Touch Control | IPX5 Water Resistance and Bluetooth v5.1 (Charcoal Black)' 
                price={1499} 
                image='https://m.media-amazon.com/images/I/31qrsfYb7+L.jpg'
                rating={4} />
        </div>

        <div className='home__row'>
            <Product 
                id='7894567'
                title='Apple iPhone 12 (128GB) - Blue' 
                price= {59999}
                image='https://images-eu.ssl-images-amazon.com/images/I/41xssMLI2DL._SY445_SX342_QL70_FMwebp_.jpg'
                rating={4} />
            <Product 
                id='7894560'
                title='Sunon Gaming Chair Adjustable Seat Height High Back PVC Leather Modern Ergonomic Chair with Massager Lumbar Support Retractable Footrest(Medium Size, Black and Golden)' 
                price={10319}
                image='https://m.media-amazon.com/images/I/41nN++fTIiL.jpg'
                rating={4} />
            <Product 
                id='7894516'
                title='Seiko Analog Maroon Dial Men Watch-SPC243P1' 
                price={28550}
                image='https://m.media-amazon.com/images/I/71PU-hC0++L._UY606_.jpg'
                rating={5} />
        </div>
        <div className='home__row'>
            <Product 
                id='7894586'
                title='HP Pavilion Gaming 10th Gen Intel Core i5 15.6-inch (39.6 cms) FHD Gaming Laptop (8GB/256GB SSD + 1TB HDD/144Hz/GTX 1650Ti 4GB Graphics/Windows 10/MS Office/2.28 kg), 15-dk1514TX, Black' 
                price={66990} 
                image='https://images-eu.ssl-images-amazon.com/images/I/41OdlwlaEeS._SX300_SY300_QL70_FMwebp_.jpg'
                rating={3} />
        </div>
    </div>
  )
}

export default Home