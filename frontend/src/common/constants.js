export const HTTP_METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete"
};

export const mockUsers = [
  { id: 1, email: 'alice@example.com', name: 'Alice' },
  { id: 2, email: 'bob@example.com', name: 'Bob' },
  { id: 3, email: 'carol@example.com', name: 'Carol' },
];

export const mockCurrentUser = {
  id: 2,
  email: 'bob@example.com',
  name: 'Bob'
};

// Simulate "user 1 follows 2 and 3"
export const mockFollows = [
  { followerId: 1, followingId: 2 },
  { followerId: 1, followingId: 3 },
  { followerId: 2, followingId: 3 },
];

export const mockBlogs = [
  {
    id: 101,
    title: 'Bob’s Trip to Rome',
    content: 'Loved the Colosseum!',
    author: 'bob@example.com',
    authorId: 2,
    country: 'Italy',
  },
  {
    id: 102,
    title: 'Carol in Canada',
    content: 'Niagara Falls was amazing.',
    author: 'carol@example.com',
    authorId: 3,
    country: 'Canada',
  },
  {
    id: 103,
    title: 'Alice’s Amsterdam Adventure',
    content: 'Rode bikes by the canals.',
    author: 'alice@example.com',
    authorId: 1,
    country: 'Netherlands',
  },
];

// mockLikes.js
export const mockLikes = [
  { userId: 1, blogId: 101, type: 'like' },
  { userId: 2, blogId: 101, type: 'dislike' },
  { userId: 3, blogId: 101, type: 'like' },
  { userId: 1, blogId: 102, type: 'dislike' },
];
