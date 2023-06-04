/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../api/userApi/userApi";
import { setChatUsers } from "../../state/slice";
import UserImage from "../UserImage/UserImage";


const Conversation = ({ data, currentUserId, online }) => {

  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()
  const token = useSelector((state)=>state.token)
console.log(data,"::::");
  useEffect(()=> {

    const userId = data.members.find((id)=>id!==currentUserId)
    console.log(userId,"::::::><");
    const getUserData = async ()=> {
      try
      {
          const data =await getUser(userId,token)
          console.log(data,"><");
         setUserData(data)
         dispatch(setChatUsers(data))
      }
      catch(error)
      {
        console.log(error)
      }
    }

    getUserData();
  }, [])
  return (
    <>
      <div className="follower conversation" >
        <div>
          {online && <div className="online-dot"></div>}
          <div>

          <UserImage image={userData?.displayPicture} size='55px' />
          <span>{userData?.userName}</span>
            <span >{online?"Online":"Offline"}</span>
          </div>
          {/* <img
            src={userData?.displayPicture ? `http://localhost:5000/uploads/${userData.displayPicture}` : "/assets/150-1503945_transparent-user-png-default-user-image-png-png (1).png"}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          /> */}
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.userName}</span>
            <span >{online?"Online":"Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
