import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScrollCarouselProps {
  children: React.ReactNode;
}

const SCROLL_AMOUNT = 600;

const ScrollCarousel = ({ children }: ScrollCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group">
      <Button
        variant="secondary"
        size="icon"
        onClick={() => scroll("left")}
        aria-label="Rolar para a esquerda"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <div ref={scrollRef} className="genre-scroll">
        {children}
      </div>

      <Button
        variant="secondary"
        size="icon"
        onClick={() => scroll("right")}
        aria-label="Rolar para a direita"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ScrollCarousel;
