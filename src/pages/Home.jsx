import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import PostCard from "../components/Home/PostCard";
import postService from "../services/postService";
import { toast } from "react-toastify";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const scrollContainerRef = useRef(null);

  // For mouse drag scrolling
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await postService.getPosts(page);

        // Based on the API response structure you provided
        setPosts(response.posts || []);
        setTotalPages(response.totalPage || 1);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const loadMorePosts = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // Mouse drag scrolling functions
  const handleMouseDown = (e) => {
    if (scrollContainerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
      // Change cursor to grabbing
      scrollContainerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      // Reset cursor
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = 'grab';
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    if (scrollContainerRef.current) {
      e.preventDefault();
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Multiplier for scroll speed
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div>
      {/* Featured Posts Section */}
      <section className="my-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Posts</h2>
            <div className="flex space-x-2">
              <button
                onClick={handleScrollLeft}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={handleScrollRight}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-4 hide-scrollbar cursor-grab"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              >
                <div className="flex space-x-4 px-1">
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      className="flex-shrink-0"
                      // Prevent drag from interfering with card click
                      onClick={(e) => {
                        if (isDragging) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                    >
                      <PostCard post={post} />
                    </div>
                  ))}
                  {posts.length === 0 && (
                    <div className="flex items-center justify-center w-64 h-64 bg-gray-100 rounded-lg">
                      <p className="text-gray-500">No posts available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {!loading && posts.length > 0 && page < totalPages && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMorePosts}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;