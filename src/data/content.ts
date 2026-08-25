// ============================================================
//  BIRTHDAY CONTENT CONFIG
//  Edit this file to personalize the website for Bhavya.
//  Replace photo URLs, video sources, dates, and messages.
// ============================================================

export interface Photo {
  src: string;
  caption: string;
  date: string;
}

export interface VideoItem {
  // Replace `src` with your video file path (e.g. "/videos/our-day.mp4")
  // Place video files in the public/videos/ folder.
  src: string;
  poster: string;
  title: string;
  caption: string;
}

export interface TimelineItem {
  // Replace `image` with your own photo URL or path.
  image: string;
  date: string;
  title: string;
  description: string;
}

// ---- PHOTOS ----
// Replace these placeholder images with your own photos of you and Bhavya.
// Just swap the `src` value with your image URL or local path.
export const PHOTOS: Photo[] = [
  {
    src: "/IMG_7743.jpg",
    caption: '',
    date: '',
  },
  {
    src: '/IMG_7763.jpg',
    caption: '',
    date: '',
  },
  {
    src: '/IMG_8039.jpg',
    caption: '',
    date: '',
  },
  {
    src: '/IMG_7680.jpg',
    caption: '',
    date: '',
  },
  {
    src: '/IMG_7833.jpg',
    caption: '',
    date: '',
  },
  {
    src: '/IMG_7750.jpg',
    caption: '',
    date: '',
  },
];

// ---- VIDEOS ----
// To add your own videos:
//  1. Place your video files in the `public/videos/` folder
//  2. Replace the `src` below with "/videos/your-video.mp4"
//  3. Replace the `poster` with a thumbnail image path
export const VIDEOS: VideoItem[] = [
  {
    src: '/IMG_0549.MOV',
    poster:
      '/IMG_8592.JPG.jpeg',
    title: 'Our happiest moments',
    caption: 'Memories I will always cherish with you, Bhavya',
  },
  // {
  //   src: '',
  //   poster:
  //     'https://images.pexels.com/photos/6429526/pexels-photo-6429526.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  //   title: 'Forever and always',
  //   caption: 'Every second with you is a treasure, Bhavya',
  // },
];

// ---- LOVE QUOTES ----
export const LOVE_QUOTES: { text: string; emoji: string }[] = [
  {
    text: 'In all the world, there is no heart for me like yours, Bhavya.',
    emoji: '❤️',
  },
  {
    text: 'Every moment with you becomes a memory I never want to forget.',
    emoji: '✨',
  },
  {
    text: 'You are not just my love, you are my favorite part of every day.',
    emoji: '❤️',
  },
  {
    text: "I didn't know what true happiness felt like until you came into my life.",
    emoji: '💖',
  },
];

// ---- TIMELINE ----
// Replace these with your own special memories and dates.
export const TIMELINE: TimelineItem[] = [
  {
    image:
      'IMG_0538.JPG.jpeg',
    date: 'First photo',
    title: 'Our first photo❤️',
    description: 'This was my first birthday with you',
  },
  {
    image:
      '/IMG_0427.JPG.jpeg',
    date: 'My Birthday',
    title: 'This is when we matched our outfits on my birthday 💕',
    description: '',
  },
  {
    image:
      '/IMG_0539.JPG.jpeg',
    date: 'Delhi',
    title: 'When we went to Delhi together for the first time. ❤️',
    description: '',
  },
  {
    image:
      '/IMG_0520.JPG.jpeg',
    date: 'Nainital',
    title: 'I really love this photo of you that you took in Nainital. ❤️',
    description: '',
  },
];

// ---- SURPRISE MESSAGES ----
export const GIFT_BOX_MESSAGE =
  'The greatest gift in my life is having you in it, Bhavya. ❤️';

export const LOVE_LETTER = `My Dearest Bhavya,

From the moment you walked into my life, everything became more beautiful. You are the sunshine of my mornings, the stars of my nights, and the heartbeat of my every day.

Today, the world celebrates the day it was blessed with you. But I celebrate you every single day — your smile, your laughter, your kindness, and the way you make my world so much brighter.

Happy Birthday, my love. Here's to a lifetime of memories, laughter, and love.

Forever yours,
Your Sisudii ❤️`;

export const SECRET_HEART_MESSAGE =
  'pta hai mai humesha  tumhara hi rahunga kyuki mai tumhare aage kabhi kuch dekhta hi nhi, meri aankhein sirf tum tak hai aur humesha  tum pe hi rahegi ❤️';

export const BIRTHDAY_WISH_MESSAGE =
  'Happy Birthday, my beautiful Bhavya! May every wish of yours come true, and may this year be filled with as much joy as you bring to my life. ❤️🎂';

// ---- FINAL MESSAGE ----
export const FINAL_TITLE =
  'Happy Birthday to the Most Beautiful Person in My Life, Bhavya ❤️';

export const FINAL_MESSAGE =
  'hello bhavya ye chhota sa gift tumhare liye i hope  tumhe acha lgega, vaise sach btau toh tum ho toh sab acha lgta hai , tum ek din na milo toh lgta hai jaise ptani kitna time ho gya mile hue, mai kabhi vo life imagine krna hi nhi chahta jismei tum mere sath nhi ho, kyunki tum ho toh mai sab kuch hu aur tum nhi toh mai kuch bhi nhi. i want to marry you ,having future and  kids with you . bas itna bolna chahunga ki humesha sath rehna kyuki tumhare baad meri life mei koi nhi hoga mai khud khud ke pass nhi hounga. i love you so much bhavya, itna ki ye 3 words toh bht kam pd jayenge mere pyaar btane ke liye tumhare liye  ❤️';

export const FINAL_CLOSING = 'I Love You Bhavya ❤️ Forever and Always.';

// ---- MUSIC ----
// To add your own background music:
//  1. Place your audio file in the `public/music/` folder
//  2. Replace the src below with "/music/your-song.mp3"
export const MUSIC_SRC = '/Pani Da Rang Male Vicky Donor 320 Kbps.mp3';
export const MUSIC_TITLE = 'Our Song';
export const MUSIC_ARTIST = 'For Bhavya ❤️';
