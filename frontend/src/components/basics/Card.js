import React, { useState, useEffect } from "react";
import photo1 from "../../../src/images/photo1.jpg";
import axios from "axios";

const Card = () => {
  const [flag, setFlag] = useState(true);
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilteruser] = useState([]);
  const [nameEdit, setNameEdit] = useState("");
  const [mobileNo, setmobileNo] = useState("");

  async function fetchData() {
    try {
      const response = await axios.get("/quote/api/v1/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function filterBasedOnMobile() {
    setFilteruser(users);
    if (flag) {
      setFilteruser(
        filterUsers.filter((user) => {
          return user.mobileNo !== "";
        })
      );
      setFlag(false);
    } else {
      setFilteruser(users);
      setFlag(true);
    }
  }

  const editName = async (userId) => {
    const response = await axios.put("/quote/api/v1/users/" + userId, {
      name: nameEdit,
    });
    console.log(response);
    fetchData();
  };

  const editMob = async (userId) => {
    const response = await axios.put("/quote/api/v1/users/" + userId, {
      mobileNo: mobileNo,
    });
    console.log(response);
    fetchData();
  };

  const deleteCard = async (userId) => {
    const response = await axios.delete("/quote/api/v1/users/" + userId);
    console.log(response);
    fetchData();
  };

  // useEffect(() => {
  //   filterBasedOnMobile();
  // }, [filterUsers]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div>
        <button className="button" onClick={filterBasedOnMobile}>
          Filter
        </button>
      </div>
      <section className="main-card--cointainer">
        <>
          {" "}
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
                        onChange={(e) => {
                          setNameEdit(e.target.value);
                        }}
                      />
                      <i
                        className="far fa-edit add-btn"
                        onClick={() => {
                          editName(userId);
                        }}
                      ></i>

                      <div className="card-read">
                        <input
                          className="input-box"
                          type={Text}
                          value={mobileNo}
                          onChange={(e) => {
                            setmobileNo(e.target.value);
                          }}
                        />

                        <i
                          className="far fa-edit add-btn"
                          onClick={() => {
                            editMob(userId);
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
        </>
      </section>
    </>
  );
};

export default Card;
