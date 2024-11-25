import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Button,
  Divider,
} from "@mui/joy";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack"; // Import hook từ Notistack
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import axios from "axios";

const CreateRoom = () => {
  const topicOptions = [
    "Học văn",
    "Học toán",
    "Học tiếng Anh",
    "Học lịch sử",
    "Học địa lý",
    "Học khoa học",
    "Học sinh học",
    "Học thể dục",
    "Học mỹ thuật",
    "Học công nghệ",
    "Học tin học",
  ];

  const [roomName, setRoomName] = useState("");
  const [topics, setTopics] = useState([]);
  const [limit, setLimit] = useState(0);
  const [intro, setIntro] = useState("");
  const serverUri =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_PRODUCTION
      : import.meta.env.VITE_API_DEVELOPMENT;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Hook Notistack

  const handleCreateRoom = async () => {
    if (!roomName || limit <= 0 || !intro) {
      enqueueSnackbar("Please fill all fields!", { variant: "warning" });
      return;
    }

    try {
      const response = await axios.post(
        `${serverUri}/api/room/create-room`,
        {
          name: roomName,
          topic: topics,
          limit,
          intro,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        enqueueSnackbar("Room created successfully!", { variant: "success" });
        navigate("/list-room");
      } else {
        enqueueSnackbar(response.message || "Failed to create room!", {
          variant: "warning",
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred while creating the room!", {
        variant: "error",
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card
        variant="outlined"
        sx={{
          maxHeight: "max-content",
          maxWidth: "100%",
          mx: "auto",
          overflow: "auto",
        }}
      >
        <Typography level="title-lg" startDecorator={<AccountCircleIcon />}>
          Create Room
        </Typography>
        <Divider />
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
            gap: 1.5,
          }}
        >
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Room Name</FormLabel>
            <Input
              style={{ height: "57px" }}
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              endDecorator={<BadgeIcon />}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Topic</FormLabel>
            <Autocomplete
              multiple
              value={topics}
              onChange={(event, newValue) => setTopics(newValue)}
              options={topicOptions}
              getOptionLabel={(option) => option}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => {
                  const { key, ...restProps } = getTagProps({ index }); // Tách key khỏi props
                  return <Chip key={key} label={option} {...restProps} />;
                })
              }
              renderInput={(params) => (
                <TextField {...params} placeholder="Select topics" />
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Limit</FormLabel>
            <Input
              style={{ height: "57px" }}
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              endDecorator={<InfoOutlined />}
            />
          </FormControl>

          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Introduction</FormLabel>
            <Input
              style={{ height: "57px" }}
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="Room introduction..."
            />
          </FormControl>

          <CardActions sx={{ gridColumn: "1/-1" }}>
            <Button variant="solid" color="primary" onClick={handleCreateRoom}>
              Create
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRoom;
