"use client";

import React, { useEffect, useState } from 'react';
import { Eye, Share2 } from 'lucide-react';
import Image from 'next/image';

export default function BlogShareAndViews({ title, author }) {
  const [viewsCount, setViewsCount] = useState(250);

  useEffect(() => {
    const randomViews = Math.floor(Math.random() * (980 - 150 + 1)) + 150;
    setViewsCount(randomViews);
  }, []);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({ title, url: window.location.href }).catch(() => {});
    } else if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs sm:text-sm text-gray-300">
      <div className="space-y-1">
        <div className="font-semibold text-white">
          By <span className="text-gray-200">{author}</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400 font-mono text-xs">
          <span className="flex items-center gap-1.5">
            <Eye size={13} className="text-gray-400" />
            {viewsCount.toLocaleString()} Views
          </span>
        </div>
      </div>

      {/* Actions: Google Preferences Source & Share Button */}
      <div className="flex items-center gap-2.5">
        <a
          href="https://www.google.com/preferences/source?q=digitalorra.com"
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 px-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-all duration-300 shadow-sm hover:scale-105"
          title="Follow Digital ORRA on Google"
          aria-label="Google Preferences Source"
        >
          <Image
            src="/Logo_google.png"
            alt="Google"
            width={18}
            height={18}
            className="w-4 h-4 object-contain"
          />
          <span className="hidden sm:inline-block">Google Source</span>
        </a>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="w-10 h-10 rounded-full bg-white text-black hover:bg-pink-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 cursor-pointer"
          title="Share this article"
          aria-label="Share article"
        >
          <Share2 size={16} />
        </button>
      </div>
    </div>
  );
}
