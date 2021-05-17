import React from 'react';
import styled from 'styled-components';
import CategoryTabs from './CategoryTabs';
import Cart from '../component/Cart';
import Header from './Header';

function Menu() {
  return (
    <>
      <HeaderStyles>
        <TopStyles>
          <Header />
        </TopStyles>
        <CategoryStyles>
          <CategoryTabs />
        </CategoryStyles>
      </HeaderStyles>
      <Cart />
    </>
  );
}
const HeaderStyles = styled.div`
  *:focus {
    outline:none;
  }
`;

const TopStyles = styled.div`
  position: relative;
  width: 100vw;
  height: 42px;
`;

const CategoryStyles = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
`;
export default Menu;
