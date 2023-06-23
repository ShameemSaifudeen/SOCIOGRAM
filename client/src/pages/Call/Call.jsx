import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Navbar from "../NavBar/NavBar";
import { Box } from "@mui/material";
import { useRef, useEffect } from "react";

// import configKeys from "../../config";

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
  const myMeetingRef = useRef(null);

  useEffect(() => {
    const startMeeting = async (element) => {
      const appID = 36793106;
      const serverSecret = "42d9712ed63d054114625f34dfc55404";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        randomID(5),
        randomID(5)
        // "Enter NickName"
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
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

    startMeeting(myMeetingRef.current);
  }, [roomId]);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "7rem" }} ref={myMeetingRef} />
    </div>
  );
};

export default CallPage;
