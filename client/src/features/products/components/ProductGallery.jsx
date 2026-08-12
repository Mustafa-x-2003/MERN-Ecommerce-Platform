import { memo, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

 function ProductGallery({ images = [], loading = false }) {
  const [selectedImage, setSelectedImage] = useState(images[0] || null);

  // Keep selected image synchronized when product/images change
  useEffect(() => {
    setSelectedImage(images[0] || null);
  }, [images]);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-[80px_1fr]">
        <div className="order-2 flex gap-3 overflow-hidden md:order-1 md:flex-col">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-20 w-20 shrink-0 animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>

        <div className="order-1 aspect-square animate-pulse rounded-2xl bg-muted md:order-2" />
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border bg-muted/30">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <ImageOff size={48} strokeWidth={1.5} />
          <span>No image available</span>
        </div>
      </div>
    );
  }

  const currentIndex = images.indexOf(selectedImage);

  const handlePrevious = () => {
    const previousIndex =
      currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    setSelectedImage(images[previousIndex]);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

    setSelectedImage(images[nextIndex]);
  };

  return (
    <div className="grid gap-4 md:grid-cols-[80px_1fr]">
      {/* Thumbnails */}
      {images.length > 0 && (
        <div className="order-2 flex gap-3 overflow-x-auto pb-1 md:order-1 md:flex-col md:overflow-x-visible md:overflow-y-auto">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-muted transition-all",
                selectedImage === image
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-border",
              )}
              aria-label={`View product image ${index + 1}`}
              aria-current={selectedImage === image}
            >
              <img
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="group relative order-1 aspect-square overflow-hidden rounded-2xl border bg-muted/20 md:order-2">
        <img
          src={selectedImage}
          alt="Product"
          className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105 sm:p-10"
        />

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={handlePrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full opacity-90 shadow-md transition-opacity md:opacity-0 md:group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full opacity-90 shadow-md transition-opacity md:opacity-0 md:group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </Button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium shadow backdrop-blur">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}
export default memo(ProductGallery)