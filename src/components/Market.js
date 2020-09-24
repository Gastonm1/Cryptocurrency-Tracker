import React from "react";
import "./Market.css";

function Market({
  image,
  name,
  symbol,
  price,
  volume,
  priceChange,
  marketcap,
}) {
  return (
    <div className="market_container">
      <div className="market_row">
        <div className="market">
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
          <p className="market_symbol">{symbol}</p>
        </div>
        <div className="market_data">
          <p className="market_price">${price}</p>
          <p className="market_volume">{volume}</p>
        

        {priceChange < 0 ? (
          <p className="market_percent green">{priceChange.toFixed(2)}%</p>
        ) : (
          <p className="market_percent red">{priceChange.toFixed(2)}%</p>
        )}
        <p className="coin_marketcap">Mkt Cap: ${marketcap.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Market;
