import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Friend from "../../components/Friend/Friend";
import WidgetWrapper from "../../components/Widget/WidgetWrapper";


// eslint-disable-next-line react/prop-types
const FriendListWidget = ({  }) => {
  const {  displayPhoto } = useSelector((state) => state.user);

  const { palette } = useTheme();
  
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        
          <Friend
            key="1"
            friendId="2"
            name="ajeesh"
            subtitle="developer"
            userPicturePath={displayPhoto}
          />
       
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
