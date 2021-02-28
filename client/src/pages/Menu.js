import React from 'react';
import CategoryTabs from './CategoryTabs';
import Cart from '../component/Cart';
import styled from 'styled-components';

function Menu() {
    return (
        <>
            <BodyStyles>
                <CategoryTabs/>
            </BodyStyles>
            <BottomCart>
                <Cart />
            </BottomCart>
        </>
    );
}

const BodyStyles = styled.div`
  position:absolute;
  top: 0;
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