import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [waterCount, setWaterCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [exp, setExp] = useState(0);
  
  useEffect(() => {
    const now = new Date();
    const today = now.toLocaleDateString();
    const savedDate = localStorage.getItem('lastWaterDate');
    
    if (savedDate !== today) {
      setWaterCount(0);
      localStorage.setItem('waterCount', '0');
      localStorage.setItem('lastWaterDate', today);
    } else {
      const savedCount = localStorage.getItem('waterCount');
      if (savedCount) setWaterCount(parseInt(savedCount));
    }
  }, []);

  const getExpNeeded = (currentLevel) => {
    return currentLevel * 100;
  };

  const addExp = (amount) => {
    const newExp = exp + amount;
    const expNeeded = getExpNeeded(level);
    
    if (newExp >= expNeeded) {
      setLevel(level + 1);
      setExp(newExp - expNeeded);
    } else {
      setExp(newExp);
    }
  };

  const addWater = () => {
    if (waterCount < 8) {
      const newCount = waterCount + 1;
      setWaterCount(newCount);
      localStorage.setItem('waterCount', newCount);
      
      if (newCount === 8) {
        addExp(50);
      }
    }
  };

  const resetWater = () => {
    setWaterCount(0);
    localStorage.setItem('waterCount', '0');
  };

  return (
    <div className="App">
      <div className="container">
        <div className="card user-stats">
          <div className="level-badge">
            <span className="level-number">{level}</span>
            <span className="level-text">级</span>
          </div>
          <div className="exp-info">
            <h3>当前等级进度</h3>
            <div className="exp-bar">
              <div 
                className="exp-progress" 
                style={{width: `${(exp / getExpNeeded(level)) * 100}%`}}
              ></div>
            </div>
            <p className="exp-text">{exp} / {getExpNeeded(level)} 经验</p>
          </div>
        </div>

        <div className="card water-tracker">
          <h2>今日喝水目标</h2>
          <div className="progress-circle">
            <span className="progress-text">{waterCount}/8</span>
            <span className="progress-label">杯水</span>
          </div>
          <div className="water-cups">
            {[...Array(8)].map((_, index) => (
              <div 
                key={index}
                className={`water-cup ${index < waterCount ? 'filled' : ''}`}
                onClick={addWater}
              >
                💧
              </div>
            ))}
          </div>
          <p className="motivation-text">
            {waterCount === 8 
              ? "太棒了！今天的目标已完成 🎉" 
              : `还差 ${8 - waterCount} 杯就完成今天的目标啦！`}
          </p>
          
          <button 
            className="reset-button" 
            onClick={resetWater}
          >
            重置今日进度
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
