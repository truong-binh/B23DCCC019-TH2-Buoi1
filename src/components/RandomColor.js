import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function RandomColor() {
    const { color, history, isAutoChanging } = useSelector(state => state.randomColor);
    const dispatch = useDispatch();

    const generateRandomColor = useCallback(() => {
        const newColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        dispatch({ type: 'SET_COLOR', payload: newColor });
    }, [dispatch]);

    const toggleAutoChange = () => {
        dispatch({ type: 'TOGGLE_AUTO_CHANGE' });
    };

    useEffect(() => {
        let interval;
        if (isAutoChanging) {
            interval = setInterval(generateRandomColor, 1000);
        }
        return () => clearInterval(interval);
    }, [isAutoChanging, generateRandomColor]);

    const clearHistory = () => {
        dispatch({ type: 'CLEAR_HISTORY' });
    };

    const removeCurrentColor = () => {
        dispatch({ type: 'REMOVE_CURRENT_COLOR' });
    };

    return (
        <div>
            <h2>Random color</h2>
            <div className="color-box" style={{backgroundColor: color}}></div>
            <p>Mã màu hiện tại: {color}</p>
            <button onClick={generateRandomColor}>Đổi màu ngay</button>
            <button onClick={toggleAutoChange}>
                {isAutoChanging ? 'Dừng đổi màu tự động' : 'Bắt đầu đổi màu tự động'}
            </button>
            <button onClick={removeCurrentColor}>Xóa màu hiện tại</button>
            <h3>Lịch sử màu</h3>
            <div className="color-history">
                {history.map((c, index) => (
                    <div key={index} className="history-item">
                        <div style={{backgroundColor: c, width: '20px', height: '20px'}}></div>
                        <span>{c}</span>
                    </div>
                ))}
            </div>
            <button onClick={clearHistory}>Xóa tất cả lịch sử</button>
        </div>
    );
}

export default RandomColor;
