import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  Channel,
  MessageList,
  MessageInput,
  useChatContext,
  MessageType,
  Thread,
} from "stream-chat-react-native-core";

const ChannelScreen = () => {
  const [channel, setChannel] = useState(null);
  const route = useRoute();

  const { client } = useChatContext();
  const navigation = useNavigation();

  const { channelId } = route.params || {};

  useEffect(() => {
    const fetchChannel = async () => {
      setChannel(null);
      console.log("fetching channel", channelId);
      const channels = await client.queryChannels({ id: { $eq: channelId } });
      if (channels.length > 0) {
        console.log("updating channel state");
        setChannel(channels[0]);
      } else {
        console.log("No channels found");
      }
    };

    fetchChannel();
  }, [channelId]);

  if (!channel) {
    return <Text>Loading...</Text>;
  }

  return (
    <Channel channel={channel}>
      <MessageList
        onThreadSelect={(thread) =>
          navigation.navigate("Thread", {
            channelId: channelId,
            thread,
          })
        }
      />
      <MessageInput />
    </Channel>
  );
};

export default ChannelScreen;
