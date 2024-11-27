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

  // 添加名言数组
  const quotes = [
    {
      text: "水滴石穿，不是因为它力量大，而是因为它天天在坚持。",
      author: "老子"
    },
    {
      text: "不积跬步，无以至千里；不积小流，无以成江海。",
      author: "荀子"
    },
    {
      text: "坚持做对的事情，时间会给你最好的答案。",
      author: "佚名"
    },
    {
      text: "千里之行，始于足下。",
      author: "老子"
    },
    {
      text: "坚持的人，虽然普通，也能成就不普通。",
      author: "稻盛和夫"
    },
    {
      text: "一个人的习惯决定一个人的命运。",
      author: "佚名"
    },
    {
      text: "合抱之木，生于毫末；九层之台，起于累土。",
      author: "老子"
    },
    {
      text: "锲而不舍，金石可镂。",
      author: "《荀子》"
    },
    {
      text: "每天进步一点点，成功不会远。",
      author: "佚名"
    },
    {
      text: "习惯是人生最好的老师。",
      author: "培根"
    },
    {
      text: "听说喝水能变美，所以我准备了一个游泳池的量。",
      author: "养生达人"
    },
    {
      text: "喝水提醒：你的身体不是沙漠，需要适量灌溉。",
      author: "养生专家"
    },
    {
      text: "我的水杯说：主人，你都多久没看我了？",
      author: "水杯日记"
    },
    {
      text: "坚持喝水的第100天，我和水杯已经成为好朋友了。",
      author: "生活趣事"
    },
    {
      text: "以前喝水是为了解渴，现在喝水是为了健康。",
      author: "健康达人"
    },
    {
      text: "一天八杯水，健康每一天。",
      author: "健康小贴士"
    },
    {
      text: "水是生命之源，也是快乐之源。",
      author: "生活感悟"
    },
    {
      text: "喝水也是一门艺术，要慢慢品味。",
      author: "生活美学"
    },
    {
      text: "今天的小目标：和水杯培养感情。",
      author: "生活趣语"
    },
    {
      text: "每一杯水都是对健康的承诺。",
      author: "健康随笔"
    }
  ];

  // 随机选择一条名言
  const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  return (
    <div className="App">
      <div className="container">
        {/* 添加名言卡片 */}
        <div className="card quote-card">
          <p className="quote-text">{quote.text}</p>
          <p className="quote-author">——{quote.author}</p>
        </div>

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
