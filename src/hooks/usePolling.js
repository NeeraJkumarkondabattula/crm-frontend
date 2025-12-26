import { useEffect, useRef } from "react";

export default function usePolling(fn, interval = 5000, deps = []) {
    const running = useRef(false);

    useEffect(() => {
        let timer;

        const tick = async () => {
            if (running.current) return;
            running.current = true;
            try {
                await fn();
            } finally {
                running.current = false;
            }
        };

        tick();
        timer = setInterval(tick, interval);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
