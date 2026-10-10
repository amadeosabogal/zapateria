import os
from rembg import remove
from PIL import Image

in_files = [
    r"C:\Users\LENOVO\.gemini\antigravity-ide\brain\252808b4-0ee3-4897-89f5-6f2912d49f26\dress_shoe_1_1791610339312.jpg",
    r"C:\Users\LENOVO\.gemini\antigravity-ide\brain\252808b4-0ee3-4897-89f5-6f2912d49f26\dress_shoe_2_1791610349546.jpg",
    r"C:\Users\LENOVO\.gemini\antigravity-ide\brain\252808b4-0ee3-4897-89f5-6f2912d49f26\dress_shoe_3_1791610360808.jpg",
    r"C:\Users\LENOVO\.gemini\antigravity-ide\brain\252808b4-0ee3-4897-89f5-6f2912d49f26\dress_shoe_4_1791610371161.jpg",
]

out_dir = "public/shoes"
os.makedirs(out_dir, exist_ok=True)

# Mapping 8 outputs to the 4 inputs we generated
outputs = [
    "1.png", "2.png", "3.png", "4.png", 
    "5.png", "6.png", "7.png", "hero.png"
]

for i, out_name in enumerate(outputs):
    in_file = in_files[i % 4]
    out_path = os.path.join(out_dir, out_name)
    
    print(f"Processing {out_name} from {os.path.basename(in_file)}...")
    input_image = Image.open(in_file).convert("RGBA")
    output_image = remove(input_image)
    output_image.save(out_path)
    print(f"Saved {out_path}")

print("Done processing local images!")
