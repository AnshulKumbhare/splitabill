/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <>
      <NavBar />
      <Main />
    </>
  );
}

function NavBar() {
  return (
    <div className="navbar">
      <h2>💰Split a Bill💵</h2>
      <p>The hard thing to understand in this world is Money.</p>
    </div>
  );
}

function Main() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleIsFormOpen() {
    setIsFormOpen((isOpen) => !isOpen);
  }

  function handleAddNewFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }

  function handleSetSelectedFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    console.log(selectedFriend);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        selectedFriend.id === friend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="main-container">
      <SideBar>
        <FriendsList>
          <Heading>🫂My Friends🤝</Heading>
          {friends.map((friend) => (
            <Friend
              friend={friend}
              key={friend.id}
              handleSetSelectedFriend={handleSetSelectedFriend}
              selectedFriend={selectedFriend}
            />
          ))}
        </FriendsList>
        {isFormOpen && (
          <FormAddFriend
            handleAddNewFriend={handleAddNewFriend}
            handleIsFormOpen={handleIsFormOpen}
          />
        )}
        <Button onClick={handleIsFormOpen}>
          {isFormOpen ? "Close" : "New Friend"}
        </Button>
      </SideBar>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          handleSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function SideBar({ children }) {
  return <div className="sidebar-container">{children}</div>;
}

function Heading({ children }) {
  return <h2 className="heading">{children}</h2>;
}

function FriendsList({ children }) {
  return <div className="friends-list">{children}</div>;
}

function Friend({ friend, handleSetSelectedFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <div className="friend">
      <img src={friend.image} alt="" />
      <div className="info">
        <h3>{friend.name}</h3>

        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you Rs{friend.balance}
          </p>
        )}

        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} Rs{Math.abs(friend.balance)}
          </p>
        )}

        {friend.balance === 0 && (
          <p className="even">You and {friend.name} are even</p>
        )}
      </div>
      <Button onClick={() => handleSetSelectedFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="select-button">
      {children}
    </button>
  );
}

function FormAddFriend({ handleAddNewFriend, handleIsFormOpen }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image,
      balance: 0,
    };

    console.log(newFriend);

    handleAddNewFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
    handleIsFormOpen(false);
  }

  return (
    <form onSubmit={handleFormSubmit} className="form-add-friend">
      <Heading>🧑‍🦰Add Friend🫂</Heading>
      <table width="100%" cellSpacing="10px">
        <tr>
          <td>
            <label htmlFor="">Name</label>
          </td>
          <td>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Friend's name"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="">Image</label>
          </td>
          <td>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="image link"
            />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td colSpan="2" align="center">
            <Button>Add Friend</Button>
          </td>
        </tr>
      </table>
    </form>
  );
}

function FormSplitBill({ selectedFriend, handleSplitBill }) {
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const friendsExpense = bill ? bill - userExpense : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!bill || !userExpense) return;
    handleSplitBill(whoIsPaying === "user" ? userExpense : -friendsExpense);

    setBill("");
    setUserExpense("");
    setWhoIsPaying("user");
  }

  return (
    <form className="form-split-bill" onSubmit={handleFormSubmit}>
      <Heading>Split a Bill with {selectedFriend.name}</Heading>
      <table width="100%" cellSpacing="10px">
        <tbody>
          <tr>
            <td>
              <label htmlFor="">💵Bill:</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter bill Amount"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="">💸Your Expense:</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Your expense"
                value={userExpense}
                onChange={(e) =>
                  setUserExpense(
                    Number(e.target.value) > bill
                      ? userExpense
                      : Number(e.target.value)
                  )
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="">🧑‍🦰{selectedFriend.name}'s Expense</label>
            </td>
            <td>
              <input type="text" disabled value={friendsExpense} />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="">Who is paying the bill? </label>
            </td>
            <td>
              <select
                value={whoIsPaying}
                onChange={(e) => setWhoIsPaying(e.target.value)}
              >
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan="2" align="left">
              <Button>Split Bill</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
