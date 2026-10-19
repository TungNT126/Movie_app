import { useEffect } from "react";

export function useClickOutside(ref: React.RefObject<HTMLDivElement | null>, handler: () => void, enabled: boolean) {
    useEffect(() => {
        if (!enabled) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, handler, enabled])
}