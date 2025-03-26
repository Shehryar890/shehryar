const fs = require('fs');
const path = require('path');


let womenProducts = [
  {
    "name": "Cozy Knit Hoodie",
    "price": 39.99,
    "rating": 4.7,
    "color": "Gray",
    "instock": true,
    "description": "Warm and comfortable knit hoodie, perfect for chilly days.",
    "category": "Women",
    "subcategory": "Hoodie",
    "size": "Medium",
    "brand": "ComfyWear",
    "image": "https://example.com/images/cozy_knit_hoodie.jpg",
    "details": "Made from soft, breathable fabric. Great for layering during cold weather.",
    "material": "Cotton blend",
    "careInstructions": "Machine washable"
  },
  {
    "name": "Classic Denim Jacket",
    "price": 49.99,
    "rating": 4.8,
    "color": "Blue",
    "instock": true,
    "description": "A classic denim jacket that pairs well with any outfit.",
    "category": "Women",
    "subcategory": "Jacket",
    "size": "Large",
    "brand": "StyleDenim",
    "image": "https://example.com/images/classic_denim_jacket.jpg",
    "details": "Stylish and versatile, perfect for casual wear.",
    "material": "100% Cotton",
    "careInstructions": "Hand wash recommended"
  },
  {
    "name": "Elegant Pencil Skirt",
    "price": 29.99,
    "rating": 4.5,
    "color": "Black",
    "instock": true,
    "description": "Sleek pencil skirt ideal for office wear and formal occasions.",
    "category": "Women",
    "subcategory": "Skirt",
    "size": "Small",
    "brand": "ChicOffice",
    "image": "https://example.com/images/elegant_pencil_skirt.jpg",
    "details": "High-waisted with a tailored fit. Comfortable and stretchy.",
    "material": "Polyester blend",
    "careInstructions": "Dry clean only"
  },
  {
    "name": "Casual Fleece Hoodie",
    "price": 34.99,
    "rating": 4.6,
    "color": "Pink",
    "instock": true,
    "description": "Soft fleece hoodie for everyday comfort and warmth.",
    "category": "Women",
    "subcategory": "Hoodie",
    "size": "Extra Large",
    "brand": "EverydayFit",
    "image": "https://example.com/images/casual_fleece_hoodie.jpg",
    "details": "Cozy fleece-lined interior with a front pocket.",
    "material": "Fleece",
    "careInstructions": "Machine washable"
  },
  {
    "name": "Boho Maxi Skirt",
    "price": 24.99,
    "rating": 4.3,
    "color": "Floral",
    "instock": true,
    "description": "Flowy maxi skirt with a bohemian floral print.",
    "category": "Women",
    "subcategory": "Skirt",
    "size": "One Size",
    "brand": "BohoStyle",
    "image": "https://example.com/images/boho_maxi_skirt.jpg",
    "details": "Lightweight and comfortable with an elastic waistband.",
    "material": "Rayon",
    "careInstructions": "Hand wash only"
  },
  {
    "name": "Winter Warm Sweater",
    "price": 59.99,
    "rating": 4.9,
    "color": "Cream",
    "instock": true,
    "description": "Cozy sweater to keep you warm all winter.",
    "category": "Women",
    "subcategory": "Sweater",
    "size": "Large",
    "brand": "WarmHug",
    "image": "https://example.com/images/winter_warm_sweater.jpg",
    "details": "Thick knit with a relaxed fit and stylish turtleneck.",
    "material": "Wool blend",
    "careInstructions": "Dry clean only"
  },
  {
    "name": "Sporty Zip-Up Jacket",
    "price": 45.99,
    "rating": 4.4,
    "color": "Black",
    "instock": true,
    "description": "Lightweight and sporty zip-up jacket.",
    "category": "Women",
    "subcategory": "Jacket",
    "size": "Medium",
    "brand": "ActiveWear",
    "image": "https://example.com/images/sporty_zip_up_jacket.jpg",
    "details": "Breathable material with zip pockets and a hood.",
    "material": "Polyester",
    "careInstructions": "Machine washable"
  },
  {
    "name": "Comfy Casual Sweater",
    "price": 37.99,
    "rating": 4.5,
    "color": "Beige",
    "instock": true,
    "description": "Casual sweater perfect for lounging or running errands.",
    "category": "Women",
    "subcategory": "Sweater",
    "size": "Small",
    "brand": "SoftKnits",
    "image": "https://example.com/images/comfy_casual_sweater.jpg",
    "details": "Soft and lightweight with a relaxed fit.",
    "material": "Cotton",
    "careInstructions": "Machine washable"
  },
  {
    "name": "Floral Skater Skirt",
    "price": 22.99,
    "rating": 4.3,
    "color": "Navy",
    "instock": true,
    "description": "Skater skirt with a fun floral print.",
    "category": "Women",
    "subcategory": "Skirt",
    "size": "Medium",
    "brand": "FloraTrend",
    "image": "https://example.com/images/floral_skater_skirt.jpg",
    "details": "Flared design with an elastic waistband.",
    "material": "Polyester blend",
    "careInstructions": "Machine washable"
  },
  {
    "name": "Elegant Cardigan Sweater",
    "price": 49.99,
    "rating": 4.6,
    "color": "Wine Red",
    "instock": true,
    "description": "Elegant open-front cardigan sweater.",
    "category": "Women",
    "subcategory": "Sweater",
    "size": "Large",
    "brand": "ClassicCharm",
    "image": "https://example.com/images/elegant_cardigan_sweater.jpg",
    "details": "Soft knit with ribbed cuffs and hem.",
    "material": "Acrylic blend",
    "careInstructions": "Hand wash recommended"
  },
 
    {
      "name": "Soft Lounge Pants",
      "price": 25.99,
      "rating": 4.7,
      "color": "Charcoal",
      "instock": true,
      "description": "Comfortable and stylish lounge pants.",
      "category": "Women",
      "subcategory": "Pants",
      "size": "Large",
      "brand": "LoungeLife",
      "image": "https://example.com/images/soft_lounge_pants.jpg",
      "details": "Elastic waistband with drawstring for an adjustable fit.",
      "material": "Cotton blend",
      "careInstructions": "Machine washable"
    },
    {
      "name": "Elegant Blazer",
      "price": 69.99,
      "rating": 4.8,
      "color": "Navy Blue",
      "instock": true,
      "description": "Professional blazer for business or formal occasions.",
      "category": "Women",
      "subcategory": "Blazer",
      "size": "Medium",
      "brand": "ProStyle",
      "image": "https://example.com/images/elegant_blazer.jpg",
      "details": "Tailored fit with a single button closure.",
      "material": "Polyester",
      "careInstructions": "Dry clean only"
    },
    {
      "name": "Classic Striped T-Shirt",
      "price": 19.99,
      "rating": 4.3,
      "color": "White/Black",
      "instock": true,
      "description": "Classic striped t-shirt for a casual look.",
      "category": "Women",
      "subcategory": "T-Shirt",
      "size": "Small",
      "brand": "EasyWear",
      "image": "https://example.com/images/classic_striped_tshirt.jpg",
      "details": "Soft and comfortable for all-day wear.",
      "material": "100% Cotton",
      "careInstructions": "Machine washable"
    },
    {
      "name": "Boho Floral Dress",
      "price": 39.99,
      "rating": 4.5,
      "color": "Multicolor",
      "instock": true,
      "description": "Bohemian style floral dress, perfect for summer.",
      "category": "Women",
      "subcategory": "Dress",
      "size": "Medium",
      "brand": "BohoVibes",
      "image": "https://example.com/images/boho_floral_dress.jpg",
      "details": "Flowy and lightweight with a comfortable fit.",
      "material": "Rayon",
      "careInstructions": "Hand wash recommended"
    },
    {
      "name": "Winter Puffer Jacket",
      "price": 89.99,
      "rating": 4.9,
      "color": "Olive Green",
      "instock": true,
      "description": "Warm puffer jacket for cold weather.",
      "category": "Women",
      "subcategory": "Jacket",
      "size": "Extra Large",
      "brand": "CozyWarm",
      "image": "https://example.com/images/winter_puffer_jacket.jpg",
      "details": "Water-resistant with a hood and zip closure.",
      "material": "Nylon",
      "careInstructions": "Machine washable"
    },
    {
      "name": "Casual V-Neck Sweater",
      "price": 34.99,
      "rating": 4.4,
      "color": "Dusty Rose",
      "instock": true,
      "description": "V-neck sweater, a staple for casual outfits.",
      "category": "Women",
      "subcategory": "Sweater",
      "size": "Large",
      "brand": "ClassicComfort",
      "image": "https://example.com/images/casual_vneck_sweater.jpg",
      "details": "Ribbed cuffs and hem for added style.",
      "material": "Acrylic blend",
      "careInstructions": "Machine washable"
    },
    {
      "name": "Sporty Leggings",
      "price": 29.99,
      "rating": 4.6,
      "color": "Black",
      "instock": true,
      "description": "High-waisted leggings for workouts or casual wear.",
      "category": "Women",
      "subcategory": "Leggings",
      "size": "Small",
      "brand": "FitFlex",
      "image": "https://example.com/images/sporty_leggings.jpg",
      "details": "Stretchy and breathable fabric with moisture-wicking technology.",
      "material": "Spandex blend",
      "careInstructions": "Machine washable"
    },
    {
      "name": "Faux Leather Jacket",
      "price": 59.99,
      "rating": 4.7,
      "color": "Black",
      "instock": true,
      "description": "Trendy faux leather jacket with zip details.",
      "category": "Women",
      "subcategory": "Jacket",
      "size": "Medium",
      "brand": "UrbanEdge",
      "image": "https://example.com/images/faux_leather_jacket.jpg",
      "details": "Fitted style with zippered pockets.",
      "material": "Faux leather",
      "careInstructions": "Spot clean only"
    },
    {
      "name": "Fluffy Knit Cardigan",
      "price": 44.99,
      "rating": 4.5,
      "color": "Beige",
      "instock": true,
      "description": "Warm and fluffy knit cardigan for cozy days.",
      "category": "Women",
      "subcategory": "Cardigan",
      "size": "Small",
      "brand": "CozyDays",
      "image": "https://example.com/images/fluffy_knit_cardigan.jpg",
      "details": "Soft and oversized for a relaxed fit.",
      "material": "Polyester blend",
      "careInstructions": "Hand wash only"
    },
    {
      "name": "High-Waisted Shorts",
      "price": 24.99,
      "rating": 4.2,
      "color": "Light Blue",
      "instock": true,
      "description": "Classic high-waisted shorts, great for summer.",
      "category": "Women",
      "subcategory": "Shorts",
      "size": "Medium",
      "brand": "SunnyDays",
      "image": "https://example.com/images/high_waisted_shorts.jpg",
      "details": "Soft denim with a slight stretch for comfort.",
      "material": "Cotton blend",
      "careInstructions": "Machine washable"
    },
    {
      "name": "Oversized Graphic Tee",
      "price": 19.99,
      "rating": 4.3,
      "color": "White",
      "instock": true,
      "description": "Trendy oversized t-shirt with a graphic print.",
      "category": "Women",
      "subcategory": "T-Shirt",
      "size": "Large",
      "brand": "UrbanTrends",
      "image": "https://example.com/images/oversized_graphic_tee.jpg",
      "details": "Lightweight and loose fit, ideal for street style.",
      "material": "100% Cotton",
      "careInstructions": "Machine washable"
    },
    {
      "name": "Classic Knit Scarf",
      "price": 19.99,
      "rating": 4.8,
      "color": "Cream",
      "instock": true,
      "description": "Soft knit scarf to keep you warm and stylish.",
      "category": "Women",
      "subcategory": "Scarf",
      "size": "One Size",
      "brand": "CozyKnits",
      "image": "https://example.com/images/classic_knit_scarf.jpg",
      "details": "Long and thick, perfect for winter.",
      "material": "Acrylic",
      "careInstructions": "Hand wash only"
    },
    {
      "name": "Polka Dot Blouse",
      "price": 27.99,
      "rating": 4.5,
      "color": "White/Black",
      "instock": true,
      "description": "Chic blouse with a playful polka dot print.",
      "category": "Women",
      "subcategory": "Blouse",
      "size": "Medium",
      "brand": "PrettyPrints",
      "image": "https://example.com/images/polka_dot_blouse.jpg",
      "details": "Flowy fabric with a relaxed fit.",
      "material": "Polyester",
      "careInstructions": "Machine washable"
    },
    {
      "name": "Ribbed Tank Top",
      "price": 14.99,
      "rating": 4.4,
      "color": "Olive",
      "instock": true,
      "description": "Versatile ribbed tank top for layering or wearing alone.",
      "category": "Women",
      "subcategory": "Tank Top",
      "size": "Small",
      "brand": "BasicEssentials",
      "image": "https://example.com/images/ribbed_tank_top.jpg",
      "details": "Stretchy and comfortable with a snug fit.",
      "material": "Cotton blend",
      "careInstructions": "Machine washable"
    },
    {
      "name": "Linen Wide Leg Pants",
      "price": 34.99,
      "rating": 4.6,
      "color": "Beige",
      "instock": true,
      "description": "Lightweight linen pants with a wide-leg cut.",
      "category": "Women",
      "subcategory": "Pants",
      "size": "Medium",
      "brand": "BreezyWear",
      "image": "https://example.com/images/linen_wide_leg_pants.jpg",
      "details": "Elastic waistband with a relaxed fit.",
      "material": "Linen blend",
      "careInstructions": "Machine washable"
    },
    {
      "name": "Midi Wrap Dress",
      "price": 44.99,
      "rating": 4.7,
      "color": "Blush Pink",
      "instock": true,
      "description": "Feminine wrap dress, perfect for any occasion.",
      "category": "Women",
      "subcategory": "Dress",
      "size": "Large",
      "brand": "ElegantWear",
      "image": "https://example.com/images/midi_wrap_dress.jpg",
      "details": "Tie waist and flared hem for a flattering fit.",
      "material": "Polyester",
      "careInstructions": "Hand wash recommended"
    },
    {
      "name": "Athletic Track Jacket",
      "price": 49.99,
      "rating": 4.6,
      "color": "Navy",
      "instock": true,
      "description": "Lightweight jacket for workouts or casual wear.",
      "category": "Women",
      "subcategory": "Jacket",
      "size": "Small",
      "brand": "ActiveFit",
      "image": "https://example.com/images/athletic_track_jacket.jpg",
      "details": "Zippered pockets with breathable fabric.",
      "material": "Polyester blend",
      "careInstructions": "Machine washable"
    },
    {
      "name": "Cropped Hoodie",
      "price": 24.99,
      "rating": 4.5,
      "color": "Lilac",
      "instock": true,
      "description": "Trendy cropped hoodie for a laid-back look.",
      "category": "Women",
      "subcategory": "Hoodie",
      "size": "Medium",
      "brand": "CasualCozy",
      "image": "https://example.com/images/cropped_hoodie.jpg",
      "details": "Drawstring hood and ribbed hem.",
      "material": "Cotton blend",
      "careInstructions": "Machine washable"
    },

      {
        "name": "Seamless Sports Bra",
        "price": 21.99,
        "rating": 4.6,
        "color": "Lavender",
        "instock": true,
        "description": "Comfortable sports bra with medium support.",
        "category": "Women",
        "subcategory": "Sports Bra",
        "size": "Medium",
        "brand": "ActiveFlex",
        "image": "https://example.com/images/seamless_sports_bra.jpg",
        "details": "Breathable and sweat-wicking fabric for intense workouts.",
        "material": "Nylon blend",
        "careInstructions": "Machine washable"
      },
      {
        "name": "High Waist Maxi Skirt",
        "price": 39.99,
        "rating": 4.8,
        "color": "Burgundy",
        "instock": true,
        "description": "Elegant maxi skirt for versatile styling.",
        "category": "Women",
        "subcategory": "Skirt",
        "size": "Large",
        "brand": "ElegantFlow",
        "image": "https://example.com/images/high_waist_maxi_skirt.jpg",
        "details": "High-waist fit with a flowy silhouette.",
        "material": "Polyester",
        "careInstructions": "Hand wash recommended"
      },
      {
        "name": "Lace Bralette",
        "price": 15.99,
        "rating": 4.4,
        "color": "White",
        "instock": true,
        "description": "Delicate lace bralette for layering or wearing alone.",
        "category": "Women",
        "subcategory": "Bralette",
        "size": "Small",
        "brand": "IntimateEssence",
        "image": "https://example.com/images/lace_bralette.jpg",
        "details": "Soft lace with adjustable straps for a comfortable fit.",
        "material": "Lace",
        "careInstructions": "Hand wash only"
      },
      {
        "name": "Floral Midi Skirt",
        "price": 34.99,
        "rating": 4.5,
        "color": "Yellow",
        "instock": true,
        "description": "Bright and flowy floral midi skirt for a summery look.",
        "category": "Women",
        "subcategory": "Skirt",
        "size": "Medium",
        "brand": "SunBloom",
        "image": "https://example.com/images/floral_midi_skirt.jpg",
        "details": "Elastic waistband with a flared hem.",
        "material": "Rayon",
        "careInstructions": "Machine washable"
      },
      {
        "name": "Classic Denim Jacket",
        "price": 59.99,
        "rating": 4.7,
        "color": "Light Wash",
        "instock": true,
        "description": "Timeless denim jacket with a relaxed fit.",
        "category": "Women",
        "subcategory": "Jacket",
        "size": "Large",
        "brand": "DenimDream",
        "image": "https://example.com/images/classic_denim_jacket.jpg",
        "details": "Button front with chest pockets.",
        "material": "100% Cotton",
        "careInstructions": "Machine washable"
      },
      {
        "name": "Long Sleeve Knit Dress",
        "price": 49.99,
        "rating": 4.6,
        "color": "Olive Green",
        "instock": true,
        "description": "Chic and cozy knit dress for cooler days.",
        "category": "Women",
        "subcategory": "Dress",
        "size": "Medium",
        "brand": "WarmKnits",
        "image": "https://example.com/images/long_sleeve_knit_dress.jpg",
        "details": "Form-fitting with ribbed texture.",
        "material": "Acrylic blend",
        "careInstructions": "Machine washable"
      },
      {
        "name": "Tie-Dye Hoodie",
        "price": 29.99,
        "rating": 4.3,
        "color": "Pink/Blue",
        "instock": true,
        "description": "Trendy tie-dye hoodie for a vibrant look.",
        "category": "Women",
        "subcategory": "Hoodie",
        "size": "Small",
        "brand": "StreetStyle",
        "image": "https://example.com/images/tie_dye_hoodie.jpg",
        "details": "Adjustable hood with kangaroo pocket.",
        "material": "Cotton blend",
        "careInstructions": "Machine washable"
      },
      {
        "name": "Classic Turtleneck Sweater",
        "price": 37.99,
        "rating": 4.6,
        "color": "Ivory",
        "instock": true,
        "description": "Classic turtleneck sweater for a polished look.",
        "category": "Women",
        "subcategory": "Sweater",
        "size": "Large",
        "brand": "WinterWear",
        "image": "https://example.com/images/classic_turtleneck_sweater.jpg",
        "details": "Soft and stretchy with a ribbed hem and cuffs.",
        "material": "Wool blend",
        "careInstructions": "Machine washable"
      },
      {
        "name": "Velvet Wrap Blouse",
        "price": 33.99,
        "rating": 4.5,
        "color": "Emerald Green",
        "instock": true,
        "description": "Elegant velvet blouse with a wrap design.",
        "category": "Women",
        "subcategory": "Blouse",
        "size": "Medium",
        "brand": "GlamourWear",
        "image": "https://example.com/images/velvet_wrap_blouse.jpg",
        "details": "Wrap style with tie waist for a custom fit.",
        "material": "Velvet",
        "careInstructions": "Dry clean only"
      },
      {
        "name": "Wide Brim Fedora Hat",
        "price": 24.99,
        "rating": 4.4,
        "color": "Beige",
        "instock": true,
        "description": "Stylish wide-brim hat for sunny days.",
        "category": "Women",
        "subcategory": "Hat",
        "size": "One Size",
        "brand": "SunnyStyle",
        "image": "https://example.com/images/wide_brim_fedora_hat.jpg",
        "details": "Wide brim for added sun protection.",
        "material": "Straw",
        "careInstructions": "Spot clean only"
      }
  
    

  
];


const folderPath = path.join(__dirname, 'public', 'Images', 'Women');

// Function to get a random image from a specified folder
const generateRandomImage = (categoryFolder) => {
    try {
        const fileNames = fs.readdirSync(categoryFolder);
        const randomIndex = Math.floor(Math.random() * fileNames.length);
        return fileNames[randomIndex];
    } catch (error) {
        console.error(`Error reading files in ${categoryFolder}:`, error);
        return null;
    }
}

// Update skincareProducts array with actual image paths
const updatedwomenProduct = womenProducts.map((product) => {
    // Path for the subcategory folder
    const categoryFolder = path.join(folderPath, product.subcategory);

    // Log the folder path being checked
    console.log(`Checking folder: ${categoryFolder}`);

    if (fs.existsSync(categoryFolder)) {
        const chosenImage = generateRandomImage(categoryFolder);
        
        // If an image was successfully chosen, update the product's image path
        if (chosenImage) {
            product.image = `Images/Women/${product.subcategory}/${chosenImage}`;
            console.log(`Assigned image for ${product.name}: ${product.image}`);
        } else {
            console.log(`No images found in ${categoryFolder} for ${product.name}`);
        }
    } else {
        console.log(`Folder ${product.subcategory} not found. Skipping product ${product.name}`);
    }
    return product;
});

  womenProducts = updatedwomenProduct


fs.writeFileSync('womenproduct.json',  JSON.stringify(womenProducts , null , 2));

console.log('Updated skincareProducts.json file saved successfully');





