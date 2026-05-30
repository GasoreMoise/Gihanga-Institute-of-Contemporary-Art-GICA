'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface TalkVideoPlayerProps {
    youtubeId: string;
}

export default function TalkVideoPlayer({ youtubeId }: TalkVideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="w-full h-full bg-[#0a1116] animate-pulse" />;
    }

    return (
        <div className="relative w-full h-full group">
            {!isPlaying ? (
                <div
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => setIsPlaying(true)}
                >
                    <Image
                        src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                        alt="Watch Session Recording"
                        fill
                        unoptimized
                        className="object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500 text-white">
                            <Play fill="currentColor" className="w-6 h-6 ml-1" />
                        </div>
                    </div>
                    <div className="absolute bottom-6 left-6">
                        <p className="text-[9px] tracking-[0.4em] uppercase text-white/60 font-bold">Watch Full Recording</p>
                    </div>
                </div>
            ) : (
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`}
                    title="Institutional Talk Recording"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0 z-50 shadow-inner"
                ></iframe>
            )}
        </div>
    );
}