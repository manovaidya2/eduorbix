// import React, { useRef, useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";
// import { toast } from "react-hot-toast";

// export default function AdminEditCaseStudy() {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const editorRef = useRef(null);
//   const editorFileRef = useRef(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     slug: "",
//     shortDescription: "",
//     image: "",
//     content: "",
//   });
  
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [unsavedChanges, setUnsavedChanges] = useState(false);

//   /* 🔹 Fetch case study data */
//   useEffect(() => {
//     fetchCaseStudy();
//   }, [id]);

//   /* 🔹 Auto slug generate from title */
//   useEffect(() => {
//     if (formData.title && !unsavedChanges) {
//       setFormData((prev) => ({
//         ...prev,
//         slug:
//           prev.slug ||
//           prev.title
//             .toLowerCase()
//             .trim()
//             .replace(/[^a-z0-9]+/g, "-")
//             .replace(/^-+|-+$/g, ""),
//       }));
//     }
//   }, [formData.title]);

//   /* 🔹 Fetch single case study */
//   const fetchCaseStudy = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get('/case-studies');
//       const caseStudy = response.data.find(cs => cs._id === id);
      
//       if (!caseStudy) {
//         toast.error('Case study not found');
//         navigate('/admin/case-studies');
//         return;
//       }

//       setFormData({
//         title: caseStudy.title || "",
//         slug: caseStudy.slug || "",
//         shortDescription: caseStudy.shortDescription || "",
//         image: caseStudy.image || "",
//         content: caseStudy.content || "",
//       });

//       // Set editor content after data is loaded
//       setTimeout(() => {
//         if (editorRef.current && caseStudy.content) {
//           editorRef.current.innerHTML = caseStudy.content;
//         }
//       }, 100);
      
//     } catch (error) {
//       toast.error('Failed to fetch case study');
//       console.error('Fetch error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* 🔹 Input change */
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setUnsavedChanges(true);
//   };

//   /* 🔹 Editor command */
//   const formatText = (command, value = null) => {
//     editorRef.current.focus();
//     document.execCommand(command, false, value);
//     setUnsavedChanges(true);
//   };

//   /* 🔹 Insert link */
//   const insertLink = () => {
//     const url = prompt("Enter link URL");
//     if (url) {
//       formatText("createLink", url);
//       setUnsavedChanges(true);
//     }
//   };

//   /* 🔹 Upload image inside editor */
//   const handleEditorImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       formatText("insertImage", event.target.result);
//       setUnsavedChanges(true);
//     };
//     reader.readAsDataURL(file);
//   };

//   /* 🔹 Featured image upload */
//   const handleMainImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setFormData({ ...formData, image: event.target.result });
//       setUnsavedChanges(true);
//     };
//     reader.readAsDataURL(file);
//   };

//   /* 🔹 Submit */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...formData,
//       content: editorRef.current.innerHTML,
//     };

//     setSaving(true);
    
//     try {
//       await axiosInstance.put(`/case-studies/${id}`, payload);
//       toast.success("✅ Case Study Updated Successfully");
//       setUnsavedChanges(false);
      
//       // Optional: Redirect after save
//       setTimeout(() => navigate('/admin/case-studies'), 1500);
      
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "❌ Failed to update case study");
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* 🔹 Handle cancel */
//   const handleCancel = () => {
//     if (unsavedChanges) {
//       if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
//         navigate('/admin/case-studies');
//       }
//     } else {
//       navigate('/admin/case-studies');
//     }
//   };

//   /* 🔹 Handle delete */
//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this case study? This action cannot be undone.')) {
//       try {
//         await axiosInstance.delete(`/case-studies/${id}`);
//         toast.success('Case study deleted successfully');
//         navigate('/admin/case-studies');
//       } catch (error) {
//         toast.error('Failed to delete case study');
//         console.error('Delete error:', error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <section className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading case study...</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-5xl mx-auto">
        
//         {/* Header with actions */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleCancel}
//               className="p-2 hover:bg-white rounded-xl transition-all"
//             >
//               ← Back
//             </button>
//             <h1 className="text-3xl font-bold text-gray-800">
//               Edit Case Study
//             </h1>
//           </div>
          
//           <div className="flex gap-3">
//             <button
//               onClick={handleDelete}
//               className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-all"
//             >
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Unsaved Changes Warning */}
//         {unsavedChanges && (
//           <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
//             <p className="text-yellow-700 flex items-center gap-2">
//               <span>⚠️</span>
//               You have unsaved changes. Don't forget to save your work!
//             </p>
//           </div>
//         )}

//         <div className="bg-white rounded-3xl p-8 shadow border">
//           <form onSubmit={handleSubmit} className="space-y-6">

//             {/* Title */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Case Study Title"
//                 className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 required
//               />
//             </div>

//             {/* Slug */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Slug <span className="text-red-500">*</span>
//               </label>
//               <input
//                 name="slug"
//                 value={formData.slug}
//                 onChange={handleChange}
//                 placeholder="url-friendly-slug"
//                 className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 required
//               />
//               <p className="mt-1 text-sm text-gray-500">
//                 URL: /case-studies/{formData.slug}
//               </p>
//             </div>

//             {/* Short Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Short Description
//               </label>
//               <textarea
//                 name="shortDescription"
//                 value={formData.shortDescription}
//                 onChange={handleChange}
//                 placeholder="Brief description of the case study"
//                 rows="3"
//                 className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
//               />
//             </div>

//             {/* Featured Image */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Featured Image
//               </label>
//               <div className="space-y-4">
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   onChange={handleMainImageUpload}
//                   className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
//                 />
//                 {formData.image && (
//                   <div className="relative group">
//                     <img
//                       src={formData.image}
//                       alt="Preview"
//                       className="w-full max-w-md h-48 object-cover rounded-xl shadow-md"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setFormData({ ...formData, image: "" });
//                         setUnsavedChanges(true);
//                       }}
//                       className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* 🔹 EDITOR TOOLBAR */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Content <span className="text-red-500">*</span>
//               </label>
//               <div className="flex flex-wrap gap-2 border rounded-xl p-3 bg-gray-50 mb-3">

//                 <button type="button" onClick={() => formatText("bold")} className="editor-btn">Bold</button>
//                 <button type="button" onClick={() => formatText("italic")} className="editor-btn">Italic</button>
//                 <button type="button" onClick={() => formatText("underline")} className="editor-btn">Underline</button>
//                 <button type="button" onClick={() => formatText("strikeThrough")} className="editor-btn">Strike</button>

//                 <button type="button" onClick={() => formatText("justifyLeft")} className="editor-btn">Left</button>
//                 <button type="button" onClick={() => formatText("justifyCenter")} className="editor-btn">Center</button>
//                 <button type="button" onClick={() => formatText("justifyRight")} className="editor-btn">Right</button>
//                 <button type="button" onClick={() => formatText("justifyFull")} className="editor-btn">Justify</button>

//                 <button type="button" onClick={() => formatText("insertUnorderedList")} className="editor-btn">• Bullet</button>
//                 <button type="button" onClick={() => formatText("insertOrderedList")} className="editor-btn">1. Number</button>

//                 <select onChange={(e) => formatText("fontSize", e.target.value)} className="editor-select">
//                   <option value="">Font Size</option>
//                   <option value="2">Small</option>
//                   <option value="3">Normal</option>
//                   <option value="5">Large</option>
//                   <option value="6">X-Large</option>
//                 </select>

//                 <select onChange={(e) => formatText("formatBlock", e.target.value)} className="editor-select">
//                   <option value="">Heading</option>
//                   <option value="h1">H1</option>
//                   <option value="h2">H2</option>
//                   <option value="h3">H3</option>
//                   <option value="p">Paragraph</option>
//                 </select>

//                 {/* 🎨 Colors */}
//                 <input
//                   type="color"
//                   title="Text Color"
//                   onChange={(e) => formatText("foreColor", e.target.value)}
//                   className="w-10 h-8 border rounded cursor-pointer"
//                 />

//                 <input
//                   type="color"
//                   title="Highlight"
//                   onChange={(e) => formatText("hiliteColor", e.target.value)}
//                   className="w-10 h-8 border rounded cursor-pointer"
//                 />

//                 <button type="button" onClick={insertLink} className="editor-btn">Insert Link</button>

//                 <button
//                   type="button"
//                   onClick={() => editorFileRef.current.click()}
//                   className="editor-btn"
//                 >
//                   Upload Image
//                 </button>

//                 <button type="button" onClick={() => formatText("removeFormat")} className="editor-btn">Clear</button>
//                 <button type="button" onClick={() => formatText("undo")} className="editor-btn">Undo</button>
//                 <button type="button" onClick={() => formatText("redo")} className="editor-btn">Redo</button>

//                 <input
//                   type="file"
//                   accept="image/*"
//                   ref={editorFileRef}
//                   onChange={handleEditorImageUpload}
//                   className="hidden"
//                 />
//               </div>

//               {/* 🔹 EDITOR */}
//               <div
//                 ref={editorRef}
//                 contentEditable
//                 className="min-h-[300px] border rounded-xl p-4 focus:outline-none overflow-y-auto"
//                 suppressContentEditableWarning
//                 onInput={() => setUnsavedChanges(true)}
//               />
//             </div>

//             {/* Form Actions */}
//             <div className="flex justify-end gap-4 pt-4 border-t">
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={saving || !unsavedChanges}
//                 className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {saving ? (
//                   <>
//                     <span className="animate-spin">⏳</span>
//                     Saving...
//                   </>
//                 ) : (
//                   'Update Case Study'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Editor styles */}
//       <style>
//         {`
//           .editor-btn {
//             padding: 6px 12px;
//             border: 1px solid #d1d5db;
//             border-radius: 6px;
//             background: white;
//             cursor: pointer;
//             font-weight: 500;
//             font-size: 14px;
//             transition: all 0.2s;
//           }
//           .editor-btn:hover {
//             background: #ede9fe;
//             border-color: #8b5cf6;
//           }
//           .editor-select {
//             padding: 6px 8px;
//             border-radius: 6px;
//             border: 1px solid #d1d5db;
//             background: white;
//             cursor: pointer;
//             font-size: 14px;
//           }
//           .editor-select:hover {
//             border-color: #8b5cf6;
//           }
//           div[contenteditable="true"] {
//             min-height: 300px;
//             max-height: 500px;
//             overflow-y: auto;
//           }
//           div[contenteditable="true"]:focus {
//             border-color: #8b5cf6;
//             box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
//           }
//           div[contenteditable="true"] ul {
//             list-style-type: disc;
//             padding-left: 1.5rem;
//           }
//           div[contenteditable="true"] ol {
//             list-style-type: decimal;
//             padding-left: 1.5rem;
//           }
//           div[contenteditable="true"] img {
//             max-width: 100%;
//             height: auto;
//             border-radius: 8px;
//             margin: 10px 0;
//           }
//           div[contenteditable="true"] h1 {
//             font-size: 2em;
//             font-weight: bold;
//           }
//           div[contenteditable="true"] h2 {
//             font-size: 1.5em;
//             font-weight: bold;
//           }
//           div[contenteditable="true"] h3 {
//             font-size: 1.17em;
//             font-weight: bold;
//           }
//         `}
//       </style>
//     </section>
//   );
// }





import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

export default function AdminEditCaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const editorRef = useRef(null);
  const editorFileRef = useRef(null);
  const resizeRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    image: "",
    content: "",
  });
  
  // Image link states
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  // Image resize states
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartY, setResizeStartY] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);
  const [resizeStartHeight, setResizeStartHeight] = useState(0);
  const [resizeDirection, setResizeDirection] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  /* 🔹 Fetch case study data */
  useEffect(() => {
    fetchCaseStudy();
  }, [id]);

  /* 🔹 Auto slug generate from title */
  useEffect(() => {
    if (formData.title && !unsavedChanges) {
      setFormData((prev) => ({
        ...prev,
        slug:
          prev.slug ||
          prev.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, ""),
      }));
    }
  }, [formData.title]);

  /* 🔹 Global resize events */
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', stopResize);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing]);

  /* 🔹 Fetch single case study */
  const fetchCaseStudy = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/case-studies');
      const caseStudy = response.data.find(cs => cs._id === id);
      
      if (!caseStudy) {
        toast.error('Case study not found');
        navigate('/admin/case-studies');
        return;
      }

      setFormData({
        title: caseStudy.title || "",
        slug: caseStudy.slug || "",
        shortDescription: caseStudy.shortDescription || "",
        image: caseStudy.image || "",
        content: caseStudy.content || "",
      });

      // Set editor content after data is loaded
      setTimeout(() => {
        if (editorRef.current && caseStudy.content) {
          editorRef.current.innerHTML = caseStudy.content;
        }
      }, 100);
      
    } catch (error) {
      toast.error('Failed to fetch case study');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 Input change */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setUnsavedChanges(true);
  };

  /* 🔹 Editor command */
  const formatText = (command, value = null) => {
    editorRef.current.focus();
    document.execCommand(command, false, value);
    setUnsavedChanges(true);
  };

  /* 🔹 Handle image click in editor */
  const handleImageClick = (e) => {
    const target = e.target;
    
    if (target.tagName === 'IMG') {
      e.preventDefault();
      e.stopPropagation();
      
      // Remove previous selection
      if (selectedImage) {
        selectedImage.classList.remove('selected-image');
        removeResizeHandles();
      }
      
      // Add selection class to new image
      target.classList.add('selected-image');
      setSelectedImage(target);
      
      // Add resize handles
      setTimeout(() => {
        addResizeHandles(target);
      }, 10);
      
      console.log('Image selected:', target);
    } else {
      // Clicked on non-image, deselect
      if (selectedImage) {
        selectedImage.classList.remove('selected-image');
        removeResizeHandles();
        setSelectedImage(null);
      }
    }
  };

  /* 🔹 Setup image click listener */
  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener('click', handleImageClick);
      
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.tagName === 'IMG') {
              node.addEventListener('click', handleImageClick);
            }
          });
        });
      });
      
      observer.observe(editor, { childList: true, subtree: true });
      
      return () => {
        editor.removeEventListener('click', handleImageClick);
        observer.disconnect();
      };
    }
  }, [selectedImage]);

  /* 🔹 Add resize handles */
  const addResizeHandles = (image) => {
    removeResizeHandles();
    
    let container = image.parentNode;
    if (!container.classList || !container.classList.contains('image-resize-container')) {
      container = document.createElement('div');
      container.className = 'image-resize-container';
      container.style.position = 'relative';
      container.style.display = 'inline-block';
      container.style.lineHeight = '0';
      
      image.parentNode.insertBefore(container, image);
      container.appendChild(image);
    }
    
    const positions = [
      { name: 'nw', style: 'top: -8px; left: -8px; cursor: nw-resize;' },
      { name: 'ne', style: 'top: -8px; right: -8px; cursor: ne-resize;' },
      { name: 'sw', style: 'bottom: -8px; left: -8px; cursor: sw-resize;' },
      { name: 'se', style: 'bottom: -8px; right: -8px; cursor: se-resize;' },
      { name: 'n', style: 'top: -8px; left: 50%; transform: translateX(-50%); cursor: n-resize;' },
      { name: 's', style: 'bottom: -8px; left: 50%; transform: translateX(-50%); cursor: s-resize;' },
      { name: 'e', style: 'top: 50%; right: -8px; transform: translateY(-50%); cursor: e-resize;' },
      { name: 'w', style: 'top: 50%; left: -8px; transform: translateY(-50%); cursor: w-resize;' }
    ];
    
    positions.forEach(pos => {
      const handle = document.createElement('div');
      handle.className = `resize-handle resize-handle-${pos.name}`;
      handle.style.cssText = `
        position: absolute;
        width: 16px;
        height: 16px;
        background: white;
        border: 2px solid #a855f7;
        border-radius: 50%;
        z-index: 1000;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        ${pos.style}
      `;
      
      handle.setAttribute('data-direction', pos.name);
      handle.addEventListener('mousedown', startResize);
      handle.addEventListener('click', (e) => e.stopPropagation());
      
      container.appendChild(handle);
    });
  };

  /* 🔹 Remove resize handles */
  const removeResizeHandles = () => {
    const handles = document.querySelectorAll('.resize-handle');
    handles.forEach(handle => handle.remove());
    
    const containers = document.querySelectorAll('.image-resize-container');
    containers.forEach(container => {
      const image = container.querySelector('img');
      if (image && container.parentNode) {
        container.parentNode.insertBefore(image, container);
        container.remove();
      }
    });
  };

  /* 🔹 Start resize */
  const startResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const handle = e.target;
    const direction = handle.getAttribute('data-direction');
    const container = handle.closest('.image-resize-container');
    
    if (!container) return;
    
    const image = container.querySelector('img');
    if (!image) return;
    
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStartX(e.clientX);
    setResizeStartY(e.clientY);
    setResizeStartWidth(image.offsetWidth);
    setResizeStartHeight(image.offsetHeight);
    
    resizeRef.current = {
      image,
      container,
      aspectRatio: image.offsetWidth / image.offsetHeight
    };
    
    document.body.style.userSelect = 'none';
  };

  /* 🔹 Handle resize */
  const handleResize = (e) => {
    if (!isResizing || !resizeRef.current) return;
    
    e.preventDefault();
    
    const { image, aspectRatio } = resizeRef.current;
    const deltaX = e.clientX - resizeStartX;
    const deltaY = e.clientY - resizeStartY;
    
    let newWidth = resizeStartWidth;
    let newHeight = resizeStartHeight;
    
    switch(resizeDirection) {
      case 'se':
        newWidth = Math.max(50, resizeStartWidth + deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : Math.max(50, resizeStartHeight + deltaY);
        break;
      case 'sw':
        newWidth = Math.max(50, resizeStartWidth - deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : Math.max(50, resizeStartHeight + deltaY);
        break;
      case 'ne':
        newWidth = Math.max(50, resizeStartWidth + deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : Math.max(50, resizeStartHeight - deltaY);
        break;
      case 'nw':
        newWidth = Math.max(50, resizeStartWidth - deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : Math.max(50, resizeStartHeight - deltaY);
        break;
      case 'e':
        newWidth = Math.max(50, resizeStartWidth + deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : resizeStartHeight;
        break;
      case 'w':
        newWidth = Math.max(50, resizeStartWidth - deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : resizeStartHeight;
        break;
      case 'n':
        newWidth = e.shiftKey ? Math.max(50, (resizeStartHeight - deltaY) * aspectRatio) : resizeStartWidth;
        newHeight = Math.max(50, resizeStartHeight - deltaY);
        break;
      case 's':
        newWidth = e.shiftKey ? Math.max(50, (resizeStartHeight + deltaY) * aspectRatio) : resizeStartWidth;
        newHeight = Math.max(50, resizeStartHeight + deltaY);
        break;
    }
    
    image.style.width = `${newWidth}px`;
    image.style.height = `${newHeight}px`;
    image.removeAttribute('width');
    image.removeAttribute('height');
    setUnsavedChanges(true);
  };

  /* 🔹 Stop resize */
  const stopResize = () => {
    setIsResizing(false);
    resizeRef.current = null;
    document.body.style.userSelect = '';
  };

  /* 🔹 Reset image size */
  const resetImageSize = () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }
    
    selectedImage.style.width = '';
    selectedImage.style.height = '';
    selectedImage.removeAttribute('width');
    selectedImage.removeAttribute('height');
    setUnsavedChanges(true);
  };

  /* 🔹 Set preset size */
  const setImageSize = (width, height) => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }
    
    selectedImage.style.width = `${width}px`;
    selectedImage.style.height = `${height}px`;
    setUnsavedChanges(true);
  };

  /* 🔹 Add link to selected image */
  const addLinkToSelectedImage = () => {
    if (!selectedImage) {
      toast.error("Please click on an image to select it first");
      return;
    }

    const parentAnchor = selectedImage.closest('a');
    setLinkUrl(parentAnchor ? parentAnchor.href : '');
    setShowLinkDialog(true);
  };

  /* 🔹 Handle link submit */
  const handleLinkSubmit = () => {
    if (!selectedImage) {
      toast.error("No image selected");
      setShowLinkDialog(false);
      return;
    }

    if (!linkUrl) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      let url = linkUrl;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      const parentAnchor = selectedImage.closest('a');
      
      // Remove resize handles before modifying DOM
      removeResizeHandles();
      
      if (parentAnchor) {
        // Update existing link
        parentAnchor.href = url;
        parentAnchor.target = '_blank';
        parentAnchor.rel = 'noopener noreferrer';
        parentAnchor.className = 'linked-image';
      } else {
        // Create new anchor tag around the image
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.className = 'linked-image';
        
        // Replace the image with the anchor containing the image
        selectedImage.parentNode.replaceChild(anchor, selectedImage);
        anchor.appendChild(selectedImage);
      }

      // Keep image selected
      selectedImage.classList.add('selected-image');
      
      toast.success('Link added successfully!');
      setUnsavedChanges(true);
    } catch (error) {
      console.error('Error adding link:', error);
      toast.error('Error adding link. Please try again.');
    }

    setShowLinkDialog(false);
    setLinkUrl("");
  };

  /* 🔹 Edit existing link */
  const editImageLink = () => {
    if (!selectedImage) {
      toast.error("Please click on an image to select it first");
      return;
    }

    const parentAnchor = selectedImage.closest('a');
    if (parentAnchor) {
      setLinkUrl(parentAnchor.href || '');
      setShowLinkDialog(true);
    } else {
      toast.error("Selected image doesn't have a link. Use 'Add Link to Image' instead.");
    }
  };

  /* 🔹 Remove link */
  const removeImageLink = () => {
    if (!selectedImage) {
      toast.error("Please click on an image to select it first");
      return;
    }

    const parentAnchor = selectedImage.closest('a');
    if (parentAnchor) {
      // Remove resize handles first
      removeResizeHandles();
      
      // Replace anchor with just the image
      parentAnchor.parentNode.replaceChild(selectedImage, parentAnchor);
      selectedImage.classList.add('selected-image');
      
      toast.success('Link removed successfully!');
      setUnsavedChanges(true);
    } else {
      toast.error("Selected image doesn't have a link to remove");
    }
  };

  /* 🔹 Insert link */
  const insertLink = () => {
    const url = prompt("Enter link URL");
    if (url) {
      formatText("createLink", url);
      // Find the newly created link and add target="_blank"
      setTimeout(() => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = range.commonAncestorContainer;
          const link = container.nodeType === 3 ? container.parentElement : container;
          if (link && link.tagName === 'A') {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
          }
        }
      }, 100);
    }
  };

  /* 🔹 Upload image inside editor */
  const handleEditorImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      formatText("insertImage", event.target.result);
      
      setTimeout(() => {
        const images = editorRef.current.getElementsByTagName('img');
        if (images.length > 0) {
          const lastImage = images[images.length - 1];
          
          if (selectedImage) {
            selectedImage.classList.remove('selected-image');
            removeResizeHandles();
          }
          
          lastImage.classList.add('selected-image');
          setSelectedImage(lastImage);
          lastImage.addEventListener('click', handleImageClick);
          addResizeHandles(lastImage);
          setUnsavedChanges(true);
          
          if (window.confirm("Do you want to add a link to this image?")) {
            setLinkUrl('');
            setShowLinkDialog(true);
          }
        }
      }, 200);
    };
    reader.readAsDataURL(file);
  };

  /* 🔹 Featured image upload */
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, image: event.target.result });
      setUnsavedChanges(true);
    };
    reader.readAsDataURL(file);
  };

  /* 🔹 Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove selection class and resize handles before saving
    if (selectedImage) {
      selectedImage.classList.remove('selected-image');
      removeResizeHandles();
    }

    const payload = {
      ...formData,
      content: editorRef.current.innerHTML,
    };

    setSaving(true);
    
    try {
      await axiosInstance.put(`/case-studies/${id}`, payload);
      toast.success("✅ Case Study Updated Successfully");
      setUnsavedChanges(false);
      
      // Optional: Redirect after save
      setTimeout(() => navigate('/admin/case-studies'), 1500);
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "❌ Failed to update case study");
    } finally {
      setSaving(false);
    }
  };

  /* 🔹 Handle cancel */
  const handleCancel = () => {
    if (unsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/admin/case-studies');
      }
    } else {
      navigate('/admin/case-studies');
    }
  };

  /* 🔹 Handle delete */
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this case study? This action cannot be undone.')) {
      try {
        await axiosInstance.delete(`/case-studies/${id}`);
        toast.success('Case study deleted successfully');
        navigate('/admin/case-studies');
      } catch (error) {
        toast.error('Failed to delete case study');
        console.error('Delete error:', error);
      }
    }
  };

  if (loading) {
    return (
      <section className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading case study...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Header with actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-white rounded-xl transition-all"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
              Edit Case Study
            </h1>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-all"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Unsaved Changes Warning */}
        {unsavedChanges && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-yellow-700 flex items-center gap-2">
              <span>⚠️</span>
              You have unsaved changes. Don't forget to save your work!
            </p>
          </div>
        )}

        {/* Link Dialog Modal */}
        {showLinkDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">
                {selectedImage?.closest('a') ? 'Edit Image Link' : 'Add Link to Image'}
              </h3>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL (e.g., example.com or https://example.com)"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                autoFocus
              />
              <div className="text-sm text-gray-500 mb-4">
                Tip: You can enter URL with or without https://
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowLinkDialog(false);
                    setLinkUrl("");
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLinkSubmit}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Apply Link
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 shadow border">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Case Study Title"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="url-friendly-slug"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                URL: /case-studies/{formData.slug}
              </p>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Brief description of the case study"
                rows="3"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <div className="space-y-4">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleMainImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {formData.image && (
                  <div className="relative group">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full max-w-md h-48 object-cover rounded-xl shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, image: "" });
                        setUnsavedChanges(true);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Image Indicator */}
            {selectedImage && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm text-purple-700">
                <span className="text-lg">✅</span>
                <strong className="ml-2">Image selected!</strong>
                <ul className="list-disc ml-6 mt-1">
                  <li>Resize by dragging the circular handles</li>
                  <li>Hold Shift key while resizing to maintain aspect ratio</li>
                  <li>Use preset sizes below</li>
                  <li>Use Image Link Tools to add/edit/remove links</li>
                </ul>
              </div>
            )}

            {/* Image Size Tools */}
            {selectedImage && (
              <div className="border-2 border-purple-200 rounded-xl p-4 bg-purple-50">
                <h3 className="text-sm font-semibold text-purple-800 mb-3">📏 Image Size Tools</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={resetImageSize}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                  >
                    🔄 Reset to Original
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageSize(300, 200)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
                  >
                    Small (300x200)
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageSize(500, 350)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
                  >
                    Medium (500x350)
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageSize(800, 450)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
                  >
                    Large (800x450)
                  </button>
                </div>
                <p className="text-xs text-purple-600 mt-2">
                  💡 Drag purple handles to resize manually. Hold Shift for aspect ratio.
                </p>
              </div>
            )}

            {/* 🔹 EDITOR TOOLBAR */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 border rounded-xl p-3 bg-gray-50 mb-3">

                <button type="button" onClick={() => formatText("bold")} className="editor-btn">Bold</button>
                <button type="button" onClick={() => formatText("italic")} className="editor-btn">Italic</button>
                <button type="button" onClick={() => formatText("underline")} className="editor-btn">Underline</button>
                <button type="button" onClick={() => formatText("strikeThrough")} className="editor-btn">Strike</button>

                <button type="button" onClick={() => formatText("justifyLeft")} className="editor-btn">Left</button>
                <button type="button" onClick={() => formatText("justifyCenter")} className="editor-btn">Center</button>
                <button type="button" onClick={() => formatText("justifyRight")} className="editor-btn">Right</button>
                <button type="button" onClick={() => formatText("justifyFull")} className="editor-btn">Justify</button>

                <button type="button" onClick={() => formatText("insertUnorderedList")} className="editor-btn">• Bullet</button>
                <button type="button" onClick={() => formatText("insertOrderedList")} className="editor-btn">1. Number</button>

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

                {/* 🎨 Colors */}
                <input
                  type="color"
                  title="Text Color"
                  onChange={(e) => formatText("foreColor", e.target.value)}
                  className="w-10 h-8 border rounded cursor-pointer"
                />

                <input
                  type="color"
                  title="Highlight"
                  onChange={(e) => formatText("hiliteColor", e.target.value)}
                  className="w-10 h-8 border rounded cursor-pointer"
                />

                <button type="button" onClick={insertLink} className="editor-btn">Insert Text Link</button>

                <button
                  type="button"
                  onClick={() => editorFileRef.current.click()}
                  className="editor-btn bg-purple-100"
                >
                  📷 Upload Image
                </button>

                {/* Image Link Tools */}
                <div className="w-full border-t-2 border-gray-200 my-2 pt-2">
                  <span className="text-sm font-semibold text-gray-600 block mb-2">🔗 Image Link Tools:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={addLinkToSelectedImage}
                      className="editor-btn bg-purple-500 text-white hover:bg-purple-600"
                      title="Click on an image first, then click here"
                    >
                      🔗 Add Link
                    </button>
                    <button
                      type="button"
                      onClick={editImageLink}
                      className="editor-btn bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      ✏️ Edit Link
                    </button>
                    <button
                      type="button"
                      onClick={removeImageLink}
                      className="editor-btn bg-red-500 text-white hover:bg-red-600"
                    >
                      🗑️ Remove Link
                    </button>
                  </div>
                </div>

                <button type="button" onClick={() => formatText("removeFormat")} className="editor-btn">Clear</button>
                <button type="button" onClick={() => formatText("undo")} className="editor-btn">Undo</button>
                <button type="button" onClick={() => formatText("redo")} className="editor-btn">Redo</button>

                <input
                  type="file"
                  accept="image/*"
                  ref={editorFileRef}
                  onChange={handleEditorImageUpload}
                  className="hidden"
                />
              </div>

              {/* 🔹 EDITOR */}
              <div
                ref={editorRef}
                contentEditable
                className="min-h-[400px] border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-400 prose max-w-none overflow-y-auto"
                suppressContentEditableWarning
                onInput={() => setUnsavedChanges(true)}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !unsavedChanges}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Saving...
                  </>
                ) : (
                  'Update Case Study'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Editor styles */}
      <style>
        {`
          .editor-btn {
            padding: 6px 12px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            background: white;
            cursor: pointer;
            font-weight: 500;
            font-size: 14px;
            transition: all 0.2s;
          }
          .editor-btn:hover {
            background: #ede9fe;
            border-color: #8b5cf6;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .editor-select {
            padding: 6px 8px;
            border-radius: 6px;
            border: 1px solid #d1d5db;
            background: white;
            cursor: pointer;
            font-size: 14px;
          }
          .editor-select:hover {
            border-color: #8b5cf6;
          }
          
          /* Editor Content Styles */
          div[contenteditable="true"] {
            min-height: 400px;
            max-height: 600px;
            overflow-y: auto;
            outline: none;
            cursor: text;
          }
          
          div[contenteditable="true"]:focus {
            border-color: #8b5cf6;
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
          }
          
          div[contenteditable="true"] ul {
            list-style-type: disc;
            padding-left: 1.5rem;
            margin: 0.5rem 0;
          }
          
          div[contenteditable="true"] ol {
            list-style-type: decimal;
            padding-left: 1.5rem;
            margin: 0.5rem 0;
          }
          
          div[contenteditable="true"] h1 {
            font-size: 2rem;
            font-weight: bold;
            margin: 1rem 0;
          }
          
          div[contenteditable="true"] h2 {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0.875rem 0;
          }
          
          div[contenteditable="true"] h3 {
            font-size: 1.25rem;
            font-weight: bold;
            margin: 0.75rem 0;
          }
          
          div[contenteditable="true"] a {
            color: #8b5cf6;
            text-decoration: underline;
            cursor: pointer;
          }
          
          div[contenteditable="true"] a:hover {
            color: #7c3aed;
          }
          
          /* Image Styles */
          div[contenteditable="true"] img {
            max-width: 100%;
            height: auto;
            cursor: pointer;
            border: 3px solid transparent;
            border-radius: 8px;
            transition: all 0.2s;
            display: inline-block;
            margin: 0.5rem 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            user-select: none;
          }
          
          div[contenteditable="true"] img:hover {
            border: 3px solid #8b5cf6;
            opacity: 0.9;
          }
          
          div[contenteditable="true"] img.selected-image {
            border: 3px solid #8b5cf6;
            box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
          }
          
          /* Resize Container */
          .image-resize-container {
            position: relative;
            display: inline-block;
            line-height: 0;
            margin: 0.5rem 0;
          }
          
          .image-resize-container img {
            display: block;
            width: auto;
            height: auto;
            max-width: 100%;
            margin: 0;
          }
          
          /* Resize Handles */
          .resize-handle {
            position: absolute;
            width: 16px;
            height: 16px;
            background: white;
            border: 2px solid #8b5cf6;
            border-radius: 50%;
            z-index: 1000;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            transition: all 0.2s;
          }
          
          .resize-handle:hover {
            background: #8b5cf6;
            transform: scale(1.2);
          }
          
          /* Linked Image Styles */
          div[contenteditable="true"] a.linked-image {
            text-decoration: none;
            border: none;
            display: inline-block;
          }
          
          div[contenteditable="true"] a.linked-image img {
            border: 3px solid transparent;
          }
          
          div[contenteditable="true"] a.linked-image:hover img {
            border: 3px solid #8b5cf6;
            opacity: 0.8;
          }
          
          /* Prose styles for editor */
          .prose {
            max-width: 100%;
            line-height: 1.6;
          }
          
          .prose p {
            margin: 1rem 0;
          }
          
          .prose blockquote {
            border-left: 4px solid #8b5cf6;
            padding-left: 1rem;
            font-style: italic;
            margin: 1.5rem 0;
            color: #4b5563;
          }
          
          .prose pre {
            background: #1e1e2e;
            color: #fff;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 1.5rem 0;
          }
          
          .prose code {
            background: #f1f1f1;
            color: #e01e5a;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.9em;
          }
        `}
      </style>
    </section>
  );
}