import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { cartfn } from "@/lib/api";
import { toast, Toaster } from "sonner";

// Define font configuration with actual CSS class names
const fonts = [
  { name: "brittany", displayName: "Brittany Signature" },
  { name: "ShadowIL", displayName: "Shadow Into Light" },
  { name: "Neoneon", displayName: "Neoneon" },
  { name: "Moon Time", displayName: "Moon Time" },
  { name: "twister", displayName: "Twister" },
  { name: "Meow Script", displayName: "Meow Script" },
];

const sizes = [
  { name: "Small", value: "2rem", price: 1200 },
  { name: "Medium", value: "3rem", price: 2200 },
  { name: "Large", value: "4rem", price: 3300 },
];

const colors = [
  { name: "Blue", value: "#0077be" },
  { name: "Red", value: "#ff0000" },
  { name: "Green", value: "#00ff00" },
  { name: "Yellow", value: "#ffff00" },
  { name: "Pink", value: "#ff69b4" },
  { name: "Purple", value: "#8a2be2" },
];

const Customize = () => {
  const [text, setText] = useState("Your Text Here");
  const [imageBlob, setImageBlob] = useState(null);
  const [font, setFont] = useState({
    name: "brittany",
    displayName: "Brittany Signature", // Removed quotes around the class name
  });
  const [size, setSize] = useState({ name: "Medium", value: "3rem" }); // Added default size
  const [color, setColor] = useState({ name: "Blue", value: "#0077be" });
  const [price, setPrice] = useState(2200);
  const captureRef = useRef(null);

  const handleSize = (size) => {
    setSize(size);
    setPrice(size.price);
  };

  const handleFontChange = (font) => {
    setFont(font);
  };

  const handleCapture = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
        logging: true,
      });

      // Convert canvas to blob
      const blob = await (await fetch(canvas.toDataURL())).blob();
      setImageBlob(blob);
    }
  };

  useEffect(() => {
    handleCapture();
  }, [text, font, size, color]);

  const handleAddToCart = async () => {
    if (!text || !font.name || !size.name || !color.name) {
      alert("Please complete all customization options before adding to cart");
      return;
    }

    // Ensure imageBlob exists
    if (!imageBlob) {
      alert("Please wait for the image to be captured");
      return;
    }

    const formData = new FormData();

    // Append blob with a filename
    formData.append("imageUrl", imageBlob, "screenshot.png");

    // Add other form fields
    formData.append("text", text);
    formData.append("font", font.name);
    formData.append("size", size.name);
    formData.append("color", color.name);
    formData.append("price", price);

    try {
      const res = await cartfn(formData);

      // Optionally add success handling
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8">
      <Toaster richColors />
      <h1 className=" my-6 p-3 text-5xl font-bold mb-8 text-center neon-text font-Neoneon">
        Customize Your Neon Sign
      </h1>
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div
            ref={captureRef}
            className="bg-gray-900 p-6 rounded-lg flex items-center justify-center"
            style={{ height: "300px", minHeight: "300px" }}
          >
            <div
              className={`
            
                transition-all duration-300
              `}
              style={{
                fontFamily: font.name, // Use font.value for actual font family
                fontSize: `clamp(${size?.value}, 5vw, ${size?.value})`,
                color: color?.value || "#ffffff", // Ensure a bright color for neon effect
                textShadow: `
                  0 0 7px ${color?.value}, 
                  0 0 10px ${color?.value}, 
                  0 0 21px ${color?.value}, 
                  0 0 42px ${color?.value}, 
                  0 0 82px ${color?.value}, 
                  0 0 92px ${color?.value}, 
                  0 0 102px ${color?.value}
                `,
                // Add a slight glow effect
                filter: "brightness(1.5)",
                // Increase opacity for better visibility
                opacity: 0.9,
              }}
            >
              {text}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-gray-900 p-4 sm:p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Customization Options</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="text-input">Your Text</Label>
              <Input
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label>Font Style</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                {fonts.map((s) => (
                  <Button
                    key={s.name}
                    variant={font.name === s.name ? "default" : "secondary"}
                    size="lg"
                    style={{ fontFamily: s.name }}
                    className={`transition-all duration-300 font-bold`}
                    onClick={() => handleFontChange(s)}
                  >
                    {s.displayName}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label>Size</Label>
              <div className="flex items-center space-x-2">
                {sizes.map((s) => (
                  <div key={s.name}>
                    <Button
                      variant={size.name === s.name ? "default" : "secondary"}
                      size="sm"
                      className="font-semibold"
                      onClick={() => handleSize(s)}
                    >
                      {s.name}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2 mt-2 justify-between sm:justify-start">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full ${
                      color.name === c.name ? "ring-2 ring-white" : ""
                    }`}
                    style={{ backgroundColor: c.value }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              className="w-full"
              variant="secondary"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
