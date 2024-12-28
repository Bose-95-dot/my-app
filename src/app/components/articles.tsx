// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck 
'use client';

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Articles() {
    const [articlesData, setArticlesData] = useState([]);
    const carouselRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://untitled-twkmuar27a-uc.a.run.app/api',
        headers: {
            Authorization: 'Token 97848e8babeb149f26a044838f1fcb6f52d60e7b',
        },
    };
    const router = useRouter();

    const handleClick = () => {
        router.push('/destination_page');
    };

    useEffect(() => {
        axios(config)
            .then((response) => {
                setArticlesData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft.current = carouselRef.current.scrollLeft;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;

        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = x - startX.current; // Distance moved
        carouselRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };


    const handleMouseLeave = () => {
        isDragging.current = false;
    };

    return (
        <div
            ref={carouselRef}
            className="w-full h-auto overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex gap-4">
                {articlesData.map((article) => (
                    <div
                        onClick={handleClick}
                        className="flex-none w-100 h-120 bg-gray-100 rounded-lg shadow-md"
                        key={article?.id}
                    >
                        <Image
                            width={500}
                            height={320}
                            src={article?.image_url}
                            alt={article.title || 'Article Image'}
                            className="rounded-t-lg object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold truncate">
                                {article.title || 'Untitled'}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">
                                {article.description || 'No description available.'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Articles;
