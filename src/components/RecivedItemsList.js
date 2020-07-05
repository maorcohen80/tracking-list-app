import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateRecivedItems } from '../actions';

const ReceivedItemsList = (props) => {


  useEffect(() => {
    let updatedItems = [...props.receivedItems];
    updatedItems.forEach(element => {
      if (!element.priceInILS) {
        element.priceInILS = (element.price * props.rate).toFixed(2);
      }
    });
    props.updateRecivedItems(updatedItems);
  }, [props.currencyIndex]);

  const renderItemsList = () => {
    return props.receivedItems.map(item => {
      return (
        <div className="item middle aligned" key={item.id}>
          <img className="ui avatar image" src={item.image} alt="product" />
          <div className="content">
            <div className="header">{item.title}</div>
            <div className="description">
              price: {props.currencyIndex === 0 ? `${item.price}$` : `${item.priceInILS}`}
              {props.currencyIndex === 0 ? null : <span>&#8362;</span>}
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
      <h1>Received Items</h1>
      <div className="ui middle aligned divided list">
        {props.receivedItems.length === 0 ?
          <h4>No items found...</h4> :
          renderItemsList()
        }
      </div>
      <div className="ui divided list"
        style={{ borderTopWidth: 1, borderTopColor: "#e5e5e5", borderTopStyle: "solid", paddingTop: 10 }}
      >
        <div className="item">
          <div className="ui purple horizontal large label">
            Total items: &nbsp; {props.receivedItems.length}
          </div>
        </div>
      </div>
    </div>
  )
};


const mapStateToProps = (state) => {
  return {
    receivedItems: state.receivedItems,
    currencyIndex: state.currencyIndex,
    rate: state.rate
  };
};

export default connect(mapStateToProps, { updateRecivedItems })(ReceivedItemsList);

