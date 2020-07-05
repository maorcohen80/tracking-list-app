import React from 'react';
import { connect } from 'react-redux';
import { SHOP_LIST } from '../utils';

const ShopList = (props) => {

  const getTotalFromShop = (shopIndex) => {
    const agregator = [0, 0, 0, 0];
    props.items.forEach(item => {
      if (item.store === SHOP_LIST[shopIndex]) {
        agregator[shopIndex] += 1;
      }
    });
    props.receivedItems.forEach(item => {
      if (item.store === SHOP_LIST[shopIndex]) {
        agregator[shopIndex] += 1;
      }
    });

    return agregator[shopIndex];
  }

  return (
    <div className="ui container">
      <h1>shops</h1>
      <div className="ui row">
        <div className="ui middle aligned divided list">
          {SHOP_LIST.map((shop, index) => {
            return (
              <div key={index} className="item middle aligned" style={{ height: 70, paddingTop: 10, paddingLeft: 15 }}>
                <h3 className="header">{shop}</h3>
                <h4 className="descrption floated right" style={{ marginTop: 5, color: "purple" }}>
                  Total Items ordered: {getTotalFromShop(index)}
                </h4>
              </div>
            )
          })};
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    receivedItems: state.receivedItems
  }
}

export default connect(mapStateToProps)(ShopList);
