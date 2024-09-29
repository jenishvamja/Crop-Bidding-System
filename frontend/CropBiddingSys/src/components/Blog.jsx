import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const BlogList = ({ blogs, onBlogClick }) => {
  return (
    <div className="space-y-6">
      {blogs.map(blog => (
        <div key={blog._id} className="bg-white shadow-md rounded-lg p-4 cursor-pointer" onClick={() => onBlogClick(blog)}>
          <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
          {blog.images && blog.images.length > 0 && (
            <div className="w-full h-40 overflow-hidden mb-2">
              <img 
                src={`http://localhost:5000/${blog.images[0]}`} 
                alt="Blog preview" 
                className="w-full object-cover"
              />
            </div>
          )}
          <p className="text-sm text-gray-600 mb-2">By {blog.author}</p>
          <p className="text-sm text-gray-500">
            Posted on {format(new Date(blog.createdAt), 'MMMM do, yyyy')}
          </p>
        </div>
      ))}
    </div>
  );
};

const BlogDetail = ({ blog, onBack }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">&larr; Back to list</button>
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-600 mb-4">By {blog.author}</p>
      {blog.images && blog.images.length > 0 && (
        <div className="flex justify-center mb-6">
          <img 
            src={`http://localhost:5000/${blog.images[0]}`} 
            alt="Blog image" 
            className="max-w-full h-auto rounded-md"
          />
        </div>
      )}
      <p className="text-gray-800 mb-4">{blog.content}</p>
      <p className="text-sm text-gray-500">
        Posted on {format(new Date(blog.createdAt), 'MMMM do, yyyy')}
      </p>
    </div>
  );
};

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs/');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleBackClick = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Farmer Blogs</h1>
      <div className="h-[600px] overflow-y-auto pr-4">
        {selectedBlog ? (
          <BlogDetail blog={selectedBlog} onBack={handleBackClick} />
        ) : (
          <BlogList blogs={blogs} onBlogClick={handleBlogClick} />
        )}
      </div>
    </div>
  );
};

export default BlogPage;