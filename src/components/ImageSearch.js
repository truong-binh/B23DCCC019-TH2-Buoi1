import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function ImageSearch() {
    const { query, images } = useSelector(state => state.imageSearch);
    const dispatch = useDispatch();

    const searchImages = async () => {
        const API_KEY = '46177377-a020a2fd0232397999dea6e91';
        const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo`);
        dispatch({ type: 'SET_IMAGES', payload: response.data.hits.map(hit => hit.webformatURL) });
    };

    return (
        <div>
            <h2>Tìm kiếm hình ảnh</h2>
            <input 
                value={query} 
                onChange={(e) => dispatch({ type: 'SET_QUERY', payload: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && searchImages()}
                placeholder='Nhập từ khóa ảnh'
            />
            <button onClick={searchImages}>Tìm kiếm ảnh</button>
            <div>
                {images.map((img, index) => (
                    <img key={index} src={img} alt="search" style={{ width: '200px', margin: '10px' }} />
                ))}
            </div>
        </div>
    );
}

export default ImageSearch;
