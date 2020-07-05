import React, { useState } from 'react';
import { connect } from 'react-redux';
import ItemsList from './ItemsList'
import ShopList from './ShopList';

const Home = () => {

  const [index, setIndex] = useState(0);

  const Header = () => {
    return (
      <div className="ui primary pointing menu two item">
        <div onClick={() => setIndex(0)} className={index === 0 ? "active item" : "item"}>
          Your Products
        </div>
        <div onClick={() => setIndex(1)} className={index === 1 ? "active item" : "item"}>
          Shop List
        </div>
      </div>
    )
  };
  return (
    <div className="ui container">
      <Header />
      {
        index === 0 ?
          <ItemsList /> :
          <ShopList />
      }
    </div>
  )
};


const mapStateToProps = (state) => {
  return {
    items: state.items
  };
}

export default connect(mapStateToProps)(Home);