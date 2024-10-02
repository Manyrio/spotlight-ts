"use client"
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

const LoadingBar = () => {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const startLoading = () => {
        setLoading(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 90 ? prev + 10 : prev));
        }, 100);
        return () => clearInterval(interval);
    };

    const stopLoading = () => {
        setLoading(false);
        setProgress(100);
        setTimeout(() => setProgress(0), 300); // Reset after animation completes
    };

    const handleNavigation = (url: string) => {
        startLoading();
        startTransition(() => {
            router.push(url);
        });
        stopLoading();
    };

    return (
        <>
            {loading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        height: '4px',
                        backgroundColor: '#29d',
                        width: `${progress}%`,
                        transition: 'width 0.2s ease',
                        zIndex: 9999,
                    }}
                ></div>
            )}
        </>
    );
};

export default LoadingBar;
