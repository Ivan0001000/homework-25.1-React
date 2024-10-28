import React, { useState, useEffect } from 'react';

const emojisData = {
  smile: 0,
  blush: 0,
  cool: 0,
  star: 0,
  love: 0
};

const emojiIcons = {
  smile: '😀',
  blush: '😊',
  cool: '😎',
  star: '🤩',
  love: '😍'
};

const EmojiVoting = () => {
  const [emojis, setEmojis] = useState(emojisData);
  const [winner, setWinner] = useState('-');
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    const savedVotes = JSON.parse(localStorage.getItem('votes'));
    if (savedVotes) {
      setEmojis(savedVotes);
    }
  }, []);

  const saveVotes = (updatedEmojis) => {
    localStorage.setItem('votes', JSON.stringify(updatedEmojis));
  };

  const handleVote = (id) => {
    const updatedEmojis = {
      ...emojis,
      [id]: emojis[id] + 1
    };
    setEmojis(updatedEmojis);
    saveVotes(updatedEmojis);
  };

  const showResults = () => {
    let maxVotes = 0;
    let winnerEmojiKey = '-';
    for (let [key, votes] of Object.entries(emojis)) {
      if (votes > maxVotes) {
        maxVotes = votes;
        winnerEmojiKey = key;
      }
    }
    
    const winnerEmoji = emojiIcons[winnerEmojiKey] || '-';
    setWinner(winnerEmoji);
    setVoteCount(maxVotes);
  };

  const clearResults = () => {
    setEmojis(emojisData);
    setWinner('-');
    setVoteCount(0);
    localStorage.removeItem('votes');
  };

  return (
    <div>
      <h1>Голосування за найкращий смайлик</h1>
      <div id="emojiContainer">
        {Object.keys(emojis).map((key) => (
          <span key={key} className="emoji" onClick={() => handleVote(key)}>
            {emojiIcons[key]} <span id={`count-${key}`}> {emojis[key]}</span>
          </span>
        ))}
      </div>
      <button onClick={showResults}>Показати результати</button>
      <button onClick={clearResults}>Очистити результати</button>
      
      <div id="results">
        <h2>Результати голосування:</h2>
        <p>Переможець: <span id="winner">{winner}</span></p>
        <p>Кількість голосів: <span id="voteCount">{voteCount}</span></p>
      </div>
    </div>
  );
};

export default EmojiVoting;
