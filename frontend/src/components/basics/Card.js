import React, { useState, useEffect, useRef } from "react";
import photo1 from "../../../src/images/photo1.jpg";
import axios from "axios";

const Card = () => {
  const [flag, setFlag] = useState(true);
  const [initalsUsers, setInitalUsers] = useState([]);
  const [editValue, setEditValue] = useState([]);
  const [users, setUsers] = useState([]);
  const inputNames = useRef([]);
  const inputMobiileNos = useRef([]);

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
    let index = users.findIndex((x) => x.userId === userId);
    if (index !== -1) {
      let temporaryarray = users.slice();
      temporaryarray[index][e.target.name] = e.target.value;
      setUsers(temporaryarray);
      setInitalUsers(temporaryarray);
    } else {
      console.log("no match");
    }
  };
  const updatingData = async (userId, e) => {
    let key = e.target.name;
    let value = e.target.value;
    //console.log(key);
    const data = {};
    console.log("herre");
    if (value === undefined || value === null) {
      value = "";
    }
    data[key] = value;

    await axios.put("/quote/api/v1/users/" + userId, data);
    fetchData();
  };

  const deleteCard = async (userId) => {
    await axios.delete("/quote/api/v1/users/" + userId);
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
          let { name, userId, mobileNo, img } = user;

          return (
            <div className="card-container" key={userId}>
              <div className="card ">
                <div className="card-body">
                  <span className="card-number card-circle subtle">
                    {index + 1}
                  </span>
                  <span className="card-author subtle"> Employee</span>
                  <input
                    id={userId}
                    className="input-box card-title"
                    value={name}
                    ref={(element) => {
                      inputNames.current[index] = element;
                    }}
                    name="name"
                    onChange={(e) => {
                      e.preventDefault();
                      name = e.target.value;
                      editCard(userId, e);
                    }}
                    onBlur={(e) => {
                      updatingData(userId, e);
                    }}
                  />
                  <i
                    className="far fa-edit add-btn"
                    onClick={() => {
                      console.log(userId);
                      inputNames.current[index].focus();
                    }}
                  ></i>

                  <div className="card-read">
                    <input
                      className="input-box"
                      value={mobileNo}
                      ref={(element) => {
                        inputMobiileNos.current[index] = element;
                      }}
                      name="mobileNo"
                      onChange={(e) => {
                        e.preventDefault();
                        mobileNo = e.target.value;
                        editCard(userId, e);
                      }}
                      onBlur={(e) => {
                        updatingData(userId, e);
                      }}
                    />

                    <i
                      className="far fa-edit add-btn"
                      onClick={() => {
                        inputMobiileNos.current[index].focus();
                      }}
                    ></i>
                  </div>
                </div>
                <img src={img} alt="images" className="card-media" />
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
          );
        })}
      </section>
    </>
  );
};

export default Card;
