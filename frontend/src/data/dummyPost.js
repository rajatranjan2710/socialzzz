export const postArray = [
  {
    id: "post12345",
    user: {
      id: "user98765",
      username: "john_doe",
      profile_picture:
        "https://dhws-production.s3.ap-south-1.amazonaws.com/6707d772be734f0018445920/6707d853f56f6100232b5be2/6707d853f56f6100232b5beb/appSource/images/img_image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPQLIXIJ64%2F20241010%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241010T193450Z&X-Amz-Expires=25200&X-Amz-Signature=7afee674acc1b24e0ff850ad16e93f106eae9028758509e49903de981e94fabc&X-Amz-SignedHeaders=host",
      full_name: "John Doe",
      is_verified: false,
    },
    content: {
      text: "Loving this sunny day at the beach! 🌞🏖️ #BeachVibes #SunnyDay",
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1728382332631-94736587daeb?q=80&w=1765&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt_text: "A beautiful sunny beach",
        },
      ],
      hashtags: ["BeachVibes", "SunnyDay"],
      mentions: [
        {
          id: "user54321",
          username: "jane_doe",
        },
      ],
    },
    engagement: {
      likes: 234,
      comments: 17,
      shares: 12,
      is_liked_by_user: true,
    },
    comments: [
      {
        id: "comment001",
        user: {
          id: "user12345",
          username: "cris_bale",
          profile_picture:
            "https://tse4.mm.bing.net/th/id/OIP.a7w302YwHzUAtCt2AyoCJQHaKq?w=121&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        },
        text: "Looks amazing! 😍",
        likes: 5,
        timestamp: "2024-10-10T14:35:22Z",
      },
    ],
    timestamp: "2024-10-10T13:45:00Z",
  },
  {
    id: "post67890",
    user: {
      id: "user23456",
      username: "emily_jones",
      profile_picture:
        "https://dhws-production.s3.ap-south-1.amazonaws.com/6707d772be734f0018445920/6707d853f56f6100232b5be2/6707d853f56f6100232b5beb/appSource/images/img_avatar_28x28.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPQLIXIJ64%2F20241010%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241010T193450Z&X-Amz-Expires=25200&X-Amz-Signature=70b806cbe24c39d57b34aa663fcd6a3ebfb7a43e3809a12ba5064a3e72bec219&X-Amz-SignedHeaders=host",
      full_name: "Emily Jones",
      is_verified: true,
    },
    content: {
      text: "New blog post is up! Check out my thoughts on the latest tech trends! 💻🔗 #TechTalk #Blog",
      media: [],
      hashtags: ["TechTalk", "Blog"],
      mentions: [],
    },
    engagement: {
      likes: 132,
      comments: 29,
      shares: 8,
      is_liked_by_user: false,
    },
    comments: [
      {
        id: "comment003",
        user: {
          id: "user76543",
          username: "chris_evans",
          profile_picture:
            "https://dhws-production.s3.ap-south-1.amazonaws.com/6707d772be734f0018445920/6707d853f56f6100232b5be2/6707d853f56f6100232b5beb/appSource/images/img_image_1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPQLIXIJ64%2F20241010%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241010T193450Z&X-Amz-Expires=25200&X-Amz-Signature=b3f4325763d32e83accb563d06ea96f4119574860e9208c7f96251aab8cc57d3&X-Amz-SignedHeaders=host",
        },
        text: "Loved the post! Very insightful! 💡",
        likes: 3,
        timestamp: "2024-10-09T18:22:01Z",
      },
    ],
    timestamp: "2024-10-09T17:10:00Z",
  },
  {
    id: "post54321",
    user: {
      id: "user45678",
      username: "mark_smith",
      profile_picture:
        "https://dhws-production.s3.ap-south-1.amazonaws.com/6707d772be734f0018445920/6707d853f56f6100232b5be2/6707d853f56f6100232b5beb/appSource/images/img_image_48x48.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPQLIXIJ64%2F20241010%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241010T193450Z&X-Amz-Expires=25200&X-Amz-Signature=2584c0062ae25a45530fbb5facf491e3e0964831244c8595a1e7a8c11dee5376&X-Amz-SignedHeaders=host",
      full_name: "Mark Smith",
      is_verified: false,
    },
    content: {
      text: "Check out this amazing sunset video! 🌅🎥 #SunsetLover",
      media: [
        {
          type: "video",
          url: "https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt_text: "A beautiful sunset video",
        },
      ],
      hashtags: ["SunsetLover"],
      mentions: [],
    },
    engagement: {
      likes: 457,
      comments: 62,
      shares: 24,
      is_liked_by_user: true,
    },
    comments: [
      {
        id: "comment004",
        user: {
          id: "user87654",
          username: "vk_virat18",
          profile_picture:
            "https://tse3.mm.bing.net/th/id/OIP.GHaALhEQHNhMKbxx1xTw0AHaEH?w=323&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        },
        text: "This is stunning! 😍",
        likes: 12,
        timestamp: "2024-10-08T19:45:10Z",
      },
      {
        id: "comment005",
        user: {
          id: "user65432",
          username: "daniel_brown",
          profile_picture:
            "https://dhws-production.s3.ap-south-1.amazonaws.com/6707d772be734f0018445920/6707d853f56f6100232b5be2/6707d853f56f6100232b5beb/appSource/images/img_image_1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPQLIXIJ64%2F20241010%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241010T193450Z&X-Amz-Expires=25200&X-Amz-Signature=b3f4325763d32e83accb563d06ea96f4119574860e9208c7f96251aab8cc57d3&X-Amz-SignedHeaders=host",
        },
        text: "One of the best sunset views I've ever seen!",
        likes: 8,
        timestamp: "2024-10-08T20:15:43Z",
      },
    ],
    timestamp: "2024-10-08T18:40:00Z",
  },
  {
    id: "post98765",
    user: {
      id: "user34567",
      username: "jessica_parker",
      profile_picture:
        "https://dhws-production.s3.ap-south-1.amazonaws.com/6707d772be734f0018445920/6707d853f56f6100232b5be2/6707d853f56f6100232b5beb/appSource/images/img_image_1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPQLIXIJ64%2F20241010%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241010T193450Z&X-Amz-Expires=25200&X-Amz-Signature=b3f4325763d32e83accb563d06ea96f4119574860e9208c7f96251aab8cc57d3&X-Amz-SignedHeaders=host",

      full_name: "Jessica Parker",
      is_verified: true,
    },
    content: {
      text: "Throwback to my adventure in the mountains last year! 🏔️ #Wanderlust #Adventure",
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1719937206145-549d59c51285?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt_text: "A scenic mountain view",
        },
      ],
      hashtags: ["Wanderlust", "Adventure"],
      mentions: [],
    },
    engagement: {
      likes: 324,
      comments: 47,
      shares: 15,
      is_liked_by_user: false,
    },
    comments: [
      {
        id: "comment006",
        user: {
          id: "user12321",
          username: "SabrinaCarpenter",
          profile_picture:
            "https://tse3.mm.bing.net/th/id/OIP.CoJQ8UJYhnps1AxI4n3FrAHaE7?w=202&h=135&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        },
        text: "Such breathtaking views! 😍",
        likes: 9,
        timestamp: "2024-10-07T16:05:11Z",
      },
    ],
    timestamp: "2024-10-07T15:55:00Z",
  },
];
