// Shared SVG namespace
const svgNS = "http://www.w3.org/2000/svg";

// Shared color data
const colors = [
  { name: "yellow", variants: ["#FFE500", "#FFF282"] },
  { name: "orange", variants: ["#FF7008", "#FFA15D"] },
  { name: "red", variants: ["#EA0000", "#FF7575"] },
  { name: "brown", variants: ["#6C3414", "#B66537"] },
  { name: "blue", variants: ["#1B3BA9", "#00A3FF"] },
  { name: "turquoise", variants: ["#00856D", "#00F5AC"] },
  { name: "green", variants: ["#005B35", "#39B200"] },
  { name: "pink", variants: ["#EE34FE", "#F694FF"] },
  { name: "purple", variants: ["#5915EC", "#9564FF"] },
  { name: "gray", variants: ["#A5A5A5", "#F2F2F2"] },
  { name: "black", variants: ["#1B1717", "#484848"] },
  { name: "beige", variants: ["#FFDEC7", "#FDECE0"] }
];

// Shared category data
const categoryData = {
  "Animals": ["Lion", "Crab", "Butterfly", "Turtle", "Crocodile", "Snake", "Horse", "Dog", "Cat", "Mouse", "Zebra", "Bird", "Fish", "Elephant", "Monkey"],
  "Tools": ["Paintbrush", "Axe", "Gun", "Sword", "Saw", "Hammer", "Scissor", "Wrench", "Key", 'Nail'],
  "Nature": ["Cactus", "Sun", "Cloud", "Mushroom", "Leaf", "Mountain", "Tree", "Star", "Flower", "Landscape"],
  "Food": ["Pineapple", "Grape", "Apple", "Pumpkin", "Carrot", "Orange", "Icecream", "Cake", "Muffin", "Sushi"],
  "Vehicle": ["Helicopter", "Rocket", "Tractor", "Train", "Submarine", "Boat", "Motorcycle", "Airplane", "Car", "Bicycle"],
  "Clothing": ["Socks", "Dress", "Pants", "Jacket", "Shoes", "Shirt", "Scarf", "Sunglasses", "Hat", "Crown"],
  "Furniture": ["Clock", "Bench", "Bed", "Stool", "Table", "Lamp", "Sofa", "Chair"],
  "Buildings": ["Castle", "Igloo", "Lighthouse", "Bridge", "Tower", "Tent", "Skyscraper", "Hut", "House"],
  "Monster": ["Robot", "Alien", "Werewolf", "Vampire", "Ghost", "Monster", "Zombie", "Dragon"],
  "Technology": ["Headphone", "Camera", "Radio", "Engine", "Walkietalkie", "Phone", "TV", "Controller"],
  "Instrument": ["Trumpet", "Drum"],
  "People": ["Person", "Clown"]
};

// Shared item definitions for all game modes
const gridItems = {
  // Animals
  animals: {
    lion: {
      count: 5,
      attributes: []
    },
    fish: {
      count: 4,
      attributes: []
    },
    snake: {
      count: 1,
      attributes: []
    },
    elephant: {
      count: 1,
      attributes: []
    },
    butterfly: {
      count: 1,
      attributes: ['flying']
    },
    monkey: {
      count: 1,
      attributes: []
    },
    crocodile: {
      count: 1,
      attributes: []
    }
  },
  
  // Buildings
  buildings: {
    castle: {
      count: 1,
      attributes: ['fairytale', 'medieval']
    }
  },
  
  // Clothing
  clothing: {
    hat: {
      count: 3,
      attributes: []
    },
    crown: {
      count: 1,
      attributes: ['medieval']
    },
    shoes: {
      count: 3,
      attributes: []
    },
    pants: {
      count: 1,
      attributes: []
    }
  },
  
  // Food
  food: {
    cake: {
      count: 2,
      attributes: []
    },
    icecream: {
      count: 1,
      attributes: []
    },
    pumpkin: {
      count: 1,
      attributes: []
    },
    orange: {
      count: 1,
      attributes: []
    },
    apple: {
      count: 1,
      attributes: []
    },
    pineapple: {
      count: 1,
      attributes: []
    },
    grape: {
      count: 1,
      attributes: []
    },
    muffin: {
      count: 1,
      attributes: []
    }
  },
  
  // Furniture
  furniture: {
    chair: {
      count: 5,
      attributes: []
    },
    lamp: {
      count: 3,
      attributes: []
    }
  },
  
  // Instrument
  instrument: {
    trumpet: {
      count: 1,
      attributes: []
    }
  },
  
  // Monster
  monster: {
    dragon: {
      count: 1,
      attributes: ['fairytale']
    }
  },
  
  // Nature
  nature: {
    flower: {
      count: 5,
      attributes: []
    },
    landscape: {
      count: 2,
      attributes: []
    },
    cactus: {
      count: 1,
      attributes: ['spiky']
    }
  },
  
  // People
  people: {
    person: {
      count: 3,
      attributes: []
    }
  },
  
  // Tools
  tools: {
    saw: {
      count: 1,
      attributes: ['spiky']
    },
    scissor: {
      count: 1,
      attributes: []
    },
    hammer: {
      count: 1,
      attributes: []
    },
    wrench: {
      count: 1,
      attributes: []
    },
    key: {
      count: 1,
      attributes: []
    },
    sword: {
      count: 1,
      attributes: ['fairytale', 'medieval', 'sharp']
    },
    nail: {
      count: 1,
      attributes: ['spiky', 'sharp']
    }
  },
  
  // Vehicle
  vehicle: {
    bicycle: {
      count: 2,
      attributes: []
    },
    car: {
      count: 1,
      attributes: []
    },
    helicopter: {
      count: 1,
      attributes: ['flying']
    },
    rocket: {
      count: 1,
      attributes: ['flying']
    }
  }
};

// Shared utility functions
function createSVGElement(type, attributes = {}) {
  const element = document.createElementNS(svgNS, type);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  return element;
}

// Shared category dropdown population
function populateCategoryDropdowns(mainSelect, subSelect) {
  const mainFragment = document.createDocumentFragment();
  
  for (const main in categoryData) {
    const option = document.createElement("option");
    option.value = main;
    option.textContent = main;
    mainFragment.appendChild(option);
  }
  
  mainSelect.innerHTML = '';
  mainSelect.appendChild(mainFragment);
  updateSubCategories(mainSelect, subSelect);

  mainSelect.addEventListener("change", () => updateSubCategories(mainSelect, subSelect));
}

function updateSubCategories(mainSelect, subSelect) {
  const fragment = document.createDocumentFragment();
  const selectedMain = mainSelect.value;
  
  categoryData[selectedMain].forEach(sub => {
    const option = document.createElement("option");
    option.value = sub;
    option.textContent = sub;
    fragment.appendChild(option);
  });
  
  subSelect.innerHTML = '';
  subSelect.appendChild(fragment);
}

// Helper function to get all items that match a specific attribute
function getItemsByAttribute(attribute) {
  const matches = [];
  for (const [mainCategory, subCategories] of Object.entries(gridItems)) {
    for (const [subCategory, details] of Object.entries(subCategories)) {
      if (details.attributes.includes(attribute)) {
        matches.push({
          mainCategory,
          subCategory,
          details
        });
      }
    }
  }
  return matches;
}

// Helper function to get all items in a main category
function getItemsByMainCategory(mainCategory) {
  return gridItems[mainCategory] || {};
}

// Helper function to get all items of a specific subcategory across all main categories
function getItemsBySubCategory(subCategory) {
  const matches = [];
  for (const [mainCategory, subCategories] of Object.entries(gridItems)) {
    if (subCategories[subCategory]) {
      matches.push({
        mainCategory,
        subCategory,
        details: subCategories[subCategory]
      });
    }
  }
  return matches;
}

// Helper function to get file path for an item
function getItemFilePath(mainCategory, subCategory, number) {
  return `${mainCategory}-${subCategory}-${number}.svg`;
}

// Helper function to check if items share any matching criteria
function findMatchingCriteria(items) {
  if (items.length < 2) return null;
  
  // Check main category match
  const mainCategory = items[0].mainCategory;
  if (items.every(item => item.mainCategory === mainCategory)) {
    return { type: 'mainCategory', value: mainCategory };
  }
  
  // Check sub category match
  const subCategory = items[0].subCategory;
  if (items.every(item => item.subCategory === subCategory)) {
    return { type: 'subCategory', value: subCategory };
  }
  
  // Check attributes match
  const attributes = items[0].details.attributes;
  for (const attr of attributes) {
    if (items.every(item => item.details.attributes.includes(attr))) {
      return { type: 'attribute', value: attr };
    }
  }
  
  return null;
}

// Export all the shared functionality
window.gridItems = gridItems;
window.getItemsByAttribute = getItemsByAttribute;
window.getItemsByMainCategory = getItemsByMainCategory;
window.getItemsBySubCategory = getItemsBySubCategory;
window.getItemFilePath = getItemFilePath;
window.findMatchingCriteria = findMatchingCriteria; 