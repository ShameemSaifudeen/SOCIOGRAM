import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Navbar from "../NavBar/NavBar"
import { Box } from "@mui/material";
import configKeys from "../../config";

const CallPage = () => {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appID = parseInt(configKeys.appID);
    const serverSecret = configKeys.serverSecret;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Enter NickName"
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken.toString())
    zc.joinRoom({
        container: element,
        sharedLinks: [
            {
                name:"Copy Link",
                url: `https://sociograam.online/room/${roomId}`
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
