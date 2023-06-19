import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Navbar from "../NavBar/NavBar"
import { Box } from "@mui/material";

const CallPage = () => {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appID = 36793106;
    const serverSecret = "42d9712ed63d054114625f34dfc55404";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Enter NickName"
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken)
    zc.joinRoom({
        container: element,
        sharedLinks: [
            {
                name:"Copy Link",
                url: `http://localhost:5173/room/${roomId}`
            }
        ],
        scenario:{
            mode: ZegoUIKitPrebuilt.OneONoneCall
        },
        showScreenSharingButton:false
    })
  };
  return (
    <div>
      <Navbar/>
      <div style={{padding: "7rem"}} ref={myMeeting}/>
    </div>
  );
};

export default CallPage;
