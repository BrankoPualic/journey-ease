export type Post = {
  postId: number;
  postTitle: string;
  postContent: string;
  postImageUrl: string;
  postDate: Date;
  creatorName: string;
  postDescription: string;
};

export type BlogStatistics = {
  totalBlog: number;
  totalAuthors: number;
  topAuthor: string;
  totalComments: number;
};
