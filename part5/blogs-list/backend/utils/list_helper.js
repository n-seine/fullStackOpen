// const dummy = (blogs) => {
//   return 1;
// };

// const totalLikes = (blogs) => {
//   const total = blogs.reduce((sum, blog) => sum + blog.likes, 0);
//   return total;
// };

// const favoriteBlog = (blogs) => {
//   if (blogs.length === 0) {
//     return "no blogs";
//   }
//   const topBlogPost = blogs.sort((a, b) => b.likes - a.likes)[0];
//   return {
//     author: topBlogPost.author,
//     title: topBlogPost.title,
//     likes: topBlogPost.likes,
//   };
// };

// const mostBlogs = (blogs) => {
//   if (blogs.length === 0) {
//     return "no blogs";
//   }

//   let totalObject = {};
//   blogs.forEach((blog) => {
//     totalObject[blog.author] = (totalObject[blog.author] || 0) + 1;
//   });
//   const maxWritten = Math.max(...Object.values(totalObject));
//   const topAuthor = Object.keys(totalObject).find(
//     (key) => totalObject[key] === maxWritten
//   );
//   return {
//     author: topAuthor,
//     blogs: maxWritten,
//   };
// };

// const mostLikes = (blogs) => {
//   if (blogs.length === 0) {
//     return "no blogs";
//   }
//   let totalObject = {};
//   blogs.forEach((blog) => {
//     totalObject[blog.author] = (totalObject[blog.author] || 0) + blog.likes;
//   });
//   const maxLikes = Math.max(...Object.values(totalObject));
//   const topAuthor = Object.keys(totalObject).find(
//     (key) => totalObject[key] === maxLikes
//   );
//   return {
//     author: topAuthor,
//     likes: maxLikes,
//   };
// };

// module.exports = {
//   dummy,
//   totalLikes,
//   favoriteBlog,
//   mostBlogs,
//   mostLikes,
// };

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog), {});
};

const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return null;
  }

  const authors = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  let maxAuthor = Object.keys(authors)[0];

  for (const author in authors) {
    if (authors[author] > authors[maxAuthor]) {
      maxAuthor = author;
    }
  }

  return {
    author: maxAuthor,
    blogs: authors[maxAuthor],
  };
};

const mostLikes = (blogs) => {
  if (!blogs.length) {
    return null;
  }

  const authors = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  let maxAuthor = Object.keys(authors)[0];

  for (const author in authors) {
    if (authors[author] > authors[maxAuthor]) {
      maxAuthor = author;
    }
  }

  return {
    author: maxAuthor,
    likes: authors[maxAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
