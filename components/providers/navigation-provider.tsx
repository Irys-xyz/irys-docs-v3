'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface NavigationContextType {
    // Mobile menu state
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;

    // Accordion state
    activeAccordionItems: string[];
    setActiveAccordionItems: (items: string[]) => void;

    // Scroll position
    scrollPosition: number;
    setScrollPosition: (position: number) => void;
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const ACCORDION_STORAGE_KEY = 'irys-docs-accordion-state';
const SCROLL_STORAGE_KEY = 'irys-docs-scroll-position';

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeAccordionItems, setActiveAccordionItems] = useState<string[]>([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    // Initialize accordion state from localStorage on mount
    useEffect(() => {
        try {
            const savedState = localStorage.getItem(ACCORDION_STORAGE_KEY);
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                setActiveAccordionItems(parsedState);
            }
        } catch (error) {
            console.error('Failed to load accordion state from localStorage:', error);
        }
    }, []);

    // Initialize scroll position from localStorage on mount
    useEffect(() => {
        try {
            const savedScrollPosition = localStorage.getItem(SCROLL_STORAGE_KEY);
            if (savedScrollPosition) {
                const position = parseInt(savedScrollPosition, 10);
                setScrollPosition(position);
            }
        } catch (error) {
            console.error('Failed to load scroll position from localStorage:', error);
        }
    }, []);

    // Save accordion state to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(ACCORDION_STORAGE_KEY, JSON.stringify(activeAccordionItems));
        } catch (error) {
            console.error('Failed to save accordion state to localStorage:', error);
        }
    }, [activeAccordionItems]);

    // Save scroll position to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(SCROLL_STORAGE_KEY, scrollPosition.toString());
        } catch (error) {
            console.error('Failed to save scroll position to localStorage:', error);
        }
    }, [scrollPosition]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Add current path items to accordion without removing existing ones
    useEffect(() => {
        const pathParts = pathname.split('/').filter(Boolean);
        const currentPathItems = pathParts.reduce((acc: string[], part, index) => {
            if (index === 0) return acc;
            const path = pathParts.slice(1, index + 1).join('/');
            return [...acc, path];
        }, []);

        // Merge current path items with existing ones, avoiding duplicates
        setActiveAccordionItems(prevItems => {
            const newItems = [...new Set([...prevItems, ...currentPathItems])];
            return newItems;
        });
    }, [pathname]);

    // Control body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

    return (
        <NavigationContext.Provider
            value={{
                isMobileMenuOpen,
                setIsMobileMenuOpen,
                activeAccordionItems,
                setActiveAccordionItems,
                scrollPosition,
                setScrollPosition,
                scrollContainerRef,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    const context = useContext(NavigationContext);
    if (context === undefined) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
} 