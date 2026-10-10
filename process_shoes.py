import os
import requests
from rembg import remove
from PIL import Image
from io import BytesIO

# Dress shoe URLs from Unsplash
shoes = [
    # Featured products
    "https://images.unsplash.com/photo-1614252235316-0901a88bb3e9?auto=format&fit=crop&q=80&w=400", # 1.png - Black oxford
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614c3a?auto=format&fit=crop&q=80&w=400", # 2.png - Brown oxford
    "https://images.unsplash.com/photo-1505881503390-a91599587de5?auto=format&fit=crop&q=80&w=400", # 3.png - Elegant leather
    "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=400", # 4.png - Classic black
    # Best sellers
    "https://images.unsplash.com/photo-1603565022512-ab7e37d57fb3?auto=format&fit=crop&q=80&w=400", # 5.png - Sleek formal
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400", # 6.png - Leather brogue
    "https://images.unsplash.com/photo-1588607147711-2d7c0f1b2df9?auto=format&fit=crop&q=80&w=400", # 7.png - Polished shoes
    # Hero image
    "https://images.unsplash.com/photo-1550171394-4ba2dd6139c2?auto=format&fit=crop&q=80&w=800"  # hero.png - Nice composition
]

out_dir = "public/shoes"
os.makedirs(out_dir, exist_ok=True)

for i, url in enumerate(shoes):
    filename = "hero.png" if i == 7 else f"{i+1}.png"
    out_path = os.path.join(out_dir, filename)
    
    print(f"Downloading {filename}...")
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        print(f"Removing background for {filename}...")
        input_image = Image.open(BytesIO(response.content))
        
        # Convert to RGBA if not already
        input_image = input_image.convert("RGBA")
        
        # remove background
        output_image = remove(input_image)
        
        # save as png to preserve transparency
        output_image.save(out_path)
        print(f"Saved {out_path}")
    else:
        print(f"Failed to download {url}")

print("Done processing images!")
