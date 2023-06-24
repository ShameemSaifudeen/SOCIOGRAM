import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Navbar from "../NavBar/NavBar";
import { Box } from "@mui/material";
import configKeys from "../../config";
function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}
const CallPage = () => {
  const { roomId } = useParams();
  const userID = randomID(5);
  const userName = randomID(5);
  const myMeeting = async (element) => {
    const appID = parseInt(configKeys.appID);
    const serverSecret = configKeys.serverSecret;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      userID,
      userName
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken.toString());
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `https://sociograam.online/room/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
    });
  };
  return (
    <div>
      <Navbar />
      <div style={{ padding: "7rem" }} ref={myMeeting} />
    </div>
  );
};

export default CallPage;
