export const dummyConversations = [
  {
    conversationId: "conv001",
    participants: ["user001", "user002"], // IDs of Jack Sparrow and Paul Walker
    messages: [
      {
        senderId: "user001",
        text: "Hey Paul! How’s everything going?",
        timestamp: "2024-10-12T10:00:00Z",
      },
      {
        senderId: "user002",
        text: "Hey Jack! Everything's great, just finished a blog post. How about you?",
        timestamp: "2024-10-12T10:02:00Z",
      },
      {
        senderId: "user001",
        text: "Nice! I’ve been working on a new project, can’t wait to share it with you!",
        timestamp: "2024-10-12T10:05:00Z",
      },
      {
        senderId: "user002",
        text: "Sounds awesome! Let me know if you need any feedback.",
        timestamp: "2024-10-12T10:07:00Z",
      },
    ],
  },
  {
    conversationId: "conv002",
    participants: ["user003", "user005"], // IDs of Cris Bale and Kakashi Hatake
    messages: [
      {
        senderId: "user003",
        text: "Hey Kakashi, hit the gym today?",
        timestamp: "2024-10-11T08:30:00Z",
      },
      {
        senderId: "user005",
        text: "Of course! Leg day. How about you?",
        timestamp: "2024-10-11T08:32:00Z",
      },
      {
        senderId: "user003",
        text: "Yep, just finished my cardio session. Feeling pumped!",
        timestamp: "2024-10-11T08:34:00Z",
      },
      {
        senderId: "user005",
        text: "Let’s hit the weights tomorrow then!",
        timestamp: "2024-10-11T08:35:00Z",
      },
    ],
  },
];
