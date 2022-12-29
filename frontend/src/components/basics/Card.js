import React, { useState, useEffect } from "react";
import photo1 from "../../../src/images/photo1.jpg";
import axios from "axios";

const Card = () => {
  const [flag, setFlag] = useState(true);
  const [initalsUsers, setInitalUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [editValue, setEditValue] = useState({ name: "", mobileNo: "" });

  async function fetchData() {
    try {
      const response = await axios.get("/quote/api/v1/users");
      setUsers(response.data);
      setInitalUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function filterBasedOnMobile() {
    if (flag) {
      console.log("InsideFilter");
      setUsers(
        users.filter((user) => {
          console.log(user.mobileNo);
          return user.mobileNo !== undefined;
        })
      );
      setFlag(false);
    } else {
      setUsers(initalsUsers);
      setFlag(true);
    }
  }

  const editCard = async (userId, e) => {
    // const response = await axios.put("/quote/api/v1/users/" + userId, {
    //   name: nameEdit,
    // });
    // console.log(response);
    // fetchData();
    const keyToBeEdit = e.target.keytobeedit;
    console.log(keyToBeEdit);
    const valueToBeEdit = e.target.value;
    console.log(valueToBeEdit);
    // setUsers(
    //   users.map((user) => {
    //     if (user.userId === userId) {
    //       //console.log(user);
    //       user.keyToBeEdit = valueToBeEdit;
    //     }
    //   })
    // );
  };

  const deleteCard = async (userId) => {
    const response = await axios.delete("/quote/api/v1/users/" + userId);
    const usersAfterDeletion = users.filter((user) => {
      return user.userId !== userId;
    });
    setUsers(usersAfterDeletion);
    setInitalUsers(usersAfterDeletion);
  };

  return (
    <>
      <div>
        <button className="button" onClick={filterBasedOnMobile}>
          Filter
        </button>
      </div>
      <section className="main-card--cointainer">
        {users.map((user, index) => {
          const { name, userId, mobileNo } = user;
          return (
            <>
              <div className="card-container" key={userId}>
                <div className="card ">
                  <div className="card-body">
                    <span className="card-number card-circle subtle">
                      {index + 1}
                    </span>
                    <span className="card-author subtle"> Employee</span>
                    <input
                      className="input-box card-title"
                      type={Text}
                      value={name}
                      keytobeedit="name"
                      onChange={(e) => {
                        e.preventDefault();
                        // setEditValue(e.target.value);
                        console.log(e.target.keytobeedit);
                        editCard(userId, e);
                      }}
                    />
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => {
                        //editName(userId);
                      }}
                    ></i>

                    <div className="card-read">
                      <input
                        className="input-box"
                        type={Text}
                        value={mobileNo}
                        keytobeedit="mobileNo"
                        onChange={(e) => {
                          // setmobileNo(e.target.value);
                          editCard(userId, e);
                        }}
                      />

                      <i
                        className="far fa-edit add-btn"
                        onClick={() => {
                          // editMob(userId);
                          editCard(userId);
                        }}
                      ></i>
                    </div>
                  </div>
                  <img src={photo1} alt="images" className="card-media" />
                  <div>
                    <button
                      className="card-tag  subtle"
                      onClick={() => {
                        deleteCard(userId);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default Card;
