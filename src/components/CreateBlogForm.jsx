import React, { useState, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const quill = new Quill("#editor", {
      modules: {
        toolbar: "#toolbar",
      },
      theme: "snow",
    });

    quill.on("text-change", () => {
      setContent(quill.root.innerHTML);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, content });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-lg rounded-md w-[600px]">
        <h2 className="text-2xl font-bold text-center mb-4">Share Your Blog</h2>
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Custom Quill Toolbar */}
          <div id="toolbar" className="mb-2 border p-2 bg-gray-100">
            {/* Font Style */}
            <select className="ql-font">
              <option value="sans-serif">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>

            {/* Custom Numeric Font Size */}
            <select className="ql-size">
              <option value="10px">10</option>
              <option value="12px" selected>12</option>
              <option value="14px">14</option>
              <option value="16px">16</option>
              <option value="18px">18</option>
              <option value="20px">20</option>
              <option value="24px">24</option>
              <option value="28px">28</option>
              <option value="32px">32</option>
            </select>

            {/* Bold, Italic, Underline, Strikethrough */}
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
            <button className="ql-strike"></button>

            {/* Font Color & Background */}
            <button className="ql-color"></button>
            <button className="ql-background"></button>

            {/* Lists (Ordered & Unordered) */}
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>

            {/* Alignment */}
            <button className="ql-align" value=""></button>
            <button className="ql-align" value="center"></button>
            <button className="ql-align" value="right"></button>
            <button className="ql-align" value="justify"></button>

            {/* Link & Image Upload */}
            <button className="ql-link"></button>
            <button className="ql-image"></button>
          </div>

          {/* Quill Editor */}
          <div id="editor" className="border p-3 min-h-[200px] bg-white rounded"></div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-b from-gray-800 to-black text-white font-semibold rounded hover:opacity-90 transition mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogForm;
