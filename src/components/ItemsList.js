import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addRecivedItem, addItems, setCurrency, setRate } from '../actions';
import { SHOP_LIST } from '../utils';
import Loader from './Loader';

const ItemsList = (props) => {

  const [loading, setLoading] = useState(null);
  const [exchangeRate, setRate] = useState(props.rate);
  const [currentRateDisplay, setCurrentRateDisplay] = useState(props.currencyIndex);
  const [loadingError, setLoadingError] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));

    if (props.items.length === 0) {
      fetchProducts();
    }

    const interval = setInterval(() => {
      fetchCurrencyExcahngeRate();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    }
  }, []);


  useEffect(() => {
    setCurrentRateDisplay(props.currencyIndex);
    setPrice();
  }, [props.currencyIndex]);

  const fetchCurrencyExcahngeRate = async () => {
    try {
      let http = await fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=ILS');
      let rate = await http.json();
      setRate(rate.rates.ILS);
      props.setRate(rate.rates.ILS);
      setLoading(false);
    } catch (error) {
      console.log("error fetchCurrencyExcahngeRate:", error);
      setLoading(false);
      setLoadingError(true);
    }
  }

  const fetchProducts = async () => {

    function randomDate(start, end) {
      let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [day, month, year].join('-');
    }

    function randomShop() {
      let num = Math.floor(Math.random() * 4);
      return num;
    }

    try {
      setLoading(true);
      let http = await fetch('https://fakestoreapi.com/products');
      if (http.status === 200) {
        const products = await http.json();
        products.forEach(element => {
          element.deliveryDate = randomDate(new Date(2020, 9, 1), new Date());
          element.title = element.title.substring(0, 50);
          element.store = SHOP_LIST[randomShop()]
        });
        //sort products by date
        products.sort((date1, date2) => {
          let day1 = date1.deliveryDate.slice(0, 2)
          let day2 = date2.deliveryDate.slice(0, 2)
          let month1 = date1.deliveryDate.slice(3, 5)
          let month2 = date2.deliveryDate.slice(3, 5)

          if (day1 > day2 && month1 === month2) {
            return 1;
          }
          if (day1 < day2 && month1 === month2) {
            return -1;
          }
          if (month1 > month2) {
            return 1
          }
          if (month1 < month2) {
            return -1
          }
          return 0;
        });

        props.addItems(products);
      }
    } catch (error) {
      console.log("error fetching products:", error);
      setLoading(false);
      setLoadingError(true);
    }

  };

  const setPrice = () => {
    if (props.currencyIndex === 1) {
      let updatedItems = props.items.map((item) => {
        if (!item.priceInILS) {
          let updatedPrice = (item.price * exchangeRate).toFixed(2);
          item.priceInILS = parseInt(updatedPrice);
        }
        return item;
      });
      props.addItems(updatedItems);
    }
  }

  const renderItemsList = () => {
    return props.items.map((item, index) => {
      return (
        <div className="item middle aligned" key={item.id}>
          <div className="right floated content">
            <button
              className="ui button inverted purple small"
              onClick={() => props.addRecivedItem(item)}
              style={{ marginTop: 15 }}
            >
              Received</button>
          </div>
          <img className="ui avatar image" src={item.image} alt="product" />
          <div className="content">
            <div className="header">{item.title}</div>
            <div className="description">
              price: {currentRateDisplay === 0 ? `${item.price}$` : `${item.priceInILS}`}
              {currentRateDisplay === 1 && <span>&#8362;</span>}
            </div>
            <div className="description">
              delivery estimated: {item.deliveryDate}
            </div>
            <div className="description">
              store: {item.store}
            </div>
          </div>
        </div>
      )
    });
  };

  return (
    <div className="ui container" style={{ marginBottom: 30 }}>
      {
        loadingError &&
        <div className="ui mini modal active" style={{ left: width < 768 ? 20 : (width / 2) - 150 }}>
          <div className="ui red header">Network Failed</div>
          <div className="content">
            <div>Opps! somthing went wrong</div>
            <div>Try reloading the page...</div>
          </div>
          <div className="actions">
            <div onClick={() => setLoadingError(false)} className="ui approve purple button">Ok</div>
          </div>
        </div>
      }
      <h1>Items</h1>
      <span className="ui purple label big right pointing">Currency</span>
      <select className="ui selection dropdown"
        value={currentRateDisplay}
        onChange={(e) => {
          props.setCurrency(parseInt(e.target.value))
        }}
      >
        <option value={0}>USD</option>
        <option value={1}>ILS</option>
      </select>

      <div className="ui middle aligned divided list animated">
        {loading ?
          <Loader /> :
          renderItemsList()
        }
      </div>
      <div className="ui divided selection list"
        style={{ borderTopWidth: 1, borderTopColor: "#e5e5e5", borderTopStyle: "solid", paddingTop: 10 }}
      >
        <div className="item">
          <div className="ui purple horizontal large label">
            Total items: &nbsp; {props.items.length}
          </div>
        </div>
      </div>
    </div>
  )
};

const actionsCreators = {
  addRecivedItem,
  addItems,
  setCurrency,
  setRate
}


const mapStateToProps = (state) => {
  return {
    items: state.items,
    currencyIndex: state.currencyIndex,
    rate: state.rate
  };
};

export default connect(mapStateToProps, actionsCreators)(ItemsList);