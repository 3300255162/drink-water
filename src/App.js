import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [waterCount, setWaterCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [exp, setExp] = useState(0);
  
  useEffect(() => {
    const savedLevel = localStorage.getItem('level');
    const savedExp = localStorage.getItem('exp');
    if (savedLevel) setLevel(parseInt(savedLevel));
    if (savedExp) setExp(parseInt(savedExp));

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
      const newLevel = level + 1;
      setLevel(newLevel);
      setExp(newExp - expNeeded);
      localStorage.setItem('level', newLevel.toString());
      localStorage.setItem('exp', (newExp - expNeeded).toString());
    } else {
      setExp(newExp);
      localStorage.setItem('exp', newExp.toString());
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

  const resetAll = () => {
    const isConfirmed = window.confirm('确定要重置所有数据吗？这将会清除你的等级和经验值！');
    
    if (isConfirmed) {
      setWaterCount(0);
      setLevel(1);
      setExp(0);
      
      localStorage.setItem('waterCount', '0');
      localStorage.setItem('level', '1');
      localStorage.setItem('exp', '0');
      
      alert('所有数据已重置成功！');
    }
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
          
          <div className="button-group">
            <button 
              className="reset-all-button" 
              onClick={resetAll}
            >
              重置所有数据
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
