import React, { useRef, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export default function AdminAddBlog() {
  const editorRef = useRef(null);
  const editorFileRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    date: "",
    image: "", // main blog image
    shortDescription: "",
    content: "",
    authorName: "",
    views: 0,
    faq: []
  });

  const [currentFaq, setCurrentFaq] = useState({
    question: "",
    answer: ""
  });

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [showBlogList, setShowBlogList] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);

  // Fetch all blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await axiosInstance.get('/blogs');
      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Rich text editor formatting
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  // Editor image upload (insert into content)
  const handleEditorImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      formatText("insertImage", base64);
    };
    reader.readAsDataURL(file);
  };

  // Main blog image upload with preview
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, image: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  // Add FAQ
  const handleAddFaq = () => {
    if (currentFaq.question.trim() && currentFaq.answer.trim()) {
      setFormData({
        ...formData,
        faq: [...formData.faq, { 
          question: currentFaq.question, 
          answer: currentFaq.answer 
        }]
      });
      setCurrentFaq({ question: "", answer: "" });
    } else {
      alert("Please fill in both question and answer");
    }
  };

  // Remove FAQ
  const handleRemoveFaq = (index) => {
    const updatedFaq = formData.faq.filter((_, i) => i !== index);
    setFormData({ ...formData, faq: updatedFaq });
  };

  // Edit blog - load data into form
  const handleEditBlog = (blog) => {
    setEditingBlogId(blog._id);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      category: blog.category || "",
      date: blog.date ? blog.date.split('T')[0] : "",
      image: blog.image || "",
      shortDescription: blog.shortDescription || "",
      content: blog.content || "",
      authorName: blog.authorName || "",
      views: blog.views || 0,
      faq: blog.faq || []
    });
    
    if (editorRef.current) {
      editorRef.current.innerHTML = blog.content || "";
    }
    
    setShowBlogList(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete blog
  const handleDeleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await axiosInstance.delete(`/blogs/${id}`);
        if (response.data.success) {
          alert('Blog deleted successfully!');
          fetchBlogs();
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog');
      }
    }
  };

  // Submit blog to API (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const htmlContent = editorRef.current.innerHTML;
    const blogData = { ...formData, content: htmlContent };

    try {
      let response;
      if (editingBlogId) {
        // Update existing blog
        response = await axiosInstance.put(`/blogs/${editingBlogId}`, blogData);
      } else {
        // Create new blog
        response = await axiosInstance.post("/blogs", blogData);
      }
      
      if (response.data.success) {
        alert(editingBlogId ? "Blog updated successfully!" : "Blog saved successfully!");
        
        // Reset form
        setFormData({
          title: "",
          slug: "",
          category: "",
          date: "",
          image: "",
          shortDescription: "",
          content: "",
          authorName: "",
          views: 0,
          faq: []
        });
        if (editorRef.current) editorRef.current.innerHTML = "";
        setCurrentFaq({ question: "", answer: "" });
        setEditingBlogId(null);
        
        // Refresh blog list
        fetchBlogs();
      } else {
        alert(response.data.message || "Failed to save blog");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert(error.response?.data?.message || "Server error. Check console.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form? All unsaved data will be lost.')) {
      setFormData({
        title: "",
        slug: "",
        category: "",
        date: "",
        image: "",
        shortDescription: "",
        content: "",
        authorName: "",
        views: 0,
        faq: []
      });
      if (editorRef.current) editorRef.current.innerHTML = "";
      setCurrentFaq({ question: "", answer: "" });
      setEditingBlogId(null);
    }
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 border shadow">
        {/* Header with buttons */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {editingBlogId ? "Edit Blog" : "Add New Blog"}
          </h1>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowBlogList(!showBlogList)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              {showBlogList ? "Hide Blogs" : "View All Blogs"}
            </button>
            {editingBlogId && (
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        {/* Blog List Section */}
        {showBlogList && (
          <div className="mb-8 border rounded-xl p-4 bg-gray-50">
            <h2 className="text-xl font-bold mb-4">All Blogs ({blogs.length})</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {blogs.map((blog) => (
                <div key={blog._id} className="border rounded-lg p-3 bg-white flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="font-semibold">{blog.title}</h3>
                    <p className="text-sm text-gray-600">By: {blog.authorName} | Views: {blog.views}</p>
                    <p className="text-xs text-gray-500">Slug: {blog.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditBlog(blog)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Text Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title *"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="text"
              name="slug"
              placeholder="Slug *"
              value={formData.slug}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="authorName"
              placeholder="Author Name *"
              value={formData.authorName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="number"
              name="views"
              placeholder="Initial Views"
              value={formData.views}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Short Description */}
          <textarea
            name="shortDescription"
            placeholder="Short Description"
            rows="3"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Main Blog Image Upload */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Blog Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageUpload}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-2 w-48 h-auto rounded-lg border"
              />
            )}
          </div>

          {/* Editor Toolbar */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Blog Content</label>
            <div className="flex flex-wrap gap-2 border rounded-xl p-3 bg-gray-50">
              <button type="button" onClick={() => formatText("bold")} className="editor-btn">Bold</button>
              <button type="button" onClick={() => formatText("italic")} className="editor-btn">Italic</button>
              <button type="button" onClick={() => formatText("underline")} className="editor-btn">Underline</button>
              <button type="button" onClick={() => formatText("strikeThrough")} className="editor-btn">Strike</button>
              <button type="button" onClick={() => formatText("justifyLeft")} className="editor-btn">Left</button>
              <button type="button" onClick={() => formatText("justifyCenter")} className="editor-btn">Center</button>
              <button type="button" onClick={() => formatText("justifyRight")} className="editor-btn">Right</button>
              <button type="button" onClick={() => formatText("justifyFull")} className="editor-btn">Justify</button>
              <button type="button" onClick={() => formatText("insertUnorderedList")} className="editor-btn">• List</button>
              <button type="button" onClick={() => formatText("insertOrderedList")} className="editor-btn">1. List</button>
              
              <select onChange={(e) => formatText("fontSize", e.target.value)} className="editor-select">
                <option value="">Font Size</option>
                <option value="2">Small</option>
                <option value="3">Normal</option>
                <option value="5">Large</option>
                <option value="6">X-Large</option>
              </select>

              <select onChange={(e) => formatText("formatBlock", e.target.value)} className="editor-select">
                <option value="">Heading</option>
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="p">Paragraph</option>
              </select>

              <input type="color" title="Text Color" onChange={(e) => formatText("foreColor", e.target.value)} className="w-10 h-8 rounded border"/>
              <input type="color" title="Highlight" onChange={(e) => formatText("hiliteColor", e.target.value)} className="w-10 h-8 rounded border"/>

              <button type="button" onClick={() => { const url = prompt("Enter link URL"); if(url) formatText("createLink", url); }} className="editor-btn">Link</button>
              <button type="button" onClick={() => editorFileRef.current.click()} className="editor-btn">Upload Image</button>
              <input type="file" accept="image/*" ref={editorFileRef} onChange={handleEditorImageUpload} className="hidden" />
              <button type="button" onClick={() => formatText("removeFormat")} className="editor-btn">Clear</button>
              <button type="button" onClick={() => formatText("undo")} className="editor-btn">Undo</button>
              <button type="button" onClick={() => formatText("redo")} className="editor-btn">Redo</button>
            </div>

            {/* Rich Text Editor */}
            <div
              ref={editorRef}
              contentEditable
              className="min-h-[300px] border border-gray-300 rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              suppressContentEditableWarning={true}
              style={{ whiteSpace: "pre-wrap" }}
            ></div>
          </div>

          {/* FAQ Section */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-lg">FAQ Section</label>
            
            <div className="border border-gray-300 rounded-xl p-4 mb-4 bg-gray-50">
              <h3 className="font-semibold mb-3 text-gray-700">Add New FAQ</h3>
              <input
                type="text"
                placeholder="Question"
                value={currentFaq.question}
                onChange={(e) => setCurrentFaq({ ...currentFaq, question: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              
              <textarea
                placeholder="Answer"
                value={currentFaq.answer}
                onChange={(e) => setCurrentFaq({ ...currentFaq, answer: e.target.value })}
                rows="3"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              
              <button
                type="button"
                onClick={handleAddFaq}
                className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                + Add FAQ
              </button>
            </div>

            {/* Display Added FAQs */}
            {formData.faq.length > 0 && (
              <div className="border border-gray-300 rounded-xl p-4">
                <h3 className="font-semibold mb-3 text-gray-700">Added FAQs ({formData.faq.length})</h3>
                <div className="space-y-3">
                  {formData.faq.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">Q: {faq.question}</h4>
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-gray-600">A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : (editingBlogId ? "Update Blog" : "Publish Blog")}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          .editor-btn {
            padding: 6px 10px;
            font-weight: 600;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            background: white;
            cursor: pointer;
            transition: all 0.2s;
          }
          .editor-btn:hover { 
            background: #ecfdf5;
            border-color: #10b981;
          }
          .editor-select {
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            border: 1px solid #d1d5db;
            cursor: pointer;
            background: white;
          }
          div[contenteditable="true"] ul { 
            list-style-type: disc; 
            padding-left: 1.5rem; 
          }
          div[contenteditable="true"] ol { 
            list-style-type: decimal; 
            padding-left: 1.5rem; 
          }
          div[contenteditable="true"]:empty:before {
            content: attr(placeholder);
            color: #9ca3af;
          }
        `}
      </style>
    </section>
  );
}