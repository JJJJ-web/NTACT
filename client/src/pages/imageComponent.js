import React from 'react';
import {LazyImage} from 'react-lazy-images';
import {LoadingOutlined} from '@ant-design/icons';

function imageComponent(menu) {
    return(
        [menu].reduce((acc, cur, i) => {
            console.log(cur.id, 'item.menu.id', cur.menu.id);
            return (
                <div key={cur.id} >
                    {console.log(cur.img_url)}
                    <LazyImage src={cur.img_url} alt={cur.name_kor}
                        title={cur.name_kor}
                        width={'50%'}
                        placeholder={
                            ({imageProps, ref}) =>
                                <LoadingOutlined
                                    style={{color: 'orange', fontSize: '5rem'}}
                                    ref={ref} alt={imageProps.alt}/>
                        }
                        actual={
                            ({imageProps}) =>
                                <img {...imageProps} />
                        }
                    />
                </div>
            );
        })
    );
};

export default imageComponent;