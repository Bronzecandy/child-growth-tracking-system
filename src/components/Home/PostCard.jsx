import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const PostCard = ({ post }) => {
    if (!post) {
        return null;
    }

    const {
        _id: id,
        title,
        thumbnailUrl,
    } = post;

    return (
        <Link to={`/posts/${id}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 h-64 flex flex-col">
                {/* Thumbnail - takes 70% of the card height */}
                <div className="h-3/4 overflow-hidden">
                    {thumbnailUrl ? (
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300?text=No+Image';
                            }}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                        </div>
                    )}
                </div>

                {/* Title - takes remaining 30% of height */}
                <div className="p-3 h-1/4 flex flex-col justify-between">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm">{title}</h3>
                    <div className="flex items-center justify-end mt-1">
                        <FaEye className="text-gray-500 mr-1" size={14} />
                        <span className="text-xs text-gray-500">View details</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;