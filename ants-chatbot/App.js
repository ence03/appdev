import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { View, StyleSheet, LogBox } from "react-native";

LogBox.ignoreLogs([
  "Warning: Avatar: Support for defaultProps will be removed",
]);

export default function App() {
  const [messages, setMessages] = useState([]);
  const [messageIdCounter, setMessageIdCounter] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([
      {
        _id: nextMessageId(),
        text: "Good day! Welcome, I'm your chatbot assistant! How can I assist you today? Please select what skills you want to improve!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
        },
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            {
              title: "Cooking",
              value: "cooking",
            },
            {
              title: "Sports",
              value: "sports",
            },
            {
              title: "Gardening",
              value: "gardening",
            },
            {
              title: "Fitness",
              value: "fitness",
            },
            {
              title: "Arts and Craft",
              value: "arts_and_craft",
            },
          ],
        },
      },
    ]);
  }, []);

  const sportsFacts = [
    "Awesome! Did you know that the first modern Olympic Games were held in Athens, Greece, in 1896? It featured 241 athletes from 14 nations participating in 43 events.",
    "Awesome! Did you know that the marathon race was inspired by the ancient Greek soldier Pheidippides? According to legend, he ran approximately 26 miles from the battlefield of Marathon to Athens to deliver the news of the Greek victory over the Persians. This historic run is the origin of the marathon race we know today.",
    " Great! Here's another interesting sports fact: The longest tennis match in history was played at Wimbledon in 2010 between John Isner and Nicolas Mahut. The match lasted for 11 hours and 5 minutes, spread over three days, with Isner eventually winning 70-68 in the fifth set.",
  ];

  const getRandomSportsFact = () => {
    const randomIndex = Math.floor(Math.random() * sportsFacts.length);
    return sportsFacts[randomIndex];
  };

  const nextMessageId = () => {
    let newId;
    setMessageIdCounter((prevCounter) => {
      newId = prevCounter + 1;
      return newId;
    });
    return (newId || messageIdCounter + 1).toString();
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const userMessage = messages[0];
    handleUserMessage(userMessage);
  }, []);

  const onQuickReply = (quickReplies = []) => {
    const quickReply = quickReplies[0];
    handleUserMessage(quickReply);
  };

  const handleUserMessage = (message) => {
    const userMessage = {
      _id: nextMessageId(),
      text: message.title,
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [userMessage])
    );

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      switch (message.value) {
        case "cooking":
          botReply(
            "Awesome! How can I assist you with your cooking skills today?",
            [
              {
                title: "Recipe Ideas",
                value: "recipe_ideas",
              },
              {
                title: "Cooking Classes",
                value: "cooking_classes",
              },
              {
                title: "Ingredients Substitutions",
                value: "ingredients_substitutions",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "recipe_ideas":
          botReply(
            "Fantastic! Here are some popular Filipino recipes you can try:\n\nSisig:\n\n\u2022Description: Sisig is a popular Filipino dish made from chopped pork, usually ears, cheeks, and liver, seasoned with calamansi (Philippine lime) and chili peppers, then served sizzling hot. It's often garnished with onions and a raw egg.\n\u2022Ingredients: Pork (ears, cheeks, liver), calamansi juice, soy sauce, chili peppers, onions, and optionally a raw egg.\n\u2022Instructions: Start by boiling the pork until tender, then grill or broil it for added crispness. Chop the meat into small pieces and season with calamansi juice, soy sauce, and chili peppers. Sauté with onions until fragrant and serve hot, topping with a raw egg if desired.\n\nSinugba:\n\n\u2022Description: Sinugba is a grilled dish in Filipino cuisine. It typically involves marinating meat or seafood in a mixture of vinegar, soy sauce, garlic, and spices before grilling it to perfection.\n\u2022Ingredients: Pork belly or seafood (like bangus or tuna), vinegar, soy sauce, garlic, and pepper.\n\u2022Instructions: Sauté garlic until golden brown, then add pork belly and cook until lightly browned. Pour in soy sauce, vinegar, and brown sugar, then add bay leaves and peppercorns. Simmer over low heat until pork is tender and the sauce is thickened. Serve hot with steamed rice.\n\nTinola:\n\n\u2022Description: Tinola is a traditional Filipino chicken soup flavored with ginger and usually with green papaya or chayote, malunggay leaves (moringa), or chili leaves\n\u2022Ingredients: Chicken pieces (usually thighs or drumsticks), ginger, garlic, green papaya or chayote, malunggay leaves or chili leaves, fish sauce, and water.\n\u2022Instructions: Sauté ginger and garlic until fragrant, then add chicken pieces and cook until lightly browned. Pour in water and bring to a boil. Add green papaya or chayote and simmer until vegetables are tender. Season with fish sauce and add malunggay leaves or chili leaves before serving. Serve hot as a comforting meal.\n\nAdobo:\n\n\u2022Description: Adobo is arguably the most popular Filipino dish. It's a savory stew of meat (usually chicken, pork, or both) marinated in vinegar, soy sauce, garlic, and bay leaves, then simmered until tender.\n\u2022Ingredients: Chicken or pork (or a combination), vinegar, soy sauce, garlic, bay leaves, peppercorns, and water.\n\u2022Instructions: Combine all ingredients in a pot and marinate for at least 30 minutes. Bring to a boil, then reduce heat and simmer until meat is tender and sauce is reduced and thickened. Serve hot with steamed rice",
            [
              {
                title: "Recipe Ideas",
                value: "recipe_ideas",
              },
              {
                title: "Cooking Classes",
                value: "cooking_classes",
              },
              {
                title: "Ingredients Substitutions",
                value: "ingredients_substitutions",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "cooking_classes":
          botReply(
            "Great! Here are some online platforms where you can enroll in cooking classes that include:\n\n1. Master Class\nFeatures classes by world-renowned chefs who occasionally cover international cuisines, including Filipino dishes.\nhttps://www.masterclass.com \n\n2. Udemy\nOffers a variety of cooking courses, including specific ones on Filipino cuisine.\nhttps://www.udemy.com/course/filipino-food-recipes-cooking-class-for-beginners/ \n\n3. Skillshare\nProvides a range of cooking classes, including traditional Filipino cooking.\nhttps://www.skillshare.com",
            [
              {
                title: "Recipe Ideas",
                value: "recipe_ideas",
              },
              {
                title: "Cooking Classes",
                value: "cooking_classes",
              },
              {
                title: "Ingredients Substitutions",
                value: "ingredients_substitutions",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "ingredients_substitutions":
          botReply(
            "Sure! Here are some common ingredient substitutions for Filipino cooking:\n\n1. Calamansi Substitute:\n -Use a mix of lemon and lime juice in equal parts.\n\n2. Banana Blossoms Substitute:\n -Use artichoke hearts as a substitute in dishes like Humba.\n\n3. Fish Sauce Substitute:\n -Combine 1 part soy sauce with 1 part anchovy paste, or use Worcestershire sauce.\n\n4. Pork Maskara (Face) Substitute:\n -Use pork belly or pork shoulder for dishes like Sisig.",
            [
              {
                title: "Recipe Ideas",
                value: "recipe_ideas",
              },
              {
                title: "Cooking Classes",
                value: "cooking_classes",
              },
              {
                title: "Ingredients Substitutions",
                value: "ingredients_substitutions",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "sports":
          botReply(
            "Fantastic! Let's have some fun learning opportunities. Choose an option:",
            [
              {
                title: "Explore Training Tips",
                value: "explore_training_tips",
              },
              {
                title: "Sports Facts",
                value: "sports_facts",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "explore_training_tips":
          botReply(
            "Let's level up your training game! Choose a sport to receive training tips for:",
            [
              {
                title: "Basketball",
                value: "basketball",
              },
              {
                title: "Soccer",
                value: "soccer",
              },
              {
                title: "Tennis",
                value: "tennis",
              },
              {
                title: "Swimming",
                value: "swimming",
              },
              {
                title: "Running",
                value: "running",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "basketball":
          botReply(
            "Great choice! Here are some training tips to improve your basketball skills:\n\n1. Shooting: Practice shooting from different spots on the court to improve accuracy.\n2. Dribbling: Work on your ball-handling skills with drills like dribble moves and crossovers.\n3. Defense:  Focus on footwork and anticipation to become a better defender.\n4. Conditioning: Increase endurance with cardio exercises like running and jumping rope.",
            [
              {
                title: "Basketball",
                value: "basketball",
              },
              {
                title: "Soccer",
                value: "soccer",
              },
              {
                title: "Tennis",
                value: "tennis",
              },
              {
                title: "Swimming",
                value: "swimming",
              },
              {
                title: "Running",
                value: "running",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "soccer":
          botReply(
            "Great choice! Here are some training tips to improve your soccer skills:\n\ne1. Dribbling: Practice dribbling with both feet using cones to create an obstacle course.\n2. Passing: Work on short and long passes with a partner, focusing on accuracy and timing.\n3. Shooting:  Aim for different parts of the goal to improve precision and power.\n4. Fitness: Build stamina with interval training and running drills.",
            [
              {
                title: "Basketball",
                value: "basketball",
              },
              {
                title: "Soccer",
                value: "soccer",
              },
              {
                title: "Tennis",
                value: "tennis",
              },
              {
                title: "Swimming",
                value: "swimming",
              },
              {
                title: "Running",
                value: "running",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "tennis":
          botReply(
            "Great choice! Here are some training tips to improve your tennis skills:\n\n1. Footwork: Emphasize quick movements and proper positioning on the court.\n2. Stroke Technique: Focus on perfecting each stroke—freestyle, backstroke, breaststroke, and butterfly.\n3. Turns: Improve your flip turns and push-offs for better lap times.\n4. Endurance: Build stamina with interval training and long-distance swims.",
            [
              {
                title: "Basketball",
                value: "basketball",
              },
              {
                title: "Soccer",
                value: "soccer",
              },
              {
                title: "Tennis",
                value: "tennis",
              },
              {
                title: "Swimming",
                value: "swimming",
              },
              {
                title: "Running",
                value: "running",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "swimming":
          botReply(
            "Great choice! Here are some training tips to improve your swimming skills:\n\n1. Breathing: Practice breathing techniques to enhance endurance and efficiency.\n2. Stroke Technique:  Focus on the fundamentals of forehand, backhand, serve, and volley.\n3. Strategy: Teach players to anticipate opponents' moves and adjust tactics accordingly.\n4. Mental Toughness:  Encourage resilience and focus during matches.",
            [
              {
                title: "Basketball",
                value: "basketball",
              },
              {
                title: "Soccer",
                value: "soccer",
              },
              {
                title: "Tennis",
                value: "tennis",
              },
              {
                title: "Swimming",
                value: "swimming",
              },
              {
                title: "Running",
                value: "running",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "running":
          botReply(
            "Great choice! Here are some training tips to improve your running skills:\n\n1. Warm-up: Always start with a proper warm-up to prevent injuries.\n2. Form: Maintain good running form—upright posture, relaxed shoulders, and efficient arm movement.\n3. Intervals: Incorporate interval training to build speed and endurance.\n4. Cool down: Finish with a cool-down and stretching to aid recovery",
            [
              {
                title: "Basketball",
                value: "basketball",
              },
              {
                title: "Soccer",
                value: "soccer",
              },
              {
                title: "Tennis",
                value: "tennis",
              },
              {
                title: "Swimming",
                value: "swimming",
              },
              {
                title: "Running",
                value: "running",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "sports_facts":
          botReply(getRandomSportsFact(), [
            {
              title: "Explore Traning Tips",
              value: "explore_training_tips",
            },
            {
              title: "Sports Facts",
              value: "sports_facts",
            },
            {
              title: "End",
              value: "end",
            },
          ]);
          break;
        case "gardening":
          botReply(
            "Wonderful! How can I assist you with your gardening today?",
            [
              {
                title: "Plant Care Tips",
                value: "plant_care_tips",
              },
              {
                title: "Gardening Tools and Equipment",
                value: "gardening_tools_and_equipment",
              },
              {
                title: "Seasonal Planting Guide",
                value: "seasonal_planting_guide",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "plant_care_tips":
          botReply(
            "Excellent choice! What type of plants would you like tips for?",
            [
              {
                title: "Indoor Plants",
                value: "indoor_plants",
              },
              {
                title: "Outdoor Plants",
                value: "outdoor_plants",
              },
              {
                title: "Vegetables",
                value: "vegetables",
              },
              {
                title: "Herbs",
                value: "herbs",
              },
              {
                title: "Flowers",
                value: "flowers",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "indoor_plants":
          botReply(
            "Here are some tips for taking care of indoor plants\n\n1. Lighting: Ensure your plants get the right amount of light. Most indoor plants thrive in bright, indirect sunlight.\n2. Watering: Water your plants when the top inch of soil is dry. Avoid overwatering as it can lead to root rot.\n3. Humidity:  Many indoor plants prefer high humidity. You can increase humidity by misting the leaves or using a humidity tray.\n4. Fertilizing: Feed your plants with a balanced houseplant fertilizer every month during the growing season (spring and summer).\n\nWould you like tips for another type of plant or assistance with something else?",
            [
              {
                title: "Indoor Plants",
                value: "indoor_plants",
              },
              {
                title: "Outdoor Plants",
                value: "outdoor_plants",
              },
              {
                title: "Vegetables",
                value: "vegetables",
              },
              {
                title: "Herbs",
                value: "herbs",
              },
              {
                title: "Flowers",
                value: "flowers",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "outdoor_plants":
          botReply(
            "Here are some tips for taking care of outdoor plants.\n\n1. Sunlight: Ensure your plants receive the appropriate amount of sunlight. Full sun plants need at least 6 hours of direct sunlight, while shade plants need less.\n2. Watering: Water deeply but infrequently to encourage deep root growth. Early morning is the best time to water.\n3. Soil:  Use well-draining soil and amend with compost to provide essential nutrients.\n4. Mulching: Apply mulch around plants to retain moisture, regulate soil temperature, and prevent weeds.\n\nWould you like tips for another type of plant or assistance with something else?",
            [
              {
                title: "Indoor Plants",
                value: "indoor_plants",
              },
              {
                title: "Outdoor Plants",
                value: "outdoor_plants",
              },
              {
                title: "Vegetables",
                value: "vegetables",
              },
              {
                title: "Herbs",
                value: "herbs",
              },
              {
                title: "Flowers",
                value: "flowers",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "vegetables":
          botReply(
            "Here are some tips for growing vegetables.\n\n1. Site Selection: Choose a sunny location with at least 6-8 hours of sunlight per day.\n2. Soil Preperation: Use rich, well-draining soil. Mix in compost or organic matter to improve soil fertility.\n3. Planting: Follow the seed packet or plant tag instructions for spacing and planting depth.\n4. Watering: Keep the soil consistently moist, especially during dry spells. Water at the base of the plants to avoid wetting the foliage.\n\nWould you like tips for another type of plant or assistance with something else?",
            [
              {
                title: "Indoor Plants",
                value: "indoor_plants",
              },
              {
                title: "Outdoor Plants",
                value: "outdoor_plants",
              },
              {
                title: "Vegetables",
                value: "vegetables",
              },
              {
                title: "Herbs",
                value: "herbs",
              },
              {
                title: "Flowers",
                value: "flowers",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "herbs":
          botReply(
            "Here are some tips for growing herbs:\n\n1. Loation: Most herbs prefer full sun (at least 6 hours of sunlight per day).\n2. Soil: Use well-draining soil. Herbs thrive in slightly alkaline soil.\n3. Watering: Water herbs regularly but do not overwater. Allow the soil to dry out slightly between watering.\n4. Pruning: Regularly prune herbs to encourage bushy growth and prevent them from flowering.\n\nWould you like tips for another type of plant or assistance with something else?",
            [
              {
                title: "Indoor Plants",
                value: "indoor_plants",
              },
              {
                title: "Outdoor Plants",
                value: "outdoor_plants",
              },
              {
                title: "Vegetables",
                value: "vegetables",
              },
              {
                title: "Herbs",
                value: "herbs",
              },
              {
                title: "Flowers",
                value: "flowers",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "flowers":
          botReply(
            "Here are some tips for growing flowers:\n\n1. Choosing Varieties: Select flowers that are suitable for your climate and soil type.\n2. Planting: Follow the planting instructions on the seed packet or plant tag. Ensure proper spacing to allow for growth\n3. Watering: Water flowers deeply and regularly, especially during dry periods. Avoid overhead watering to prevent fungal diseases.\n4. Fertilizing: Feed flowers with a balanced fertilizer during the growing season to promote blooming.\n\nWould you like tips for another type of plant or assistance with something else?",
            [
              {
                title: "Indoor Plants",
                value: "indoor_plants",
              },
              {
                title: "Outdoor Plants",
                value: "outdoor_plants",
              },
              {
                title: "Vegetables",
                value: "vegetables",
              },
              {
                title: "Herbs",
                value: "herbs",
              },
              {
                title: "Flowers",
                value: "flowers",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "gardening_tools_and_equipment":
          botReply(
            "Here are some essential tools and equipment for gardening:",
            [
              {
                title: "Basic Gardening Tools",
                value: "basic_gardening_tools",
              },
              {
                title: "Advanced Gardening Tools",
                value: "advanced_gardening_tools",
              },
              {
                title: "Specialized Gardening Tools",
                value: "specialized_gardening_tools",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "basic_gardening_tools":
          botReply(
            "Here are some Basic tools and equipment for gardening:\n\n1. Hand Trowel:\n\u2022Uses: Ideal for digging small holes, planting, transplanting, and weeding.\n\u2022Benefits: Lightweight, easy to handle, and perfect for precision work.\n2. Pruning Shears:\n\u2022Uses: Used for trimming and shaping plants, bushes, and small trees.\n\u2022Benefits: Helps maintain plant health by removing dead or overgrown branches.\n3. Garden Fork:\n\u2022Uses: Perfect for loosening, lifting, and turning over soil.\n\u2022Benefits: Essential for aerating soil and breaking up dense clumps.\n4. Watering Can:\n\u2022Uses: Essential for watering plants, especially in areas where a hose cannott reach.\n\u2022Benefits: Provides a gentle shower that won’t damage delicate plants.\n5. Gloves:\n\u2022Uses: Protect your hands from thorns, dirt, and blisters.\n\u2022Benefits: Ensures comfort and safety while working in the garden.\n6. Wheelbarrow:\n\u2022Uses: Useful for transporting soil, compost, plants, and other garden materials.\n\u2022Benefits: Saves time and effort by carrying heavy loads efficiently.\n\nLet me know if you to know more about garden tools and equipment.",
            [
              {
                title: "Basic Gardening Tools",
                value: "basic_gardening_tools",
              },
              {
                title: "Advanced Gardening Tools",
                value: "advanced_gardening_tools",
              },
              {
                title: "Specialized Gardening Tools",
                value: "specialized_gardening_tools",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "advanced_gardening_tools":
          botReply(
            "Here are some Advance tools and equipment for gardening:\n\n1. Hose and Nozzle:\n\u2022Uses: Provides a steady flow of water to plants and garden beds.\n\u2022Benefits: Adjustable nozzles allow for different water pressure settings.\n2. Garden Hoe:\n\u2022Uses: Excellent for weeding, cultivating soil, and creating planting rows.\n\u2022Benefits: Helps maintain soil health and control weeds effectively.\n3. Loppers:\n\u2022Uses: Used for cutting thick branches and stems.\n\u2022Benefits: Provides leverage to cut through thicker branches than pruning shears.\n4. Rake:\n\u2022Uses: Ideal for clearing leaves, grass clippings, and debris.\n\u2022Benefits: Helps keep your garden clean and tidy.\n5. Compost Bin:\n\u2022Uses: Used to collect and decompose organic waste into nutrient-rich compost.\n\u2022Benefits: Reduces waste and provides free fertilizer for your garden.\n6. Garden Kneeler:\n\u2022Uses: Provides a comfortable surface for kneeling while gardening.\n\u2022Benefits: Reduces strain on your knees and back.\n\nLet me know if you to know more about garden tools and equipment.",
            [
              {
                title: "Basic Gardening Tools",
                value: "basic_gardening_tools",
              },
              {
                title: "Advanced Gardening Tools",
                value: "advanced_gardening_tools",
              },
              {
                title: "Specialized Gardening Tools",
                value: "specialized_gardening_tools",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "specialized_gardening_tools":
          botReply(
            "Here are some Specialized tools and equipment for gardening:\n\n1. Soil PH Tester:\n\u2022Uses: Measures the acidity or alkalinity of your soil.\n\u2022Benefits: Helps determine the best plants for your soil type and guide soil amendments.\n2. Plant Makers:\n\u2022Uses: Label your plants to keep track of different varieties.\n\u2022Benefits: Useful for identifying plants, especially in larger gardens.\n3. Seed Trays:\n\u2022Uses: Start seeds indoors before transplanting them to the garden.\n\u2022Benefits: Provides a controlled environment for seedlings to grow.\n4. Greenhouse:\n\u2022Uses: Provides a controlled environment for growing plants year-round.\n\u2022Benefits: Protects plants from extreme weather and extends the growing season.\n5. Drip Irrigation System:\n\u2022Uses: Used to collect and decompose organic waste into nutrient-rich compost.\n\u2022Benefits: Reduces waste and provides free fertilizer for your garden.\n\nLet me know if you to know more about garden tools and equipment.",
            [
              {
                title: "Basic Gardening Tools",
                value: "basic_gardening_tools",
              },
              {
                title: "Advanced Gardening Tools",
                value: "advanced_gardening_tools",
              },
              {
                title: "Specialized Gardening Tools",
                value: "specialized_gardening_tools",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "seasonal_planting_guide":
          botReply(
            "Here's a seasonal planting guide to help you know what to plant and when:",
            [
              {
                title: "Spring Planting",
                value: "spring_planting",
              },
              {
                title: "Summer Planting",
                value: "summer_planting",
              },
              {
                title: "Fall Planting",
                value: "fall_planting",
              },
              {
                title: "Winter Planting",
                value: "winter_planting",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "spring_planting":
          botReply(
            "Spring is a great time to start planting cool-season crops and prepare for the summer garden. Here are some tips for spring planting:\n\n1. Cool-Season Vegetables:\n\u2022Examples: Lettuce, peas, spinach, radishes, and broccoli.\n\u2022Tips: Plant these crops as soon as the soil can be worked, typically 2-4 weeks before the last expected frost date.\n2. Warm-Season Vegetable(Indoors):\n\u2022Examples: Tomatoes, peppers, eggplants, and cucumbers.\n\u2022Tips: Start seeds indoors 6-8 weeks before the last frost date. Transplant seedlings outdoors after the danger of frost has passed.\n3. Flowers:\n\u2022Examples: Pansies, snapdragons, and primroses for early spring; marigolds, petunias, and zinnias for late spring.\n\u2022Tips: Plant early spring flowers once the soil can be worked. Plant warm-season flowers after the last frost.\n4. Herbs:\n\u2022Examples: Parsley, cilantro, dill, and chives.\n\u2022Tips: Plant hardy herbs directly in the garden or in containers. Start tender herbs like basil indoors and transplant them after the last frost.\n\nIf you'd like to know more. You can choose from the following options:",
            [
              {
                title: "Spring Planting",
                value: "spring_planting",
              },
              {
                title: "Summer Planting",
                value: "summer_planting",
              },
              {
                title: "Fall Planting",
                value: "fall_planting",
              },
              {
                title: "Winter Planting",
                value: "winter_planting",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "summer_planting":
          botReply(
            "Summer is ideal for planting heat-loving crops and enjoying the fruits of your spring planting. Here are some tips for summer planting:\n\n1. Warm-Season Vegetables:\n\u2022Examples: Beans, corn, squash, tomatoes, and peppers.\n\u2022Tips: Plant these crops after the last frost date and when the soil has warmed up.\n2. Succession Planting:\n\u2022Examples: Lettuce, radishes, and spinach.\n\u2022Tips: Plant short-season crops in succession (every 2-3 weeks) to ensure a continuous harvest throughout the summer.\n3. Flowers:\n\u2022Examples: Sunflowers, cosmos, marigolds, and nasturtiums.\n\u2022Tips: Directly sow flower seeds in the garden or plant transplants started indoors in the spring.\n4. Herbs:\n\u2022Examples: Basil, oregano, thyme, and rosemary.\n\u2022Tips: Plant herbs in well-draining soil and ensure they receive plenty of sunlight. Harvest regularly to encourage new growth.\n5. Watering:\n\u2022Tips: Water deeply and consistently, especially during dry spells. Mulch around plants to retain moisture and reduce weeds.\n\nIf you'd like to know more. You can choose from the following options:",
            [
              {
                title: "Spring Planting",
                value: "spring_planting",
              },
              {
                title: "Summer Planting",
                value: "summer_planting",
              },
              {
                title: "Fall Planting",
                value: "fall_planting",
              },
              {
                title: "Winter Planting",
                value: "winter_planting",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "fall_planting":
          botReply(
            "Fall is a perfect time to plant cool-season crops and prepare your garden for winter. Here are some tips for fall planting:\n\n1. Cool-Season Vegetables:\n\u2022Examples: Kale, Brussels sprouts, carrots, beets, and garlic.\n\u2022Tips: Plant these crops in late summer to early fall, allowing them to mature as the weather cools.\n2. Cover Crops:\n\u2022Examples: Clover, vetch, and rye.\n\u2022Tips: Plant cover crops to improve soil health, prevent erosion, and add nutrients to the soil.\n3. Perennials:\n\u2022Examples: Plant perennials like daylilies, peonies, and hostas in early fall to give them time to establish roots before winter.\n\u2022Tips: Choose plants that are hardy in your growing zone for the best results.\n4. Bulbs:\n\u2022Examples: Tulips, daffodils, and hyacinths.\n\u2022Tips: Plant spring-flowering bulbs in the fall before the ground freezes.\n\nIf you'd like to know more. You can choose from the following options:",
            [
              {
                title: "Spring Planting",
                value: "spring_planting",
              },
              {
                title: "Summer Planting",
                value: "summer_planting",
              },
              {
                title: "Fall Planting",
                value: "fall_planting",
              },
              {
                title: "Winter Planting",
                value: "winter_planting",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "winter_planting":
          botReply(
            "Winter planting can be challenging, but with the right techniques, you can grow certain crops even in the cold months. Here are some tips for winter planting:\n\n1. Cold-Frame Gardening:\n\u2022Uses: Cold frames protect plants from harsh winter weather and extend the growing season.\n\u2022Tips: Grow hardy greens like spinach, kale, and lettuce in a cold frame.\n2. Greenhouse Gardening:\n\u2022Uses:  A greenhouse provides a controlled environment for growing plants year-round.\n\u2022Tips: Grow a variety of vegetables, herbs, and flowers in a greenhouse.\n3. Winter Sowing:\n\u2022Uses: Winter sowing involves planting seeds outdoors in containers during the winter to germinate in the spring.\n\u2022Tips: Use milk jugs or other clear containers to create mini greenhouses for seeds like lettuce, radishes, and wildflowers.\n4. Indoor Gardening:\n\u2022Uses: Grow herbs, leafy greens, and small vegetables indoors under grow lights.\n\u2022Tips: Ensure adequate light and maintain consistent temperatures for optimal growth.\n\nIf you'd like to know more. You can choose from the following options:",
            [
              {
                title: "Spring Planting",
                value: "spring_planting",
              },
              {
                title: "Summer Planting",
                value: "summer_planting",
              },
              {
                title: "Fall Planting",
                value: "fall_planting",
              },
              {
                title: "Winter Planting",
                value: "winter_planting",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "fitness":
          botReply(
            "Excellent choice! How can I assist you with your fitness goals today?",
            [
              {
                title: "Workout Routines",
                value: "workout_routines",
              },
              {
                title: "Nutrition Advice",
                value: "nutrition_advice",
              },
              {
                title: "Fitness Gear and Equipment",
                value: "fitness_gear_and_equipment",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "workout_routines":
          botReply(
            "Awesome! What type of workout routine are you interested in?",
            [
              {
                title: "Strength Training",
                value: "strength_training",
              },
              {
                title: "Cardio",
                value: "cardio",
              },
              {
                title: "Flexibility and Mobility",
                value: "flexibility_and_mobility",
              },
              {
                title: "Full-Body Workout",
                value: "fullbody_workout",
              },
              {
                title: "Calisthenics",
                value: "calisthenics",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "strength_training":
          botReply(
            "Here are some tips for an effective strength training routine:\n\n1. Warm-up: Always start with a proper warm-up to prepare your muscles and prevent injury.\n2. Compound Exercises: Focus on compound movements like squats, deadlifts, bench press, and pull-ups to work multiple muscle groups.\n3. Progressive Overload: Gradually increase the weight or resistance to continue challenging your muscles.\n4. Rest and Recovery: Allow adequate rest between sets and give muscle groups time to recover between workouts.\n\nWould you like more information on another type of workout?",
            [
              {
                title: "Strength Training",
                value: "strength_training",
              },
              {
                title: "Cardio",
                value: "cardio",
              },
              {
                title: "Flexibility and Mobility",
                value: "flexibility_and_mobility",
              },
              {
                title: "Full-Body Workout",
                value: "fullbody_workout",
              },
              {
                title: "Calisthenics",
                value: "calisthenics",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "cardio":
          botReply(
            "Here are some tips for an effective cardio routine:\n\n1. Variety: Mix different forms of cardio, such as running, cycling, swimming, and HIIT, to keep your workouts interesting.\n2. Intensity: Adjust the intensity of your workouts to match your fitness level. Incorporate intervals to boost calorie burn and cardiovascular fitness.\n3. Duration: Aim for at least 150 minutes of moderate-intensity cardio or 75 minutes of high-intensity cardio per week.\n4. Tracking: Use a heart rate monitor or fitness tracker to ensure you’re working within your target heart rate zone.\n\nWould you like more information on another type of workout?",
            [
              {
                title: "Strength Training",
                value: "strength_training",
              },
              {
                title: "Cardio",
                value: "cardio",
              },
              {
                title: "Flexibility and Mobility",
                value: "flexibility_and_mobility",
              },
              {
                title: "Full-Body Workout",
                value: "fullbody_workout",
              },
              {
                title: "Calisthenics",
                value: "calisthenics",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "flexibility_and_mobility":
          botReply(
            "Here are some tips for improving flexibility and mobility:\n\n1. Dynamic Stretching: Incorporate dynamic stretches like leg swings and arm circles in your warm-up.\n2. Static Stretching: Perform static stretches after your workout, holding each stretch for 15-30 seconds.\n3. Foam Rolling: Use a foam roller to release muscle tightness and improve blood flow.\n4. Yoga: Practice yoga to enhance flexibility, balance, and overall mobility.\n\nWould you like more information on another type of workout?",
            [
              {
                title: "Strength Training",
                value: "strength_training",
              },
              {
                title: "Cardio",
                value: "cardio",
              },
              {
                title: "Flexibility and Mobility",
                value: "flexibility_and_mobility",
              },
              {
                title: "Full-Body Workout",
                value: "fullbody_workout",
              },
              {
                title: "Calisthenics",
                value: "calisthenics",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "fullbody_workout":
          botReply(
            "Here are some tips for an effective full-body workout routine:\n\n1. Warm-Up: Start with a 5-10 minute warm-up to get your blood flowing.\n2. Balance: Include exercises that target all major muscle groups, such as push-ups, squats, lunges, rows, and planks.\n3. Circuit Training: Perform exercises in a circuit to keep your heart rate up and maximize calorie burn.\n4. Cool-Down: Finish with a cool-down and stretching to aid recovery.\n\nWould you like more information on another type of workout?",
            [
              {
                title: "Strength Training",
                value: "strength_training",
              },
              {
                title: "Cardio",
                value: "cardio",
              },
              {
                title: "Flexibility and Mobility",
                value: "flexibility_and_mobility",
              },
              {
                title: "Full-Body Workout",
                value: "fullbody_workout",
              },
              {
                title: "Calisthenics",
                value: "calisthenics",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "calisthenics":
          botReply(
            "Here are some tips and routines for an effective calisthenics workout:",
            [
              {
                title: "Basic Calisthenics Exercises",
                value: "basic_calisthenics",
              },
              {
                title: "Advance Calisthenics Exercises",
                value: "advance_calisthenics",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "basic_calisthenics":
          botReply(
            "1. Push-Ups:\n\u2022Form: Keep your body in a straight line from head to heels. Lower your body until your chest nearly touches the floor, then push back up.\n\u2022Variations: Wide-grip, close-grip, decline, and archer push-ups.\n\n2. Pull-Ups:\n\u2022Form: Hang from a bar with your palms facing away. Pull yourself up until your chin is above the bar, then lower yourself back down.\n\u2022Variations: Chin-ups, wide-grip, close-grip, and muscle-ups.\n\n3. Dips:\n\u2022Form: Use parallel bars or a sturdy surface. Lower your body until your elbows are at a 90-degree angle, then push back up.\n\u2022Variations: Tricep dips, bench dips, and ring dips.\n\n4. Squats\n\u2022Form: Stand with your feet shoulder-width apart. Lower your hips back and down as if sitting in a chair, then stand back up.\n\u2022Variations: Jump squats, pistol squats, and Bulgarian split squats.\n\n5. Planks:\n\u2022Form: Maintain a straight line from head to heels, resting on your forearms and toes. Hold the position.\n\u2022Variations: Side planks, plank with shoulder taps, and dynamic planks.\n\nWould you like to know more about other calisthenics exercises?",
            [
              {
                title: "Basic Calisthenics Exercises",
                value: "basic_calisthenics",
              },
              {
                title: "Advance Calisthenics Exercises",
                value: "advance_calisthenics",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "advance_calisthenics":
          botReply(
            "1. Handstand Push-Ups:\n\u2022Form: Perform against a wall for support. Lower your head to the ground, then push back up.\n\u2022Progression: Practice wall handstands before adding the push-up motion.\n\n2. Muscle-Ups:\n\u2022Form: Start with a pull-up, then transition to a dip by pushing your body above the bar.\n\u2022Progression: Work on explosive pull-ups and dips separately before combining them.\n\n3. Front Lever:\n\u2022Form: Hang from a bar with your body horizontal to the ground, parallel to the bar.\n\u2022Progression: Practice tuck levers and gradually extend your legs as you gain strength.\n\n4. Back Lever\n\u2022Form: Hang from a bar or rings with your body inverted and horizontal to the ground.\n\u2022Progression: Start with tuck back levers and gradually straighten your legs.\n\n5. Planche:\n\u2022Form: Balance your body parallel to the ground on your hands, with your feet off the ground.\n\u2022Progression: Practice frog stands and tuck planches before attempting the full planche.\n\nWould you like to know more about other calisthenics exercises?",
            [
              {
                title: "Basic Calisthenics Exercises",
                value: "basic_calisthenics",
              },
              {
                title: "Advance Calisthenics Exercises",
                value: "advance_calisthenics",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "nutrition_advice":
          botReply(
            "Here are some tips for optimizing your nutrition to support your fitness goals:",
            [
              {
                title: "Balanced Diet",
                value: "balanced_diet",
              },
              {
                title: "Pre-Workout Nutrition",
                value: "pre_workout_nutrition",
              },
              {
                title: "Post-Workout Nutrition",
                value: "post_workout_nutrition",
              },
              {
                title: "Hydration",
                value: "hydration",
              },
              {
                title: "Supplements",
                value: "supplements",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "balanced_diet":
          botReply(
            "A balanced diet is essential for overall health and fitness. Here are some guidelines:\n\n1. Macronutrients: Ensure your diet includes a balance of carbohydrates, proteins, and fats.\n\u2022Carbohydrates: Provide energy. Sources include whole grains, fruits, and vegetables.\n\u2022Proteins: Essential for muscle repair and growth. Sources include lean meats, fish, dairy, legumes, and plant-based proteins.\n\u2022Fats: Important for hormone production and energy. Sources include avocados, nuts, seeds, and olive oil.\n\n2. Micronutrients: Include vitamins and minerals to support bodily functions.\n\u2022Vitamins: Found in fruits, vegetables, and whole grains.\n\u2022Minerals: Found in dairy products, meats, and leafy greens.\n\n3. Meal Timing: Eat regular meals and snacks to maintain energy levels throughout the day.\n\n4. Portion Control: Monitor portion sizes to avoid overeating.\n\nWould you like to know more about other nutrition advice?",
            [
              {
                title: "Balanced Diet",
                value: "balanced_diet",
              },
              {
                title: "Pre-Workout Nutrition",
                value: "pre_workout_nutrition",
              },
              {
                title: "Post-Workout Nutrition",
                value: "post_workout_nutrition",
              },
              {
                title: "Hydration",
                value: "hydration",
              },
              {
                title: "Supplements",
                value: "supplements",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "end":
          botReply("You're welcome! Have a great day and happy learning!", [
            {
              title: "Cooking",
              value: "cooking",
            },
            {
              title: "Sports",
              value: "sports",
            },
            {
              title: "Gardening",
              value: "gardening",
            },
            {
              title: "Fitness",
              value: "fitness",
            },
            {
              title: "Arts and Craft",
              value: "arts_and_craft",
            },
          ]);
          break;
        case "pre_workout_nutrition":
          botReply(
            "Proper nutrition before a workout can help you perform better and recover faster. Here are some tips:\n\n1. Timing: Eat a meal 2-3 hours before exercising. If you’re short on time, have a small snack 30-60 minutes prior.\n\n2. Carbohydrates: Focus on easily digestible carbs to provide quick energy.\n\u2022Examples: Bananas, oatmeal, whole-grain bread, or a smoothie.\n\n3. Protein: Include a moderate amount of protein to support muscle function.\n\u2022Examples: Greek yogurt, protein shake, or eggs.\n\n4. Hydration: Drink plenty of water to stay hydrated..\n\nWould you like to know more about other nutrition advice?",
            [
              {
                title: "Balanced Diet",
                value: "balanced_diet",
              },
              {
                title: "Pre-Workout Nutrition",
                value: "pre_workout_nutrition",
              },
              {
                title: "Post-Workout Nutrition",
                value: "post_workout_nutrition",
              },
              {
                title: "Hydration",
                value: "hydration",
              },
              {
                title: "Supplements",
                value: "supplements",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "post_workout_nutrition":
          botReply(
            "Eating after a workout helps repair muscles and replenish energy stores. Here are some tips:\n\n1. Protein: Include protein to support muscle repair and growth.\n\n2. Protein: Include protein to support muscle repair and growth.\n\u2022Examples: Chicken breast, fish, tofu, or a protein shake.\n\n3. Carbohydrates: Replenish glycogen stores with carbohydrates.\n\u2022Examples: Sweet potatoes, rice, quinoa, or fruits.\n\n4. Hydration: Drink water or an electrolyte beverage to rehydrate.\n\nWould you like to know more about other nutrition advice?",
            [
              {
                title: "Balanced Diet",
                value: "balanced_diet",
              },
              {
                title: "Pre-Workout Nutrition",
                value: "pre_workout_nutrition",
              },
              {
                title: "Post-Workout Nutrition",
                value: "post_workout_nutrition",
              },
              {
                title: "Hydration",
                value: "hydration",
              },
              {
                title: "Supplements",
                value: "supplements",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "hydration":
          botReply(
            "Staying hydrated is crucial for overall health and optimal performance. Here are some tips:\n\n1. Daily Intake: Aim to drink at least 8 cups (2 liters) of water daily, more if you're active.\n\n2. Before Exercise: Drink 17-20 ounces of water 2-3 hours before exercise.\n\n3. During Exercise: Drink 7-10 ounces of water every 10-20 minutes during exercise.\n\n4. After Exercise: Drink 16-24 ounces of water for every pound lost during exercise.\n\nHydration Tips:\n\n\u2022Add a slice of lemon or cucumber to your water for flavor.\n\u2022Monitor urine color; it should be light yellow.\n\u2022Use a water bottle with marked measurements to track intake.\n\nWould you like to know more about other nutrition advice?",
            [
              {
                title: "Balanced Diet",
                value: "balanced_diet",
              },
              {
                title: "Pre-Workout Nutrition",
                value: "pre_workout_nutrition",
              },
              {
                title: "Post-Workout Nutrition",
                value: "post_workout_nutrition",
              },
              {
                title: "Hydration",
                value: "hydration",
              },
              {
                title: "Supplements",
                value: "supplements",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "supplements":
          botReply(
            "Supplements can help fill nutritional gaps and support your fitness goals. Here are some common ones:\n\n1. Protein Powder: Supports muscle repair and growth.\n\u2022Types: Whey, casein, plant-based.\n\n2. Creatine: Enhances strength and power in high-intensity workouts.\n\u2022Dosage: 3-5 grams per day.\n\n3. Branched-Chain Amino Acids (BCAAs): Help reduce muscle soreness and improve recovery.\n\u2022Dosage: 5-10 grams before or after workouts.\n\n4. Multivitamins: Ensure you’re getting essential vitamins and minerals.\n\n5.Omega-3 Fatty Acids: Support heart health and reduce inflammation.\n\u2022Sources: Fish oil supplements or algae-based for vegetarians.\n\nNote: Always consult with a healthcare professional before starting any supplement regimen.\n\nWould you like to know more about other nutrition advice?",
            [
              {
                title: "Balanced Diet",
                value: "balanced_diet",
              },
              {
                title: "Pre-Workout Nutrition",
                value: "pre_workout_nutrition",
              },
              {
                title: "Post-Workout Nutrition",
                value: "post_workout_nutrition",
              },
              {
                title: "Hydration",
                value: "hydration",
              },
              {
                title: "Supplements",
                value: "supplements",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "fitness_gear_and_equipment":
          botReply(
            " Here are some essential fitness gear and equipment for your workouts, along with detailed information on their uses and benefits:",
            [
              {
                title: "Basic Equipment",
                value: "basic_equipment",
              },
              {
                title: "Advance Equipment",
                value: "advance_equipment",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "basic_equipment":
          botReply(
            "1. Resistance Bands:\n\u2022Uses: Strength training, mobility exercises, and physical therapy.\n\u2022Benefits: Portable, versatile, and great for all fitness levels.\n\u2022Guide: Resistance Bands Workout.\n\n2. Dumbbells:\n\u2022Uses: Strength training for various muscle groups.\n\u2022Benefits: Available in different weights, suitable for progressive overload.\n\u2022Guide: Dumbbell Exercises\n\n3. Yoga Mat:\n\u2022Uses: Provides cushioning and support for floor exercises, yoga, and stretching.\n\u2022Benefits: Enhances comfort and stability during workouts.\n\u2022Guide: Yoga Mat Workouts\n\n4. Foam Roller:\n\u2022Uses: Muscle recovery, flexibility, and myofascial release.\n\u2022Benefits: Reduces muscle soreness and improves mobility.\n\u2022Guide: Foam Rolling Techniques.\n\n5. Jump Rope:\n\u2022Uses: Cardio workouts and improving coordination.\n\u2022Benefits: Burns calories, portable, and improves cardiovascular health.\n\u2022Guide: Jump Rope Workouts.\n\n6. Kettlebells:\n\u2022Uses: Strength training, cardiovascular workouts, and improving balance.\n\u2022Benefits: Versatile and effective for full-body workouts.\n\u2022Guide: Kettlebell Exercises\n\nLet me know if you like to know more about other fitness gear and equipment.",
            [
              {
                title: "Basic Equipment",
                value: "basic_equipment",
              },
              {
                title: "Advance Equipment",
                value: "advance_equipment",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "advance_equipment":
          botReply(
            "1. Pull-Up Bar:\n\u2022Uses: Upper body strength training.\n\u2022Benefits:Effective for building back, shoulder, and arm muscles.\n\u2022Guide: Pull-Up Bar Exercises.\n\n2. Adjustable Bench:\n\u2022Uses: Support for various strength training exercises.\n\u2022Benefits: Allows for a range of exercises, including bench press and incline/decline variations.\n\u2022Guide: Bench Exercises.\n\n3. Medicine Ball:\n\u2022Uses: Strength training, core workouts, and explosive exercises.\n\u2022Benefits: Enhances power, coordination, and core strength.\n\u2022Guide: Medicine Ball Workouts.\n\n4. TRX Suspension Trainer:\n\u2022Uses: Bodyweight exercises using suspension straps.\n\u2022Benefits: Versatile, portable, and great for functional training.\n\u2022Guide: TRX Workouts.\n\n5. Weight Vest:\n\u2022Uses:  Adds resistance to bodyweight exercises.\n\u2022Benefits: Increases intensity and calorie burn during workouts.\n\u2022Guide:  Weight Vest Exercises.\n\nLet me know if you like to know more about other fitness gear and equipment.",
            [
              {
                title: "Basic Equipment",
                value: "basic_equipment",
              },
              {
                title: "Advance Equipment",
                value: "advance_equipment",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "arts_and_craft":
          botReply(
            "Wonderful choice! How can I assist you with your arts and crafts endeavors today?",
            [
              {
                title: "Painting Techniques",
                value: "painting_techniques",
              },
              {
                title: "Sculpting Tips",
                value: "sculpting_tips",
              },
              {
                title: "Crafting Ideas",
                value: "crafting_ideas",
              },
              {
                title: "Art Supplies",
                value: "art_supplies",
              },
            ]
          );
          break;
        case "painting_techniques":
          botReply(
            "Exploring different painting techniques can enhance your artistic skills. Here are a few techniques you might find interesting:\n\nAcrylic Pouring\n\nAcrylic pouring involves creating abstract patterns by pouring fluid acrylic paint onto a canvas. You can mix different colors and use techniques like dirty pour, flip cup, or puddle pour to create unique effects. This method produces vibrant, unpredictable results and requires minimal equipment.\n\nWatercolor Wash\n\nWatercolor washes can create beautiful, translucent layers of color. Use the wet-on-wet technique by applying water to the paper first and then adding watercolor paint. Alternatively, the wet-on-dry technique involves applying watercolor to dry paper for more defined edges. Experimenting with these techniques can help you achieve different textures and depths.\n\nOil Painting\n\nOil painting allows for rich, textured artwork due to its slow drying time and blendability. Start by applying a thin layer of paint (underpainting) and gradually build up layers. Blending colors directly on the canvas can create smooth transitions and detailed effects. Remember to use proper ventilation and handle materials safely.\n\nPalette Knife Painting\n\nPalette knife painting uses a knife instead of a brush to apply paint, creating unique textures and effects. This technique is excellent for creating impasto (thick, textured paint) and adding dimension to your artwork. Experiment with different strokes and pressures to achieve various textures.\n\nImpasto\n\nImpasto involves applying thick layers of paint to create texture and depth. This technique can add a three-dimensional effect to your painting. Use a palette knife or a stiff brush to build up layers of paint, allowing each layer to dry before adding more.\n\nWould you like to know more about other arts and crafts endeavors?",
            [
              {
                title: "Painting Techniques",
                value: "painting_techniques",
              },
              {
                title: "Sculpting Tips",
                value: "sculpting_tips",
              },
              {
                title: "Crafting Ideas",
                value: "crafting_ideas",
              },
              {
                title: "Art Supplies",
                value: "art_supplies",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "sculpting_tips":
          botReply(
            "Sculpting allows you to create three-dimensional artwork using various materials. Here are some tips to get you started:\n\nClay Sculpting\n\nClay sculpting is a versatile medium for creating detailed sculptures. There are different types of clay, such as polymer clay (which hardens in an oven) and air-dry clay (which hardens at room temperature). Start by shaping the basic form and then add details using sculpting tools. Once your piece is complete, follow the clay’s instructions for curing.\n\nStone Carving\n\nStone carving involves removing material to reveal a form within a block of stone. Marble, soapstone, and alabaster are common choices for carving. Use chisels, hammers, and rasps to shape the stone. This technique requires patience and precision, but it can produce timeless, durable artwork.\n\nWire Sculptures\n\nWire sculptures use wire to create intricate forms and structures. This technique is excellent for making armatures (frameworks) for larger sculptures or standalone wire art. Bending and twisting wire allows for great flexibility and creativity. Pliers and wire cutters are essential tools for this process.\n\nMixed Media Sculptures\n\nMixed media sculptures combine different materials like wood, metal, glass, and found objects. This approach allows for a high level of creativity and innovation. Use adhesives, fasteners, and other tools to combine materials in interesting ways, creating unique and complex sculptures.\n\nTools and Techniques\n\nInvest in quality sculpting tools such as carving knives, modeling tools, and rasps to refine your sculptures. Experiment with different techniques and materials to discover what works best for your artistic vision. Safety is crucial, especially when working with sharp tools or hazardous materials.\n\nWould you like to know more about other arts and crafts endeavors?",
            [
              {
                title: "Painting Techniques",
                value: "painting_techniques",
              },
              {
                title: "Sculpting Tips",
                value: "sculpting_tips",
              },
              {
                title: "Crafting Ideas",
                value: "crafting_ideas",
              },
              {
                title: "Art Supplies",
                value: "art_supplies",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "crafting_ideas":
          botReply(
            "Crafting offers endless possibilities for creativity. Here are some crafting ideas to inspire your next project:\n\nPaper Crafts\n\nPaper crafts can include handmade cards, origami, paper quilling designs, and scrapbooking. Use colorful paper, scissors, glue, and embellishments to create unique paper art. Origami, the art of paper folding, can range from simple designs to complex figures.\n\nDIY Home Decor\n\nCreate personalized photo frames, wall art, or decorative items using various materials. Upcycle items like mason jars, wooden pallets, and old picture frames to create stylish and functional home decor. Techniques can include painting, decoupage, and stenciling.\n\nJewelry Making\n\nDesign and craft your own earrings, necklaces, or bracelets using beads, wire, or polymer clay. Tools such as pliers, wire cutters, and bead organizers are helpful. Experiment with different materials and techniques like wire wrapping, bead stringing, and clay molding.\n\nTextile Crafts\n\nTry your hand at sewing, embroidery, or knitting to create unique clothing, accessories, or home decor. Sewing projects can range from simple pillowcases to intricate clothing designs. Embroidery and knitting allow for detailed and personalized textile art.\n\nUpcycling Projects\n\nRepurpose old materials like glass jars, bottles, or furniture to create new and useful items. Upcycling is eco-friendly and can turn trash into treasure. For example, convert old jeans into a stylish bag or turn a wooden pallet into a rustic shelf.\n\nWould you like to know more about other arts and crafts endeavors?",
            [
              {
                title: "Painting Techniques",
                value: "painting_techniques",
              },
              {
                title: "Sculpting Tips",
                value: "sculpting_tips",
              },
              {
                title: "Crafting Ideas",
                value: "crafting_ideas",
              },
              {
                title: "Art Supplies",
                value: "art_supplies",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "art_supplies":
          botReply(
            "Having the right art supplies is essential for your creative projects. Here are some must-have supplies for various arts and crafts:\n\nDrawing and Sketching\n\n\u2022Pencils: Graphite pencils in different hardness levels (e.g., HB, 2B, 4B) for sketching and shading.\n\u2022Sketchbooks: Good quality sketchbooks with smooth or textured paper.\n\u2022Erasers: Kneaded and vinyl erasers for different erasing techniques.\n\u2022Charcoal: Charcoal sticks and pencils for rich, dark lines and shading.\n\nPainting\n\n\u2022Acrylic Paints: Versatile and fast-drying paints suitable for various surfaces.\n\u2022Watercolor Paints: Transparent paints ideal for creating soft, layered effects.\n\u2022Brushes: A variety of brushes, including flat, round, and detail brushes.\n\u2022Canvases: Stretched canvases or canvas boards for painting.\n\u2022Palettes: Use palettes to mix and hold paints.\n\nSculpting\n\n\u2022Clay: Polymer clay, air-dry clay, or other sculpting clays.\n\u2022Sculpting Tools: Carving knives, modeling tools, and rasps.\n\u2022Armature Wire: For creating frameworks for sculptures.\n\u2022Modeling Compound: For adding details and textures.\n\nCrafting\n\n\u2022Glue: Hot glue, craft glue, and adhesive tapes for various projects.\n\u2022Scissors: Sharp scissors for cutting paper, fabric, and other materials.\n\u2022Paper: Colored paper, cardstock, and specialty papers.\n\u2022Beads: Beads in various shapes, sizes, and colors for jewelry making.\n\u2022Yarn and Fabric: For knitting, sewing, and other textile crafts.\n\nGeneral Tools\n\n\u2022Rulers: For precise measurements and straight lines.\n\u2022Cutting Mats: Protect your work surface while cutting materials.\n\u2022Tape: Masking tape, painter's tape, and double-sided tape for various uses.\n\u2022Storage Containers: Organize and store your art supplies efficiently.\n\nWould you like to know more about other arts and crafts endeavors?",
            [
              {
                title: "Painting Techniques",
                value: "painting_techniques",
              },
              {
                title: "Sculpting Tips",
                value: "sculpting_tips",
              },
              {
                title: "Crafting Ideas",
                value: "crafting_ideas",
              },
              {
                title: "Art Supplies",
                value: "art_supplies",
              },
              {
                title: "End",
                value: "end",
              },
            ]
          );
          break;
        case "end":
          botReply("You're welcome! Have a great day and happy learning!", [
            {
              title: "Cooking",
              value: "cooking",
            },
            {
              title: "Sports",
              value: "sports",
            },
            {
              title: "Gardening",
              value: "gardening",
            },
            {
              title: "Fitness",
              value: "fitness",
            },
            {
              title: "Arts and Craft",
              value: "arts_and_craft",
            },
          ]);
          break;
        default:
          botReply(
            "I'm sorry, I didn't understand that. Can you please try again?",
            [
              {
                title: "End",
                value: "end",
              },
            ]
          );
      }
    }, 1000);
  };

  const botReply = (text, quickReplies = null) => {
    const botMessage = {
      _id: nextMessageId(),
      text,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Bot",
      },
      quickReplies: quickReplies
        ? {
            type: "radio",
            keepIt: true,
            values: quickReplies.map((reply) => ({
              title: reply.title,
              value: reply.value,
            })),
          }
        : null,
    };

    setMessages((previousMessages) => {
      setIsTyping(false);
      return GiftedChat.append(previousMessages, [botMessage]);
    });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      onQuickReply={(quickReplies) => onQuickReply(quickReplies)}
      user={{
        _id: 1,
      }}
      isTyping={isTyping}
      renderBubble={(props) => (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#0084ff",
            },
          }}
        />
      )}
      renderInputToolbar={(props) => (
        <InputToolbar
          {...props}
          containerStyle={{
            borderTopWidth: 1,
            borderTopColor: "#e8e8e8",
          }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
