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
      <BottomCart>
        <Cart />
      </BottomCart>
    </>
  );
}
const HeaderStyles = styled.div``;
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
  margin-bottom: 10rem; /* BottomCart 높이 */
  overflow-y: auto;
`;
const BottomCart = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 10rem; /* footer 높이 */
  border-top: 1px solid black;
`;
export default Menu;
