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
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Fetch blog details by slug
  useEffect(() => {
    if (slug) {
      fetchBlogDetails();
    }
  }, [slug]);

  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/blogs/slug/${slug}`);
      const currentBlog = response.data.data;
      setBlog(currentBlog);
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
      const response = await axiosInstance.get('/blogs');
      const allBlogs = response.data.data;
      
      let related = [];
      
      if (currentBlog.category) {
        related = allBlogs.filter(blog => 
          blog._id !== currentBlog._id && 
          blog.status === 'published' &&
          blog.category === currentBlog.category
        );
      }
      
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
      
      setRelatedPosts(related.slice(0, 4));
    } catch (err) {
      console.error('Error fetching related blogs:', err);
      setRelatedPosts([]);
    } finally {
      setLoadingRelated(false);
    }
  };

  const handleRelatedPostClick = (relatedBlog) => {
    navigate(`/blog/${relatedBlog.slug}`);
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
    setShowShareMenu(false);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
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
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Image - Improved Fitting */}
      <div className="relative w-full bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden">
          <img
            src={blog.image || "https://via.placeholder.com/1200x600?text=Blog+Header"}
            alt={blog.title}
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: 'center 30%' }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/1200x600?text=Blog+Header";
            }}
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        </div>
        
        {/* Title Overlay - Mobile Optimized */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 md:pb-12">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <span className="bg-yellow-400 text-blue-900 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              {blog.category || "Uncategorized"}
            </span>
            <span className="text-white/90 text-xs flex items-center gap-1 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
              <Eye size={12} /> {blog.views || 0} views
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 max-w-4xl leading-tight">
            {blog.title}
          </h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-3xl line-clamp-2 sm:line-clamp-3">
            {blog.shortDescription}
          </p>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Side - Main Article */}
          <div className="lg:w-2/3">
            {/* Back Button */}
            <button
              onClick={() => navigate('/blog')}
              className="mb-4 sm:mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-blue-900 transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm sm:text-base">Back to Blog</span>
            </button>

            {/* Author Info - Mobile Optimized */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${blog.authorName?.replace(/ /g, '+')}&background=0D2F52&color=fff&size=64`}
                  alt={blog.authorName}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-yellow-400 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{blog.authorName || "Anonymous"}</h3>
                  <p className="text-xs text-gray-500 mb-1">Education Expert</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {formatDate(blog.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {calculateReadTime(blog.content)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons - Mobile Optimized */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`p-2 sm:p-2.5 rounded-full transition-all ${
                    liked ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                </button>
                
                {/* Mobile Share Button */}
                <div className="relative sm:hidden">
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Share2 size={16} />
                  </button>
                  
                  {showShareMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg p-2 z-20 min-w-[140px]">
                      <button 
                        onClick={() => handleShare('facebook')}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                      >
                        <Facebook size={14} /> Facebook
                      </button>
                      <button 
                        onClick={() => handleShare('twitter')}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                      >
                        <Twitter size={14} /> Twitter
                      </button>
                      <button 
                        onClick={() => handleShare('linkedin')}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                      >
                        <Linkedin size={14} /> LinkedIn
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Article Content - Fixed Overflow Issue */}
            <div className="bg-white rounded-xl p-5 sm:p-8 shadow-sm mb-6 sm:mb-8">
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                <style jsx>{`
                  .prose {
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    color: #374151;
                  }
                  .prose img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin: 1.5rem 0;
                  }
                  .prose img:hover {
                    transform: scale(1.02);
                    transition: transform 0.3s ease;
                  }
                  .prose pre {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    overflow-x: auto;
                    background: #1f2937;
                    color: #e5e7eb;
                    padding: 1rem;
                    border-radius: 0.5rem;
                  }
                  .prose code {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    background: #f3f4f6;
                    padding: 0.2rem 0.4rem;
                    border-radius: 0.25rem;
                    font-size: 0.875em;
                  }
                  .prose pre code {
                    background: transparent;
                    padding: 0;
                  }
                  .prose a {
                    color: #1e3a8a;
                    text-decoration: underline;
                  }
                  .prose a:hover {
                    color: #1e40af;
                  }
                  .prose h1, .prose h2, .prose h3, .prose h4 {
                    color: #111827;
                    font-weight: 700;
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                  }
                  .prose p {
                    margin-bottom: 1em;
                    line-height: 1.7;
                  }
                  .prose ul, .prose ol {
                    margin: 1em 0;
                    padding-left: 1.5em;
                  }
                  .prose li {
                    margin: 0.5em 0;
                  }
                  .prose blockquote {
                    border-left: 4px solid #eab308;
                    padding-left: 1rem;
                    font-style: italic;
                    margin: 1rem 0;
                    color: #4b5563;
                  }
                  .prose table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1rem 0;
                    display: block;
                    overflow-x: auto;
                  }
                  .prose th, .prose td {
                    border: 1px solid #e5e7eb;
                    padding: 0.5rem;
                    text-align: left;
                  }
                  .prose th {
                    background: #f3f4f6;
                    font-weight: 600;
                  }
                  @media (max-width: 640px) {
                    .prose {
                      font-size: 0.9rem;
                    }
                    .prose h1 {
                      font-size: 1.5rem;
                    }
                    .prose h2 {
                      font-size: 1.3rem;
                    }
                    .prose h3 {
                      font-size: 1.1rem;
                    }
                  }
                `}</style>
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: blog.content?.replace(/\n/g, '<br/>') 
                  }} 
                />
              </div>
            </div>

            {/* FAQ Section with Accordion - Mobile Optimized */}
            {blog.faq && blog.faq.length > 0 && (
              <div className="bg-white rounded-xl p-5 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-yellow-400 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    Frequently Asked Questions
                  </h2>
                </div>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
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
                        <span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base">
                          {faq.question}
                        </span>
                        <span className="flex-shrink-0">
                          {openFaqIndex === index ? (
                            <ChevronUp className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </span>
                      </button>
                      
                      {openFaqIndex === index && (
                        <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
                          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Still have questions? - Mobile Optimized */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-gray-700 mb-3 text-sm sm:text-base">
                    Still have questions? We're here to help!
                  </p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm sm:text-base"
                  >
                    Contact Us
                    <ArrowLeft size={16} className="rotate-180" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Mobile Optimized */}
          <div className="lg:w-1/3">
            {/* Share Options - Desktop Version */}
            <div className="hidden sm:block bg-white rounded-xl p-6 shadow-sm mb-6 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Share2 size={18} />
                Share this article
              </h3>
              <div className="space-y-2">
                <button 
                  onClick={() => handleShare('facebook')}
                  className="w-full bg-[#1877f2] text-white p-2.5 rounded-lg hover:bg-[#1863d2] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Facebook size={18} />
                  Share on Facebook
                </button>
                <button 
                  onClick={() => handleShare('twitter')}
                  className="w-full bg-[#1da1f2] text-white p-2.5 rounded-lg hover:bg-[#1889d2] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Twitter size={18} />
                  Share on Twitter
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="w-full bg-[#0a66c2] text-white p-2.5 rounded-lg hover:bg-[#0953a3] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Linkedin size={18} />
                  Share on LinkedIn
                </button>
              </div>
            </div>

            {/* Related Blogs Section - Mobile Optimized */}
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-base sm:text-lg">
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
                        {/* Image with better fitting */}
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={relatedBlog.image || "https://via.placeholder.com/100x100?text=Blog"}
                            alt={relatedBlog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 py-1 pr-2">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
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
                            <span className="text-[10px] font-medium text-gray-600 truncate max-w-[120px]">
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

            {/* Popular Tags - Mobile Optimized */}
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-base sm:text-lg">Popular Tags</h3>
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