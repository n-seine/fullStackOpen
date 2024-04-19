const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return "no blogs";
  }
  const topBlogPost = blogs.sort((a, b) => b.likes - a.likes)[0];
  console.log("topBlogpost", topBlogPost);
  return {
    author: topBlogPost.author,
    title: topBlogPost.title,
    likes: topBlogPost.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return "no blogs";
  }

  let totalObject = {};
  blogs.forEach((blog) => {
    totalObject[blog.author] = (totalObject[blog.author] || 0) + 1;
  });
  const maxWritten = Math.max(...Object.values(totalObject));
  const topAuthor = Object.keys(totalObject).find(
    (key) => totalObject[key] === maxWritten
  );
  return {
    author: topAuthor,
    blogs: maxWritten,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return "no blogs";
  }
  let totalObject = {};
  blogs.forEach((blog) => {
    totalObject[blog.author] = (totalObject[blog.author] || 0) + blog.likes;
  });
  const maxLikes = Math.max(...Object.values(totalObject));
  const topAuthor = Object.keys(totalObject).find(
    (key) => totalObject[key] === maxLikes
  );
  return {
    author: topAuthor,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
