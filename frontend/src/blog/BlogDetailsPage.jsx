import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowLeft,
  Heart,
  Eye,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Loader
} from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Fetch blog details by slug
  useEffect(() => {
    if (slug) {
      fetchBlogDetails();
    }
  }, [slug]);

  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      // Fetch current blog
      const response = await axiosInstance.get(`/blogs/slug/${slug}`);
      const currentBlog = response.data.data;
      setBlog(currentBlog);
      
      // Fetch related blogs
      await fetchRelatedBlogs(currentBlog);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching blog details:', err);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (currentBlog) => {
    try {
      setLoadingRelated(true);
      // Fetch all blogs first
      const response = await axiosInstance.get('/blogs');
      const allBlogs = response.data.data;
      
      // Filter related blogs
      let related = [];
      
      if (currentBlog.category) {
        // First try to get blogs with same category
        related = allBlogs.filter(blog => 
          blog._id !== currentBlog._id && 
          blog.status === 'published' &&
          blog.category === currentBlog.category
        );
      }
      
      // If less than 4 related blogs, add latest blogs to fill up
      if (related.length < 4) {
        const latestBlogs = allBlogs
          .filter(blog => 
            blog._id !== currentBlog._id && 
            blog.status === 'published' &&
            !related.find(r => r._id === blog._id)
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4 - related.length);
        
        related = [...related, ...latestBlogs];
      }
      
      // Limit to 4 blogs
      setRelatedPosts(related.slice(0, 4));
    } catch (err) {
      console.error('Error fetching related blogs:', err);
      setRelatedPosts([]);
    } finally {
      setLoadingRelated(false);
    }
  };

  const handleRelatedPostClick = (relatedBlog) => {
    // Navigate to the related blog using its slug
    navigate(`/blog/${relatedBlog.slug}`);
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateReadTime = (content) => {
    if (!content) return "5 min read";
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog.title;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-900 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
          <p className="text-gray-600 mb-6">{error || "The blog post you're looking for doesn't exist."}</p>
          <button
            onClick={() => navigate('/blog')}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Blog</span>
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[350px] md:h-[400px] overflow-hidden">
        <img
          src={blog.image || "https://via.placeholder.com/1200x400?text=Blog+Header"}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-xs font-semibold">
              {blog.category || "Uncategorized"}
            </span>
            <span className="text-white/80 text-xs flex items-center gap-1">
              <Eye size={14} /> {blog.views || 0} views
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 max-w-3xl">
            {blog.title}
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl line-clamp-2">
            {blog.shortDescription}
          </p>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Main Article */}
          <div className="lg:w-2/3">
            {/* Author Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6 flex flex-wrap items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${blog.authorName?.replace(/ /g, '+')}&background=0D2F52&color=fff&size=64`}
                  alt={blog.authorName}
                  className="w-14 h-14 rounded-full border-2 border-yellow-400"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{blog.authorName || "Anonymous"}</h3>
                  <p className="text-xs text-gray-500 mb-1">Education Expert</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {formatDate(blog.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {calculateReadTime(blog.content)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`p-2.5 rounded-full transition-all ${
                    liked ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                </button>
                <button className="p-2.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm mb-6">
              <div className="prose prose-sm md:prose-base max-w-none">
                {/* Main Content */}
                <div dangerouslySetInnerHTML={{ __html: blog.content?.replace(/\n/g, '<br/>') }} />
              </div>
            </div>

            {/* FAQ Section with Accordion */}
            {blog.faq && blog.faq.length > 0 && (
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-400 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Frequently Asked Questions
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Find answers to common questions about {blog.title}
                </p>
                
                <div className="space-y-3">
                  {blog.faq.map((faq, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-yellow-400"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        <span className="flex-shrink-0 ml-2">
                          {openFaqIndex === index ? (
                            <ChevronUp className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </span>
                      </button>
                      
                      {openFaqIndex === index && (
                        <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Still have questions? */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-gray-700 mb-3">
                    Still have questions? We're here to help!
                  </p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Contact Us
                    <ArrowLeft size={16} className="rotate-180" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/3">
            {/* Share Options */}
            <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Share2 size={16} />
                Share this article
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleShare('facebook')}
                  className="flex-1 bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Facebook size={16} />
                  Share
                </button>
                <button 
                  onClick={() => handleShare('twitter')}
                  className="flex-1 bg-sky-500 text-white p-2.5 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Twitter size={16} />
                  Tweet
                </button>
              </div>
              <button 
                onClick={() => handleShare('linkedin')}
                className="w-full mt-2 bg-blue-700 text-white p-2.5 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Linkedin size={16} />
                Share on LinkedIn
              </button>
            </div>

            {/* Related Blogs Section */}
            <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen size={18} />
                Related Articles
              </h3>
              
              {loadingRelated ? (
                <div className="flex justify-center py-8">
                  <Loader className="w-6 h-6 text-blue-600 animate-spin" />
                </div>
              ) : relatedPosts.length > 0 ? (
                <div className="space-y-4">
                  {relatedPosts.map((relatedBlog) => (
                    <div
                      key={relatedBlog._id}
                      onClick={() => handleRelatedPostClick(relatedBlog)}
                      className="group cursor-pointer bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex gap-3">
                        {/* Image */}
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                          <img
                            src={relatedBlog.image || "https://via.placeholder.com/100x100?text=Blog"}
                            alt={relatedBlog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 p-2 pr-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                              {relatedBlog.category || "Uncategorized"}
                            </span>
                            <span className="text-[10px] text-gray-500 flex items-center gap-1">
                              <Clock size={10} /> {calculateReadTime(relatedBlog.content)}
                            </span>
                          </div>
                          
                          <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-700 transition-colors">
                            {relatedBlog.title}
                          </h4>
                          
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] font-medium text-gray-600">
                              {relatedBlog.authorName}
                            </span>
                            <div className="flex items-center gap-1 text-gray-400">
                              <Eye size={10} />
                              <span className="text-[10px]">{relatedBlog.views || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No related articles found</p>
                </div>
              )}

              {/* View All Link */}
              {relatedPosts.length > 0 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => navigate('/blogs')}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                  >
                    View All Articles
                    <ArrowLeft size={14} className="rotate-180" />
                  </button>
                </div>
              )}
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['Scholarships', 'Visa', 'USA', 'Canada', 'UK', 'Australia', 'STEM', 'MBA'].map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-xs cursor-pointer transition-colors"
                    onClick={() => navigate('/blog')}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;