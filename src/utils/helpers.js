export function formatDate(timestamp) {
    const d = new Date(timestamp);
    const time = d.toLocaleTimeString('en-US');
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
  }
  
  export function formatQuestion(question, users) {
    const { id, author, timestamp, optionOne, optionTwo } = question;
    const { name, avatarURL } = users[author];
  
    return {
      id,
      authorName: name,
      authorAvatar: avatarURL,
      timestamp: formatDate(timestamp),
      optionOneText: optionOne.text,
      optionOneVotes: optionOne.votes.length,
      optionTwoText: optionTwo.text,
      optionTwoVotes: optionTwo.votes.length,
    };
  }
  