export type Post = {
  postId: number;
  postTitle: string;
  postContent: string;
  postImageUrl: string;
  postDate: Date;
  creatorName: string;
  postDescription: string;
};

export type BlogResponse = {
  totalPages: number;
  blog: Post[];
};
