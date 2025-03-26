const fs = require('fs');
const path = require('path');


let skincareProducts = [
  
    {
      "name": "Hydrating Facewash",
      "price": 24.99,
      "rating": 4.5,
      "color": "Blue",
      "instock": true,
      "description": "A deeply hydrating facewash for dry skin.",
      "category": "Skincare",
      "subcategory": "Facewash",
      "filling": "30ml",
      "brand": "GlowSkin",
      "image": "https://example.com/images/hydrating_facewash.jpg",
      "details": "Enriched with hyaluronic acid and vitamin B5, this facewash provides intense hydration, leaving your skin soft and clean."
    },
    {
      "name": "Anti-Aging Lotion",
      "price": 35.99,
      "rating": 4.8,
      "color": "White",
      "instock": true,
      "description": "Reduces wrinkles and fine lines, promoting youthful skin.",
      "category": "Skincare",
      "subcategory": "Lotion",
      "filling": "50ml",
      "brand": "YouthRevive",
      "image": "https://example.com/images/anti_aging_lotion.jpg",
      "details": "Formulated with collagen and retinol, this lotion targets signs of aging to reveal smoother, younger-looking skin."
    },
    {
      "name": "Brightening Vitamin C Serum",
      "price": 29.99,
      "rating": 4.7,
      "color": "Yellow",
      "instock": true,
      "description": "Brightens skin tone and reduces dark spots.",
      "category": "Skincare",
      "subcategory": "Serums",
      "filling": "30ml",
      "brand": "RadianceBoost",
      "image": "https://example.com/images/vitamin_c_serum.jpg",
      "details": "Infused with vitamin C and antioxidants, this serum enhances skin radiance and helps to reduce hyperpigmentation."
    },
    {
      "name": "Soothing Facial Lotion",
      "price": 19.99,
      "rating": 4.2,
      "color": "Pink",
      "instock": true,
      "description": "Calms irritated skin and restores pH balance.",
      "category": "Skincare",
      "subcategory": "Lotion",
      "filling": "120ml",
      "brand": "CalmEssence",
      "image": "https://example.com/images/facial_lotion.jpg",
      "details": "A calming blend of chamomile and rosewater, perfect for sensitive skin. This lotion restores the skin's natural pH level."
    },
    {
      "name": "Deep Cleansing Cleanser",
      "price": 22.99,
      "rating": 4.6,
      "color": "Amber",
      "instock": false,
      "description": "Removes makeup and impurities without drying.",
      "category": "Skincare",
      "subcategory": "Cleanser",
      "filling": "100ml",
      "brand": "PureBliss",
      "image": "https://example.com/images/deep_cleansing_cleanser.jpg",
      "details": "With a blend of natural oils, this cleanser dissolves makeup and impurities while nourishing your skin."
    },
    {
      "name": "Hydrating Gel Serum",
      "price": 27.99,
      "rating": 4.4,
      "color": "Clear",
      "instock": true,
      "description": "Provides intense hydration without oiliness.",
      "category": "Skincare",
      "subcategory": "Serums",
      "filling": "60ml",
      "brand": "AquaGlow",
      "image": "https://example.com/images/hydrating_gel_serum.jpg",
      "details": "A refreshing, water-based gel serum that hydrates skin instantly, ideal for oily or combination skin types."
    },
    {
      "name": "Acne Spot Serum",
      "price": 12.99,
      "rating": 4.3,
      "color": "White",
      "instock": true,
      "description": "Quickly reduces blemishes and inflammation.",
      "category": "Skincare",
      "subcategory": "Serums",
      "filling": "15ml",
      "brand": "ClearSkin",
      "image": "https://example.com/images/acne_spot_serum.jpg",
      "details": "A powerful serum with salicylic acid to target acne and reduce inflammation effectively."
    },
    {
      "name": "Revitalizing Eye Serum",
      "price": 25.99,
      "rating": 4.6,
      "color": "Light Pink",
      "instock": true,
      "description": "Reduces dark circles and puffiness around eyes.",
      "category": "Skincare",
      "subcategory": "Serums",
      "filling": "20ml",
      "brand": "EyeBright",
      "image": "https://example.com/images/revitalizing_eye_serum.jpg",
      "details": "Formulated with caffeine and peptides to target dark circles, puffiness, and fine lines."
    },
    {
      "name": "Charcoal Detox Mask",
      "price": 20.99,
      "rating": 4.3,
      "color": "Black",
      "instock": true,
      "description": "Detoxifies and cleanses pores deeply.",
      "category": "Skincare",
      "subcategory": "Mask",
      "filling": "80ml",
      "brand": "CleanSlate",
      "image": "https://example.com/images/charcoal_detox_mask.jpg",
      "details": "This charcoal mask deeply cleanses and purifies pores, perfect for oily and acne-prone skin."
    },
    {
      "name": "Gentle Exfoliating Scrub",
      "price": 15.99,
      "rating": 4.5,
      "color": "Brown",
      "instock": true,
      "description": "Exfoliates dead skin cells for a radiant glow.",
      "category": "Skincare",
      "subcategory": "Scrub",
      "filling": "75ml",
      "brand": "SmoothSkin",
      "image": "https://example.com/images/exfoliating_scrub.jpg",
      "details": "A gentle scrub with fine particles to remove dead skin cells, leaving the skin smooth and bright."
    },
    
      {
        "name": "Hydrating Body Lotion",
        "price": 21.99,
        "rating": 4.7,
        "color": "Light Blue",
        "instock": true,
        "description": "Intensely hydrates and softens the skin.",
        "category": "Skincare",
        "subcategory": "Lotion",
        "filling": "200ml",
        "brand": "SilkySkin",
        "image": "https://example.com/images/body_lotion.jpg",
        "details": "Rich in shea butter and aloe vera, this body lotion keeps your skin hydrated throughout the day."
      },
      {
        "name": "Revitalizing Facewash",
        "price": 18.99,
        "rating": 4.6,
        "color": "White",
        "instock": true,
        "description": "Cleanses and revitalizes skin, leaving it refreshed.",
        "category": "Skincare",
        "subcategory": "Facewash",
        "filling": "150ml",
        "brand": "GlowFresh",
        "image": "https://example.com/images/revitalizing_facewash.jpg",
        "details": "A gentle facewash that removes impurities while keeping the skin hydrated."
      },
      {
        "name": "Hydrating Cleanser",
        "price": 22.99,
        "rating": 4.4,
        "color": "Pink",
        "instock": true,
        "description": "Hydrates and softens skin while cleansing.",
        "category": "Skincare",
        "subcategory": "Cleanser",
        "filling": "200ml",
        "brand": "HydraGlow",
        "image": "https://example.com/images/hydrating_cleanser.jpg",
        "details": "Formulated with aloe vera and chamomile to hydrate the skin while cleansing."
      },
      {
        "name": "Anti-Aging Serum",
        "price": 29.99,
        "rating": 4.8,
        "color": "Gold",
        "instock": true,
        "description": "Reduces signs of aging and promotes youthful skin.",
        "category": "Skincare",
        "subcategory": "Serums",
        "filling": "30ml",
        "brand": "YouthEssence",
        "image": "https://example.com/images/anti_aging_serum.jpg",
        "details": "Packed with peptides and antioxidants to firm and rejuvenate the skin."
      },
      {
        "name": "Calming Facewash",
        "price": 17.99,
        "rating": 4.3,
        "color": "Lavender",
        "instock": true,
        "description": "Soothes and cleanses sensitive skin without irritation.",
        "category": "Skincare",
        "subcategory": "Facewash",
        "filling": "120ml",
        "brand": "CalmCare",
        "image": "https://example.com/images/calming_facewash.jpg",
        "details": "A gentle formula with lavender and calendula to soothe and clean the skin."
      },
      {
        "name": "Purifying Cleanser",
        "price": 24.99,
        "rating": 4.5,
        "color": "Teal",
        "instock": false,
        "description": "Removes excess oil and purifies the skin.",
        "category": "Skincare",
        "subcategory": "Cleanser",
        "filling": "150ml",
        "brand": "PureEssence",
        "image": "https://example.com/images/purifying_cleanser.jpg",
        "details": "A clarifying cleanser that deeply cleanses pores and balances oil production."
      },
      {
        "name": "Rejuvenating Serum",
        "price": 34.99,
        "rating": 4.9,
        "color": "Rose Gold",
        "instock": true,
        "description": "Restores radiance and reduces fine lines.",
        "category": "Skincare",
        "subcategory": "Serums",
        "filling": "30ml",
        "brand": "GlowUp",
        "image": "https://example.com/images/rejuvenating_serum.jpg",
        "details": "Contains retinol and vitamin C to revitalize the skin and diminish fine lines."
      },
      {
        "name": "Nourishing Body Lotion",
        "price": 21.99,
        "rating": 4.7,
        "color": "Peach",
        "instock": true,
        "description": "Nourishes and hydrates the skin all day long.",
        "category": "Skincare",
        "subcategory": "Lotion",
        "filling": "250ml",
        "brand": "SilkTouch",
        "image": "https://example.com/images/nourishing_body_lotion.jpg",
        "details": "Formulated with shea butter and vitamin E to deeply hydrate and soften the skin."
      },
      {
        "name": "Brightening Facewash",
        "price": 19.99,
        "rating": 4.6,
        "color": "Yellow",
        "instock": true,
        "description": "Brightens and refreshes dull skin.",
        "category": "Skincare",
        "subcategory": "Facewash",
        "filling": "150ml",
        "brand": "RadiantGlow",
        "image": "https://example.com/images/brightening_facewash.jpg",
        "details": "A gentle facewash with vitamin C that brightens the complexion while cleansing."
      },
      {
        "name": "Smoothing Cleanser",
        "price": 23.99,
        "rating": 4.4,
        "color": "Blue",
        "instock": false,
        "description": "Smooths and polishes the skin while removing dirt and oil.",
        "category": "Skincare",
        "subcategory": "Cleanser",
        "filling": "200ml",
        "brand": "SmoothGlow",
        "image": "https://example.com/images/smoothing_cleanser.jpg",
        "details": "A scrub cleanser with exfoliating particles that smooths and refines the skin."
      },
      {
        "name": "Clarifying Serum",
        "price": 27.99,
        "rating": 4.5,
        "color": "Green",
        "instock": true,
        "description": "Reduces acne and clears the complexion.",
        "category": "Skincare",
        "subcategory": "Serums",
        "filling": "30ml",
        "brand": "ClearEssence",
        "image": "https://example.com/images/clarifying_serum.jpg",
        "details": "A targeted serum with salicylic acid to clear breakouts and promote clear skin."
      },
      {
        "name": "Hydrating Lotion",
        "price": 19.99,
        "rating": 4.8,
        "color": "Blue",
        "instock": true,
        "description": "Hydrates and softens dry skin all day long.",
        "category": "Skincare",
        "subcategory": "Lotion",
        "filling": "200ml",
        "brand": "HydraPure",
        "image": "https://example.com/images/hydrating_lotion.jpg",
        "details": "Formulated with glycerin and aloe vera to provide long-lasting hydration for dry skin."
      },
      {
        "name": "Detoxifying Facewash",
        "price": 16.99,
        "rating": 4.3,
        "color": "Gray",
        "instock": true,
        "description": "Detoxifies and purifies the skin.",
        "category": "Skincare",
        "subcategory": "Facewash",
        "filling": "150ml",
        "brand": "DetoxGlow",
        "image": "https://example.com/images/detoxifying_facewash.jpg",
        "details": "A detoxifying facewash with charcoal and clay to deeply cleanse and purify the skin."
      },
      {
        "name": "Firming Cleanser",
        "price": 24.99,
        "rating": 4.7,
        "color": "Purple",
        "instock": true,
        "description": "Tightens and firms the skin while cleansing.",
        "category": "Skincare",
        "subcategory": "Cleanser",
        "filling": "200ml",
        "brand": "FirmSkin",
        "image": "https://example.com/images/firming_cleanser.jpg",
        "details": "A firming cleanser with peptides and antioxidants that tightens and tones the skin."
      },
      {
        "name": "Cleansing Milk",
        "price": 15.99,
        "rating": 4.2,
        "color": "White",
        "instock": true,
        "description": "Gentle cleansing milk for sensitive skin.",
        "category": "Skincare",
        "subcategory": "Cleanser",
        "filling": "150ml",
        "brand": "PureSkin",
        "image": "https://example.com/images/cleansing_milk.jpg",
        "details": "A soothing cleanser that removes makeup and impurities while nourishing the skin."
      },
      {
        "name": "Soothing Moisturizer",
        "price": 19.99,
        "rating": 4.6,
        "color": "Blue",
        "instock": true,
        "description": "Hydrates and calms irritated skin.",
        "category": "Skincare",
        "subcategory": "Moisturizers",
        "filling": "200ml",
        "brand": "CalmSkin",
        "image": "https://example.com/images/soothing_moisturizer.jpg",
        "details": "A calming moisturizer that reduces redness and irritation while providing hydration."
      },
    
    
    
    {
      "name": "Lip Hydrating Balm",
      "price": 9.99,
      "rating": 4.8,
      "color": "Pink",
      "instock": true,
      "description": "Moisturizes and softens dry lips.",
      "category": "Skincare",
      "subcategory": "Lip Care",
      "filling": "10g",
      "brand": "SoftLips",
      "image": "https://example.com/images/lip_hydrating_balm.jpg",
      "details": "A nourishing lip balm that locks in moisture and keeps lips soft and smooth."
    },
    {
      "name": "Lash Boost Serum",
      "price": 24.99,
      "rating": 4.6,
      "color": "Transparent",
      "instock": true,
      "description": "Promotes thicker, fuller lashes.",
      "category": "Skincare",
      "subcategory": "Eyelash",
      "filling": "5ml",
      "brand": "LashPro",
      "image": "https://example.com/images/lash_boost_serum.jpg",
      "details": "A serum that encourages lash growth and strengthens lashes over time."
    },
    {
      "name": "Volume Lash Mascara",
      "price": 19.99,
      "rating": 4.3,
      "color": "Black",
      "instock": true,
      "description": "Gives lashes an intense, voluminous look.",
      "category": "Skincare",
      "subcategory": "Eyelash",
      "filling": "8ml",
      "brand": "EyeEssence",
      "image": "https://example.com/images/volume_lash_mascara.jpg",
      "details": "A mascara that adds length and volume without clumping or flaking."
    },
    {
      "name": "Eyelash Conditioning Serum",
      "price": 22.99,
      "rating": 4.7,
      "color": "White",
      "instock": true,
      "description": "Conditions lashes to prevent breakage.",
      "category": "Skincare",
      "subcategory": "Eyelash",
      "filling": "6ml",
      "brand": "LashLuxe",
      "image": "https://example.com/images/eyelash_conditioning_serum.jpg",
      "details": "A conditioning serum that nourishes lashes, making them healthier and shinier."
    },
    {
      "name": "Lengthen Lash Serum",
      "price": 21.49,
      "rating": 4.5,
      "color": "Clear",
      "instock": true,
      "description": "Enhances lash length for a bold look.",
      "category": "Skincare",
      "subcategory": "Eyelash",
      "filling": "7ml",
      "brand": "LongLash",
      "image": "https://example.com/images/lengthen_lash_serum.jpg",
      "details": "A lengthening formula that visibly extends lashes with regular use."
    },
    {
      "name": "Hydrating Lash Serum",
      "price": 18.49,
      "rating": 4.2,
      "color": "Pink",
      "instock": false,
      "description": "Keeps lashes hydrated and prevents brittleness.",
      "category": "Skincare",
      "subcategory": "Eyelash",
      "filling": "5ml",
      "brand": "LashCare",
      "image": "https://example.com/images/hydrating_lash_serum.jpg",
      "details": "Hydrating serum that prevents lash dryness and breakage."
    },
    {
      "name": "Overnight Lash Serum",
      "price": 25.99,
      "rating": 4.8,
      "color": "Blue",
      "instock": true,
      "description": "Works overnight to thicken lashes.",
      "category": "Skincare",
      "subcategory": "Eyelash",
      "filling": "6ml",
      "brand": "NightLash",
      "image": "https://example.com/images/overnight_lash_serum.jpg",
      "details": "A nutrient-rich serum that promotes growth while you sleep."
    },
    {
      "name": "Lash Volume Booster",
      "price": 20.99,
      "rating": 4.6,
      "color": "Purple",
      "instock": true,
      "description": "Increases lash volume and curl.",
      "category": "Skincare",
      "subcategory": "Eyelash",
      "filling": "8ml",
      "brand": "CurlCare",
      "image": "https://example.com/images/lash_volume_booster.jpg",
      "details": "A volumizing booster that lifts and enhances the natural curve of lashes."
    },
    {
      "name": "Lash Fortifying Serum",
      "price": 23.75,
      "rating": 4.5,
      "color": "Green",
      "instock": true,
      "description": "Strengthens lashes from the root.",
      "category": "Skincare",
      "subcategory": "Eyelash",
      "filling": "7ml",
      "brand": "FortiLash",
      "image": "https://example.com/images/lash_fortifying_serum.jpg",
      "details": "A fortifying formula that targets the lash root to enhance strength and reduce fall-out."
    },
    {
      "name": "Rapid Lash Enhancer",
      "price": 26.99,
      "rating": 4.9,
      "color": "Clear",
      "instock": false,
      "description": "Fast-acting formula for longer lashes.",
      "category": "Skincare",
      "subcategory": "Eyelash",
      "filling": "5ml",
      "brand": "RapidLash",
      "image": "https://example.com/images/rapid_lash_enhancer.jpg",
      "details": "A serum with fast results, enhancing lash length within weeks."
    },
    {
      "name": "Lash Thickening Gel",
      "price": 22.49,
      "rating": 4.4,
      "color": "Red",
      "instock": true,
      "description": "Adds density to thin lashes.",
      "category": "Skincare",
      "subcategory": "Eyelash",
      "filling": "6ml",
      "brand": "ThickLash",
      "image": "https://example.com/images/lash_thickening_gel.jpg",
      "details": "A thickening gel that makes lashes appear fuller and denser."
    }
    

  
  ];

const folderPath = path.join(__dirname, 'public', 'Images', 'skincare');

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
const updatedSkincareProducts = skincareProducts.map((product) => {
    // Path for the subcategory folder
    const categoryFolder = path.join(folderPath, product.subcategory);

    // Log the folder path being checked
    console.log(`Checking folder: ${categoryFolder}`);

    if (fs.existsSync(categoryFolder)) {
        const chosenImage = generateRandomImage(categoryFolder);
        
        // If an image was successfully chosen, update the product's image path
        if (chosenImage) {
            product.image = `Images/skincare/${product.subcategory}/${chosenImage}`;
            console.log(`Assigned image for ${product.name}: ${product.image}`);
        } else {
            console.log(`No images found in ${categoryFolder} for ${product.name}`);
        }
    } else {
        console.log(`Folder ${product.subcategory} not found. Skipping product ${product.name}`);
    }
    return product;
});

skincareProducts = updatedSkincareProducts;


fs.writeFileSync('skincareProducts.json',  JSON.stringify(skincareProducts , null , 2));

console.log('Updated skincareProducts.json file saved successfully');





