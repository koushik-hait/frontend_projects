export type Video = {
  _id: string;
  title: string;
  description: string;
  thumbnail: {
    original: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
    standard: {
      url: string;
      width: number;
      height: number;
    };
    maxres: {
      url: string;
      width: number;
      height: number;
    };
  };
  video: {
    url: string;
    localPath: string;
    playbackUrl: string;
    folder: string;
    size: number;
    width: number;
    height: number;
    duration: number;
    format: string;
    bit_rate: number;
    frame_rate: number;
    pixel_format: string;
    codec: string;
    level: number;
    time_base: string;
    resource_type: string;
  };
  tags: string[];
  status: string;
  contentDetail: {
    caption: string;
    contentRating: string;
    definition: string;
    dimension: string;
    duration: string;
    licensedContent: boolean;
    projection: string;
  };
  statistic: {
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
  };
  createdAt: string;
  updatedAt: string;
};

export type VideoInput = Omit<Video, "_id" | "createdAt" | "updatedAt">;

export type Blog = {
  _id: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  createdAt: string;
  publishedAt: string;
  publishStatus: string;
  tags: string[];
};
