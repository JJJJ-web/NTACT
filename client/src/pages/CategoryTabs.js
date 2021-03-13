import React, {useState} from 'react';
import {Tabs} from 'antd';
import {StickyContainer, Sticky} from 'react-sticky';
import axois from 'axios';
import MenuList from './MenuList';

function CategoryTabs() {
    const [categories, setCategories] = useState([]);
    const {TabPane} = Tabs;
    const renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={80}>
            {({style}) => (
                <DefaultTabBar {...props} className="site-custom-tab-bar" style={{...style, backgroundColor: 'white'}} />
            )}
        </Sticky>
    );

    useState(() => {
        axois.get('/api/categories').then((res) => setCategories(res.data));
    }, []);

    return(
        <StickyContainer>
            <Tabs defaultActiveKey="100" size="large" centered='true' renderTabBar={renderTabBar}>
                {
                    categories.map((item)=> {
                        return(
                            <TabPane tab={item.name_kor} key={item.id}>
                                <MenuList categoryId={item.id}/>
                            </TabPane>
                        );
                    })
                }
            </Tabs>
        </StickyContainer>
    );
}

export default CategoryTabs;