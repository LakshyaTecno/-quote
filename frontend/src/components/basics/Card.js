import React, { useState, useEffect } from "react";
import photo1 from "../../../src/images/photo1.jpg";
import axios from "axios";

const Card = () => {
  const [flag, setFlag] = useState(true);
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilteruser] = useState([]);

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

  // console.log("users",users)
  // console.log("filterUsers",filterUsers)

  function filterBasedOnMobile() {
    console.log("hello");
    console.log(flag);
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
  useEffect(() => {
    filterBasedOnMobile();
  }, [filterUsers]); // eslint-disable-line react-hooks/exhaustive-deps

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
                      />
                      <div className="card-read">
                        <input
                          className="input-box"
                          type={Text}
                          value={mobileNo}
                        />
                      </div>
                    </div>
                    <img src={photo1} alt="images" className="card-media" />
                    <div>
                      <button className="card-tag  subtle">Edit </button>
                      <button
                        className="card-tag  subtle"
                        onClick={() => {
                          // deleteUser(userId);
                        }}
                      >
                        Delete{" "}
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
