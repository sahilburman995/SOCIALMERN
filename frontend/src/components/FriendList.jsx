import React, { useState } from 'react';

function FriendListPage({ users }) {
  // State to store friends
  const [friends, setFriends] = useState([]);

  // Function to add a user as a friend
  const addFriend = (user) => {
    // Add the user to the friends list
    setFriends([...friends, user]);
    // Optionally, you can make a POST request to your backend to save the friend list
  };

  return (
    <div className="friend-list-page">
      <h2>My Friends</h2>
      <div className="friend-cards">
        {friends.map(friend => (
          <div key={friend._id} className="friend-card">
            <p>{friend.username}</p>
            {/* You can display more friend details here */}
          </div>
        ))}
      </div>
      <h2>Available Users</h2>
      <div className="user-cards">
        {users.map(user => (
          <div key={user._id} className="user-card">
            <p>{user.username}</p>
            {/* Add Friend button */}
            <button onClick={() => addFriend(user)}>Add Friend</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FriendListPage;
