// import React, { useRef, useState } from "react";
// import axiosInstance from "../api/axiosInstance";

// export default function AdminAddBlog() {
//   const editorRef = useRef(null);
//   const editorFileRef = useRef(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     slug: "",
//     category: "",
//     date: "",
//     image: "", // main blog image
//     shortDescription: "",
//     content: "",
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Rich text editor formatting
//   const formatText = (command, value = null) => {
//     document.execCommand(command, false, value);
//     editorRef.current.focus();
//   };

//   // Editor image upload (insert into content)
//   const handleEditorImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const base64 = event.target.result;
//       formatText("insertImage", base64);
//     };
//     reader.readAsDataURL(file);
//   };

//   // Main blog image upload with preview
//   const handleMainImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setFormData({ ...formData, image: event.target.result });
//     };
//     reader.readAsDataURL(file);
//   };

//   // Submit blog to API
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const htmlContent = editorRef.current.innerHTML;
//     const blogData = { ...formData, content: htmlContent };

//     try {
//       const response = await axiosInstance.post("/blogs", blogData);
//       if (response.data.success) {
//         alert("Blog saved successfully!");

//         // Reset form
//         setFormData({
//           title: "",
//           slug: "",
//           category: "",
//           date: "",
//           image: "",
//           shortDescription: "",
//           content: "",
//         });
//         editorRef.current.innerHTML = "";
//       } else {
//         alert(response.data.message || "Failed to save blog");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Server error. Check console.");
//     }
//   };

//   return (
//     <section className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 border shadow">
//         <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Blog</h1>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Text Inputs */}
//           {["title", "slug", "category", "date"].map((field) => (
//             <input
//               key={field}
//               type={field === "date" ? "date" : "text"}
//               name={field}
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//               required={field === "title" || field === "slug"}
//             />
//           ))}

//           {/* Short Description */}
//           <textarea
//             name="shortDescription"
//             placeholder="Short Description"
//             rows="3"
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />

//           {/* Main Blog Image Upload */}
//           <div>
//             <label className="block mb-2 font-medium">Blog Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleMainImageUpload}
//               className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//             {formData.image && (
//               <img
//                 src={formData.image}
//                 alt="Preview"
//                 className="mt-2 w-48 h-auto rounded-lg"
//               />
//             )}
//           </div>

//           {/* Editor Toolbar */}
//           <div className="flex flex-wrap gap-2 border rounded-xl p-3 bg-gray-50">
//             {/* Formatting */}
//             <button type="button" onClick={() => formatText("bold")} className="editor-btn">Bold</button>
//             <button type="button" onClick={() => formatText("italic")} className="editor-btn">Italic</button>
//             <button type="button" onClick={() => formatText("underline")} className="editor-btn">Underline</button>
//             <button type="button" onClick={() => formatText("strikeThrough")} className="editor-btn">Strike</button>

//             {/* Alignment */}
//             <button type="button" onClick={() => formatText("justifyLeft")} className="editor-btn">Left</button>
//             <button type="button" onClick={() => formatText("justifyCenter")} className="editor-btn">Center</button>
//             <button type="button" onClick={() => formatText("justifyRight")} className="editor-btn">Right</button>
//             <button type="button" onClick={() => formatText("justifyFull")} className="editor-btn">Justify</button>

//             {/* Lists */}
//             <button type="button" onClick={() => formatText("insertUnorderedList")} className="editor-btn">• Bullet List</button>
//             <button type="button" onClick={() => formatText("insertOrderedList")} className="editor-btn">1. Numbered List</button>

//             {/* Font & Heading */}
//             <select onChange={(e) => formatText("fontSize", e.target.value)} className="editor-select">
//               <option value="">Font Size</option>
//               <option value="2">Small</option>
//               <option value="3">Normal</option>
//               <option value="5">Large</option>
//               <option value="6">X-Large</option>
//             </select>

//             <select onChange={(e) => formatText("formatBlock", e.target.value)} className="editor-select">
//               <option value="">Heading</option>
//               <option value="h1">H1</option>
//               <option value="h2">H2</option>
//               <option value="h3">H3</option>
//               <option value="p">Paragraph</option>
//             </select>

//             {/* Colors */}
//             <input type="color" title="Text Color" onChange={(e) => formatText("foreColor", e.target.value)} className="w-10 h-8 rounded border"/>
//             <input type="color" title="Highlight" onChange={(e) => formatText("hiliteColor", e.target.value)} className="w-10 h-8 rounded border"/>

//             {/* Links */}
//             <button type="button" onClick={() => { const url = prompt("Enter link URL"); if(url) formatText("createLink", url); }} className="editor-btn">Insert Link</button>

//             {/* Editor Image Upload */}
//             <button type="button" onClick={() => editorFileRef.current.click()} className="editor-btn">Upload Image</button>
//             <input
//               type="file"
//               accept="image/*"
//               ref={editorFileRef}
//               onChange={handleEditorImageUpload}
//               className="hidden"
//             />

//             {/* Undo/Redo/Clear */}
//             <button type="button" onClick={() => formatText("removeFormat")} className="editor-btn">Clear</button>
//             <button type="button" onClick={() => formatText("undo")} className="editor-btn">Undo</button>
//             <button type="button" onClick={() => formatText("redo")} className="editor-btn">Redo</button>
//           </div>

//           {/* Rich Text Editor */}
//           <div
//             ref={editorRef}
//             contentEditable
//             className="min-h-[300px] border border-gray-300 rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//             suppressContentEditableWarning={true}
//             style={{ whiteSpace: "pre-wrap" }}
//           ></div>

//           <button
//             type="submit"
//             className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
//           >
//             Publish Blog
//           </button>
//         </form>
//       </div>

//       <style>
//         {`
//           .editor-btn {
//             padding: 6px 10px;
//             font-weight: 600;
//             border: 1px solid #d1d5db;
//             border-radius: 6px;
//             background: white;
//             cursor: pointer;
//           }
//           .editor-btn:hover { background: #ecfdf5; }
//           .editor-select {
//             padding: 0.25rem 0.5rem;
//             border-radius: 6px;
//             border: 1px solid #d1d5db;
//             cursor: pointer;
//             background: white;
//           }
//           div[contenteditable="true"] ul { list-style-type: disc; padding-left: 1.5rem; }
//           div[contenteditable="true"] ol { list-style-type: decimal; padding-left: 1.5rem; }
//         `}
//       </style>
//     </section>
//   );
// }






import React, { useRef, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export default function AdminAddBlog() {
  const editorRef = useRef(null);
  const editorFileRef = useRef(null);
  const resizeRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    date: "",
    image: "", // main blog image
    shortDescription: "",
    content: "",
  });

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

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Add global mouse events for resizing
    if (isResizing) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', stopResize);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing]);

  // Rich text editor formatting
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  // Handle image click in editor
  const handleImageClick = (e) => {
    const target = e.target;
    
    // Check if clicked element is an image
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

  // Setup image click listener
  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener('click', handleImageClick);
      
      // Also handle for dynamically added images
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

  // Add resize handles to image
  const addResizeHandles = (image) => {
    removeResizeHandles(); // Remove existing handles first
    
    // Create container if it doesn't exist
    let container = image.parentNode;
    if (!container.classList || !container.classList.contains('image-resize-container')) {
      container = document.createElement('div');
      container.className = 'image-resize-container';
      container.style.position = 'relative';
      container.style.display = 'inline-block';
      container.style.lineHeight = '0';
      
      // Wrap image with container
      image.parentNode.insertBefore(container, image);
      container.appendChild(image);
    }
    
    // Create resize handles
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
        border: 2px solid #10b981;
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

  // Remove resize handles
  const removeResizeHandles = () => {
    const handles = document.querySelectorAll('.resize-handle');
    handles.forEach(handle => handle.remove());
    
    // Unwrap image from container if needed
    const containers = document.querySelectorAll('.image-resize-container');
    containers.forEach(container => {
      const image = container.querySelector('img');
      if (image && container.parentNode) {
        container.parentNode.insertBefore(image, container);
        container.remove();
      }
    });
  };

  // Start resize
  const startResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const handle = e.target;
    const direction = handle.getAttribute('data-direction');
    const container = handle.closest('.image-resize-container');
    
    if (!container) return;
    
    const image = container.querySelector('img');
    if (!image) return;
    
    // Store initial values
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStartX(e.clientX);
    setResizeStartY(e.clientY);
    setResizeStartWidth(image.offsetWidth);
    setResizeStartHeight(image.offsetHeight);
    
    // Store image and container in ref for resize function
    resizeRef.current = {
      image,
      container,
      aspectRatio: image.offsetWidth / image.offsetHeight
    };
    
    // Add class to body to prevent text selection during resize
    document.body.style.userSelect = 'none';
  };

  // Handle resize
  const handleResize = (e) => {
    if (!isResizing || !resizeRef.current) return;
    
    e.preventDefault();
    
    const { image, aspectRatio } = resizeRef.current;
    const deltaX = e.clientX - resizeStartX;
    const deltaY = e.clientY - resizeStartY;
    
    let newWidth = resizeStartWidth;
    let newHeight = resizeStartHeight;
    
    // Calculate new dimensions based on direction
    switch(resizeDirection) {
      case 'se': // Bottom-right
        newWidth = Math.max(50, resizeStartWidth + deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : Math.max(50, resizeStartHeight + deltaY);
        break;
      case 'sw': // Bottom-left
        newWidth = Math.max(50, resizeStartWidth - deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : Math.max(50, resizeStartHeight + deltaY);
        break;
      case 'ne': // Top-right
        newWidth = Math.max(50, resizeStartWidth + deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : Math.max(50, resizeStartHeight - deltaY);
        break;
      case 'nw': // Top-left
        newWidth = Math.max(50, resizeStartWidth - deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : Math.max(50, resizeStartHeight - deltaY);
        break;
      case 'e': // Right
        newWidth = Math.max(50, resizeStartWidth + deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : resizeStartHeight;
        break;
      case 'w': // Left
        newWidth = Math.max(50, resizeStartWidth - deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : resizeStartHeight;
        break;
      case 'n': // Top
        newWidth = e.shiftKey ? Math.max(50, (resizeStartHeight - deltaY) * aspectRatio) : resizeStartWidth;
        newHeight = Math.max(50, resizeStartHeight - deltaY);
        break;
      case 's': // Bottom
        newWidth = e.shiftKey ? Math.max(50, (resizeStartHeight + deltaY) * aspectRatio) : resizeStartWidth;
        newHeight = Math.max(50, resizeStartHeight + deltaY);
        break;
    }
    
    // Apply new dimensions
    image.style.width = `${newWidth}px`;
    image.style.height = `${newHeight}px`;
    
    // Remove width/height attributes
    image.removeAttribute('width');
    image.removeAttribute('height');
  };

  // Stop resize
  const stopResize = () => {
    setIsResizing(false);
    resizeRef.current = null;
    document.body.style.userSelect = '';
  };

  // Reset image to original size
  const resetImageSize = () => {
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }
    
    selectedImage.style.width = '';
    selectedImage.style.height = '';
    selectedImage.removeAttribute('width');
    selectedImage.removeAttribute('height');
  };

  // Set image to specific size
  const setImageSize = (width, height) => {
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }
    
    selectedImage.style.width = `${width}px`;
    selectedImage.style.height = `${height}px`;
  };

  // Add link to selected image
  const addLinkToSelectedImage = () => {
    if (!selectedImage) {
      alert("Please click on an image to select it first");
      return;
    }

    // Check if image already has a link
    const parentAnchor = selectedImage.closest('a');
    if (parentAnchor) {
      setLinkUrl(parentAnchor.href || '');
    } else {
      setLinkUrl('');
    }
    
    setShowLinkDialog(true);
  };

  // Handle link submission
  const handleLinkSubmit = () => {
    if (!selectedImage) {
      alert("No image selected");
      setShowLinkDialog(false);
      return;
    }

    if (!linkUrl) {
      alert("Please enter a URL");
      return;
    }

    try {
      // Ensure URL has protocol
      let url = linkUrl;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      const parentAnchor = selectedImage.closest('a');
      
      if (parentAnchor) {
        // Update existing link
        parentAnchor.href = url;
        parentAnchor.target = '_blank';
        parentAnchor.rel = 'noopener noreferrer';
      } else {
        // Remove resize handles and container before wrapping
        removeResizeHandles();
        
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
      
      alert('Link added successfully!');
    } catch (error) {
      console.error('Error adding link:', error);
      alert('Error adding link. Please try again.');
    }

    setShowLinkDialog(false);
    setLinkUrl("");
  };

  // Edit existing image link
  const editImageLink = () => {
    if (!selectedImage) {
      alert("Please click on an image to select it first");
      return;
    }

    const parentAnchor = selectedImage.closest('a');
    if (parentAnchor) {
      setLinkUrl(parentAnchor.href || '');
      setShowLinkDialog(true);
    } else {
      alert("Selected image doesn't have a link. Use 'Add Link to Image' instead.");
    }
  };

  // Remove link from image
  const removeImageLink = () => {
    if (!selectedImage) {
      alert("Please click on an image to select it first");
      return;
    }

    const parentAnchor = selectedImage.closest('a');
    if (parentAnchor) {
      // Remove resize handles first
      removeResizeHandles();
      
      // Replace anchor with just the image
      parentAnchor.parentNode.replaceChild(selectedImage, parentAnchor);
      
      // Keep image selected
      selectedImage.classList.add('selected-image');
      
      alert('Link removed successfully!');
    } else {
      alert("Selected image doesn't have a link to remove");
    }
  };

  // Editor image upload
  const handleEditorImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      
      // Insert image
      formatText("insertImage", base64);
      
      // Small delay to ensure image is inserted
      setTimeout(() => {
        const images = editorRef.current.getElementsByTagName('img');
        if (images.length > 0) {
          const lastImage = images[images.length - 1];
          
          // Remove previous selection
          if (selectedImage) {
            selectedImage.classList.remove('selected-image');
            removeResizeHandles();
          }
          
          // Select the new image
          lastImage.classList.add('selected-image');
          setSelectedImage(lastImage);
          
          // Add click handler
          lastImage.addEventListener('click', handleImageClick);
          
          // Ask if user wants to add link
          if (window.confirm("Do you want to add a link to this image?")) {
            setLinkUrl('');
            setShowLinkDialog(true);
          }
        }
      }, 200);
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

  // Submit blog to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Remove selection class and resize handles before saving
    if (selectedImage) {
      selectedImage.classList.remove('selected-image');
      removeResizeHandles();
    }
    
    const htmlContent = editorRef.current.innerHTML;
    const blogData = { ...formData, content: htmlContent };

    try {
      const response = await axiosInstance.post("/blogs", blogData);
      if (response.data.success) {
        alert("Blog saved successfully!");

        // Reset form
        setFormData({
          title: "",
          slug: "",
          category: "",
          date: "",
          image: "",
          shortDescription: "",
          content: "",
        });
        editorRef.current.innerHTML = "";
        setSelectedImage(null);
      } else {
        alert(response.data.message || "Failed to save blog");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Check console.");
    }
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 border shadow">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Blog</h1>

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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
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
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Apply Link
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Text Inputs */}
          {["title", "slug", "category", "date"].map((field) => (
            <input
              key={field}
              type={field === "date" ? "date" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required={field === "title" || field === "slug"}
            />
          ))}

          {/* Short Description */}
          <textarea
            name="shortDescription"
            placeholder="Short Description"
            rows="3"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Main Blog Image Upload */}
          <div>
            <label className="block mb-2 font-medium">Blog Image</label>
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
                className="mt-2 w-48 h-auto rounded-lg"
              />
            )}
          </div>

          {/* Selected Image Indicator */}
          {selectedImage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
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
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2"
                >
                  <span>🔄</span> Reset to Original
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
              <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                <span className="text-lg">💡</span> Tip: Drag the green circular handles to resize manually. Hold Shift to maintain aspect ratio.
              </p>
            </div>
          )}

          {/* Editor Toolbar */}
          <div className="flex flex-wrap gap-2 border rounded-xl p-3 bg-gray-50">
            {/* Formatting */}
            <button type="button" onClick={() => formatText("bold")} className="editor-btn">Bold</button>
            <button type="button" onClick={() => formatText("italic")} className="editor-btn">Italic</button>
            <button type="button" onClick={() => formatText("underline")} className="editor-btn">Underline</button>
            <button type="button" onClick={() => formatText("strikeThrough")} className="editor-btn">Strike</button>

            {/* Alignment */}
            <button type="button" onClick={() => formatText("justifyLeft")} className="editor-btn">Left</button>
            <button type="button" onClick={() => formatText("justifyCenter")} className="editor-btn">Center</button>
            <button type="button" onClick={() => formatText("justifyRight")} className="editor-btn">Right</button>
            <button type="button" onClick={() => formatText("justifyFull")} className="editor-btn">Justify</button>

            {/* Lists */}
            <button type="button" onClick={() => formatText("insertUnorderedList")} className="editor-btn">• Bullet List</button>
            <button type="button" onClick={() => formatText("insertOrderedList")} className="editor-btn">1. Numbered List</button>

            {/* Font & Heading */}
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

            {/* Colors */}
            <input type="color" title="Text Color" onChange={(e) => formatText("foreColor", e.target.value)} className="w-10 h-8 rounded border"/>
            <input type="color" title="Highlight" onChange={(e) => formatText("hiliteColor", e.target.value)} className="w-10 h-8 rounded border"/>

            {/* Text Links */}
            <button type="button" onClick={() => { const url = prompt("Enter link URL"); if(url) formatText("createLink", url); }} className="editor-btn">Insert Text Link</button>

            {/* Image Upload */}
            <button type="button" onClick={() => editorFileRef.current.click()} className="editor-btn bg-purple-100">📷 Upload Image</button>
            <input
              type="file"
              accept="image/*"
              ref={editorFileRef}
              onChange={handleEditorImageUpload}
              className="hidden"
            />

            {/* Image Link Tools */}
            <div className="w-full border-t-2 border-gray-200 my-2 pt-2">
              <span className="text-sm font-semibold text-gray-600 block mb-2">🔗 Image Link Tools:</span>
              <div className="flex flex-wrap gap-2">
                <button 
                  type="button" 
                  onClick={addLinkToSelectedImage} 
                  className="editor-btn bg-blue-500 text-white hover:bg-blue-600"
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

            {/* Undo/Redo/Clear */}
            <button type="button" onClick={() => formatText("undo")} className="editor-btn">Undo</button>
            <button type="button" onClick={() => formatText("redo")} className="editor-btn">Redo</button>
            <button type="button" onClick={() => formatText("removeFormat")} className="editor-btn">Clear</button>
          </div>

          {/* Rich Text Editor */}
          <div
            ref={editorRef}
            contentEditable
            className="min-h-[400px] border border-gray-300 rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 prose max-w-none"
            suppressContentEditableWarning={true}
            style={{ whiteSpace: "pre-wrap" }}
          ></div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
          >
            Publish Blog
          </button>
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
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .editor-select {
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            border: 1px solid #d1d5db;
            cursor: pointer;
            background: white;
          }
          
          /* Editor Styles */
          div[contenteditable="true"] { 
            min-height: 400px;
            outline: none;
            cursor: text;
          }
          
          div[contenteditable="true"] ul, 
          div[contenteditable="true"] ol { 
            padding-left: 2rem; 
            margin: 0.5rem 0;
          }
          
          div[contenteditable="true"] ul { 
            list-style-type: disc; 
          }
          
          div[contenteditable="true"] ol { 
            list-style-type: decimal; 
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
          
          div[contenteditable="true"] p {
            margin: 0.5rem 0;
          }
          
          div[contenteditable="true"] a { 
            color: #2563eb; 
            text-decoration: underline; 
            cursor: pointer;
          }
          
          div[contenteditable="true"] a:hover {
            color: #1d4ed8;
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
            border: 3px solid #3b82f6;
            opacity: 0.9;
          }
          
          div[contenteditable="true"] img.selected-image {
            border: 3px solid #10b981;
            box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
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
            border: 2px solid #10b981;
            border-radius: 50%;
            z-index: 1000;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            transition: all 0.2s;
          }
          
          .resize-handle:hover {
            background: #10b981;
            transform: scale(1.2);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
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
            border: 3px solid #2563eb;
            opacity: 0.8;
          }
        `}
      </style>
    </section>
  );
}