import React, { useState } from "react";
import photo1 from "../../../src/images/photo1.jpg"


const Card = ({users}) => {
    const [flag,setFlag]=useState(true)
    const [filterUsers,setFilteruser]=useState(users)
    console.log(users)
    console.log(filterUsers)


    const deleteUser=(userId)=>{
        setFilteruser( filterUsers.filter((user)=>{
            return user.userId !== userId
        }))
    }
     

    const filterBasedOnMobile=()=>{
        if(flag){
            setFilteruser( filterUsers.filter((user)=>{
                return user.mobileNo !== ""
            }))
            setFlag(false)
        }else{
             setFilteruser(users);
             setFlag(true)
        }
    }
    //useEffect(()=>{filterBasedOnMobile()},[filterUsers])
  
  return (
    <>
     <div>
        <button className="button" onClick={filterBasedOnMobile}>Filter</button>
     </div>
      <section className="main-card--cointainer">
      <> {
       filterUsers.map((user,index)=>{ 
        const{name,userId,mobileNo}=user;return(
        <>
              <div className="card-container" key={userId}>
                <div className="card ">
                  <div className="card-body">
                    <span className="card-number card-circle subtle">{index+1}</span>
                    <span className="card-author subtle"> Employee</span>
                    <input className="input-box card-title" type={Text} value={name}/>
                    <div className="card-read"><input className="input-box" type={Text} value={mobileNo}/></div>
                  </div>
                  <img src={photo1} alt="images" className="card-media" />
                  <div>
                  <button className="card-tag  subtle">Edit </button>
                  <button className="card-tag  subtle" onClick={deleteUser(userId)}>Delete </button>
                  </div>
                </div>
              </div>
          </>)})}</>
      </section>
    </>
  );
};

export default Card;