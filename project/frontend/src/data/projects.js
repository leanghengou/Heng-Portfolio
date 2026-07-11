import startNowFeaturedImg from "../resources/start-now-featured-img.webp"
import startnowmultiimg1 from "../resources/start-now-imgs/startnow-multi-img-1.png"
import startnowmultiimg2 from "../resources/start-now-imgs/startnow-multi-img-2.png"
import startnowmultiimg3 from "../resources/start-now-imgs/startnow-multi-img-3.png"
import startnowmultiimg4 from "../resources/start-now-imgs/startnow-multi-img-4.png"
import startnowmultiimg5 from "../resources/start-now-imgs/startnow-multi-img-5.png"
import startnowmultiimg6 from "../resources/start-now-imgs/startnow-multi-img-6.png"
import personOne from "../resources/person-one.png"
import personTwo from "../resources/person-two.png"
import personThree from "../resources/person-three.png"
import searchIconOne from "../resources/search-icon-1.png"
import searchIconTwo from "../resources/search-icon-2.png"
import theirry from "../resources/theirry.png"
import wireframesImg from "../resources/wireframes.png"
import wireframesImg2 from "../resources/wireframes-2.png"
import wireframesImg3 from "../resources/wireframe-illustration.png"
import brandIcons from "../resources/start-now-icon-04.png"
import wireframeScreenshot from "../resources/wireframe-screenshot.png"
import beforeAfterimgOne from "../resources/before-after-img-1.png"
import beforeAfterimgTwo from "../resources/before-after-img-2.png"
import beforeAfterimgThree from "../resources/before-after-img-3.png"
import beforeAfterimgFour from "../resources/before-after-img-4.png"
import beforeAfterimgFive from "../resources/before-after-img-5.png"
import beforeAfterimgSix from "../resources/before-after-img-6.png"
import beforeAfterimgSeven from "../resources/before-after-img-7.png"
import beforeAfterimgEight from "../resources/before-after-img-8.png"
import beforeAfterimgNine from "../resources/before-after-img-9.png"
import beforeAfterimgTen from "../resources/before-after-img-10.png"
import beforeAfterimgEleven from "../resources/before-after-img-11.png"
export const projects = [
  {
    slug: "start-now-app",
    title: "Start Now",
    category: "User Experience Research & User Interface",
    cover: startNowFeaturedImg,
    intro: {
      description: "StartNow is my first UX case study project that I did in order to learn about UX process, and strategy. I also designed visual for the project to make it both UI and UX project.",
      role: "UX reseacher & Visual designer",
      stack: ["React", "CSS", "Figma"],
      tools:["Figma", "Adobe Illustrator", "Adobe Illustrator", "Adobe Illustrator"],
      duration: "8 weeks",
    },

    sections: [
      {
        type: "bubble-text-badge",
        title: "Design Process",
        content:["Project Assessment","Competitive Analysis", "User Research","Ideate", "Information Architecture", "Wireframes", "UI choice", "Test", "Final Product" ]
      },

       {
        type: "multi-gallery-blocks",
        title: "Project Assesment",
        subtitle:"About",
        description:"StartNow is the fitness application that helps to provide a comfortable fitness tool to help people reach their goal and guide them effective ways on how to do exercise.",
        images:[startnowmultiimg1, startnowmultiimg2,startnowmultiimg3,startnowmultiimg4,startnowmultiimg5,startnowmultiimg6]
      },


       {
        type: "rich-text-section",
        title: "What value will it provide?",
        subtitle:"",
        description:"StartNow introduces the users to effective workout method from fitness professionals and record system on users daily workout activity.",
      },



      {
        type: "rich-text-section",
        title: "Challange and problem",
        subtitle:"",
        description:"These days there are many distractions that move people away from their workout routine, it destroy the desciplin. We are trying to solve users problems by providing them tool which help them be consistent to their routine.",
      },


       {
        type: "rich-text-section",
        title: "Target market",
        subtitle:"",
        description:"There are 3 groups that StartNow is targeting, primary target, secondary target, tertiary target. Pimary is the most important one, in fact it’s the group we mostly empthazise on. Primary group are those who are around age 18 to 25 years old, this group are mostly students, young adults who do have time to workout want to have better body, but they need guidance, or they are not so socialize with others. They need something to help maintain their discipline. Secondary group is the group we also focus on. Those are around 25 to 35 years old, they are adult people, and mostly independent. Their goals are mostly intent to stay fit, improve mental health and get good shape. The tertiary group is we care about. People who are around 45 to 65 years old. Their goals are to stay healthy, mantaine their physicle health.",
      },
      {
  type: "circle-image-cards",
  title: "Target Market",
  cards: [
    {   image:personOne, title: "Primary Group",   subtitle: "18 to 25 years old" },
    { image:personTwo, title: "Secondary Group", subtitle: "25 to 35 years old" },
    { image:personThree, title: "Tertiary Group",  subtitle: "45+ Years old" },
  ],
        },


        {
        type: "rich-text-section",
        title: "Direct Competitors",
        subtitle:"",
        description:"In any industry learning about the surround environment is crucial, especially for new company. I studied the two mobile apps that I recognize them as direct competitors.",
      },


         {
        type: "rich-text-section",
        title: "Peloton",
        subtitle:"",
        description:"Peloton is known for their original Peloton Bike, user can do home exercise with their bike while connecting with its screen that allow users to workout many classes. But, right now Peloton is not just the app for bike, they have been expanding into different workout classes, like running, yoga, and other equipment workouts.",
      },

{
  type: "bordered-text-cards",
  cards: [
    {
      title: "Strength",
      body: [
        "Peloton has their own workout physicle products that connect with their app",
        "The app design is comfortable to use, and not overflow with visuals",
        "There many of programes or acitivities in the app",
      ],
    },
    {
      title: "Weakness",
      body: "Expensive, the subcribe is not the ideal for young adults who have difficult in finance",
    },
    {
      title: "Opportunities",
      body: [
        "People who have Peloton physicle products will tend to use or stay with the app.",
        "The app design make the users feel comfortable which tend to keep users using it.",
        "Users love having many programmes that could attract other users",
      ],
    },
    {
      title: "Threats",
      body: "Tend to push people potential users away when they see the price",
    },
  ],
},

    


   {
        type: "rich-text-section",
        title: "Nike ",
        subtitle:"",
        description:"Nike is a famous footwear brand, it is known globally. Nike has their own workout app that provide free workout classes to users.",
      },



{
  type: "bordered-text-cards",
  cards: [
    {
      title: "Strength",
      body: [
        "Good brand reputation",
        "There are free clsses for users",
        "Most classes don't require requipments",
      ],
    },
    {
      title: "Weakness",
      body: [
        "Unlike Peloton there seem to not have many workout classes or programmes",
        "Most of the classes are not workout equipment exercises. This leads to what if users have equipement? Will they find other app who have equipment exercises classes?",
      ],
    },
    {
      title: "Opportunities",
      body: [
        "As a well known brand, people tend to be interested to try out",
        "It's nice for users that they could use app from a well-known brand and doesn't require payment",
        "People who like to workout at home will love it! Because they might not have many equipemnts at home",
      ],
    },
    {
      title: "Threats",
      body: [
        "Users who want to have equipment workout will look for other apps that give it",
      ],
    },
  ],
},

  {
        type: "rich-text-section",
        title: "Interviews",
        subtitle:"",
        description:"I have interviewed more than 20 people on video call and phone, those people are the specific group that StartNow is targeting, they are between 17 to 25 years old. Among the 20 people, 6 of them are people who on their workout routine and self-transformation period. I asked dozen of important questions to know more about their journey, motivation, goal, difficulty, and their views on fitness app in general. Just to get an idea and build empathy for the potential users in order to understand on can StartNow solve their product and help smoothing the way for users to reach their desire destination.",
      },




      {
        type: "rich-text-section",
        title: "Interviews",
        subtitle:"",
        description:"I have interviewed more than 20 people on video call and phone, those people are the specific group that StartNow is targeting, they are between 17 to 25 years old. Among the 20 people, 6 of them are people who on their workout routine and self-transformation period. I asked dozen of important questions to know more about their journey, motivation, goal, difficulty, and their views on fitness app in general. Just to get an idea and build empathy for the potential users in order to understand on can StartNow solve their product and help smoothing the way for users to reach their desire destination.",
      },


     {
  type: "research-stats-section",
  stats: [
    { icon: searchIconOne, value: "22", label: "Interviews" },
    { icon: searchIconTwo, value: "17 - 26", label: "Years old" },
  ],
},

{
        type: "rich-text-section",
        title: "Insight",
        description:"Through the interview process, I found some interesting insights about the potential users. I would like to bring up 3 interesting questions that I asked and the responses.",
      },


{
  type: "survey-cards-carousel",
  cards: [
    {
      question: '"What are things that force you to not working out or distracting you?"',
      results: [
        { percent: "43%", text: "Not motivated, don't feel any push." },
        { percent: "37%", text: "Busy schedule, due to work and school." },
        { percent: "20%", text: "Other reasons" },
      ],
    },
    {
      question: '"What are the features you are looking for in fitness app?"',
      results: [
        { percent: "53%", text: "Routine setup, or schedule" },
        { percent: "19%", text: "Nutrition plan" },
        { percent: "17%", text: "Record System" },
        { percent: "11%", text: "Others" },
      ],
    },
    {
      question: '"What are your expectations from fitness app?"',
      results: [
        { percent: "46%", text: "Provide guideline how to workout in the right way" },
        { percent: "27%", text: "Affordable" },
        { percent: "27%", text: "Others" },
      ],
    },
  ],
},


      {
        type: "rich-text-section",
        title: "Affirnity Diagram",
        description:"Through the interview process, I found some interesting insights about the potential users. I would like to bring up 3 interesting questions that I asked and the responses.",
      },

      {
        type: "start-now-affinity-diagram",
      },
      {
        type: "rich-text-section",
        title: "Persona",
        description:"After gathering informations from interview and carefully analysis the informations, I combine all of it into 2 different personality or person.",
      },


      {
        type: "persona-cards-section",
        personas: [
          {
            image: theirry,
            name: "Jett Barclay",
            age: "22 years old",
            role: "Marketing Strategist",
            gender: "Male",
            quote:
              '"I really want to get better shape but these days I am so busy at work. But I do workout sometimes"',
            goals: [
              "Stay healthy",
              "Get better body",
              "Prefer fitness that affordable",
            ],
            personality: ["Busy", "Introvert", "Thoughtful", "Sociable"],
            motivations: [
              "Holiday",
              "Free time",
              "Feeling inspired from social media",
            ],
            painPoints: [
              "Undisciplined",
              "Feeling tired after work",
              "Work schedule during the day",
            ],
          },
          {
            image: personTwo,
            name: "Ashley Natalie",
            age: "20 years old",
            role: "University Student",
            gender: "Female",
            quote:
              '"I think workout is a great way to stay health and taking care of our mental health."',
            goals: [
              "Stay in shape",
              "Good mental health",
              "Prefer fitness app that can sheedule and record system",
            ],
            personality: ["Sociable", "Busy", "Honest", "Cooperative"],
            motivations: [
              "Inspired from social media",
              "No assigment and free at home",
              "Holiday",
            ],
            painPoints: [
              "Hanging out too often",
              "No workout equipment",
              "Busy with assigments",
            ],
          },
        ],

      },


      {
        type: "rich-text-section",
        title: "Proposition Value Canvas",
        description:"When it comes time to really understand our potential users, and when we try to solve their problems, the Value Proposition Canvas is one of the best tool to strategies as well as help guiding us to solve customers problem. The Value Proposition Canvas was developed by Alex Osterwalder.",
      },

      {
  type: "badge-block-grid",
  blocks: [
    {
      title: "Gain",
      color: "#3aa14a",
      items: ["Feel better about themselves", "Get better body and feel confident"],
    },
    {
      title: "Pain",
      color: "#c0392b",
      items: ["Can't workout due to busy schedule", "Not motivated", "Not in the mood"],
    },
    {
      title: "Jobs to be done",
      color: "#e08a1e",
      full: true,
      items: ["Can't workout due to busy schedule", "Not motivated", "Not in the mood"],
    },
  ],
},

      {
  type: "badge-block-grid",
  blocks: [
    {
      title: "Gain creators",
      color: "#3aa14a",
      items: ["As the users have tool to set up flexible routine they could workout regulary.", "As the community and lives features could motivate and inspire users to keep the routine consistent, the users will start to feel better about their bodies and see the result."],
    },
    {
      title: "Pain relievers",
      color: "#c0392b",
      items: ["Routine set up could help the users create routine or schedule and add any type of workout any time they want.", "Community will inspire users to feel motivated as users share their achievment or stories", "Lives can create bond between users and push them to workout like the hosts even if they are not in the mood."],
    },
    {
      title: "Products and services",
      color: "#e08a1e",
      full: true,
      items: ["Add rontine set up system that the users could customize their workout routines as they want", "Create community that people can share stories and inspire others", "Add lives feature so the users can connect with other users or coaches or workout together remotely"],
    },
  ],
},



 {
        type: "rich-text-section",
        title: "Senario of new users",
        description:"This is the senario of new users when they start using StartNow. They will be introduced to free classes workout by professional as they have expected from the fitness app.",
      },

{
  type: "journey-map",
  rows: [
    {
      label: "User",
      head: true,
      cells: [
        "Login Page",
        "Sign up and Set Profile",
        "Choosing workout classes",
        "Doing Exercise",
        "Reward Screen",
      ],
    },
    {
      label: "Emotion",
      tall: true,
      merged:true,
      cells: "",
    },
    {
      label: "Speech",
      italic: true,
      cells: [
        '"Alright, let\'s try this one."',
        '"…"',
        '"Woah, many classes, I want to try this one."',
        '"Okay, okay, one, two, three, …"',
        '"Yes, I did it!"',
      ],
    },
  ],
},





{
        type: "rich-text-section",
        title: "Senario of old users",
        description:"After users use the application for more than a week and start their routine set up. They will encounter low willpower moment after they get tired from work, school or other activities. If they click on the notification or alarm from StartNow that loading on their mobile, at this point, community posts and streaming features will come into play. Clicking on one of it will inspire them to follow up with others who share inspiring stories, streaming workout activity, and sharing tranformation result. These factors create movitation for many to keep going even if they don’t like to.",
      },




{
  type: "journey-map",
  rows: [
    {
      label: "User",
      head: true,
      cells: [
        "Login Page",
        "Sign up and Set Profile",
        "Choosing workout classes",
        "Doing Exercise",
        "Reward Screen",
      ],
    },
    {
      label: "Emotion",
      tall: true,
      merged:true,
      cells: "",
    },
    {
      label: "Speech",
      italic: true,
      cells: [
        '"Alright, let\'s try this one."',
        '"…"',
        '"Woah, many classes, I want to try this one."',
        '"Okay, okay, one, two, three, …"',
        '"Yes, I did it!"',
      ],
    },
  ],
},






{
  type: "rich-text-images",
  title: "Paper wireframes",
  description:
    "I planned how these contents would look like in the actual app by sketching the wireframe on my personal Ipad.",
  images: [wireframesImg, wireframesImg2],
},





{
  type: "text-image-split",
  title: "",
  text: "Wireframes for exercising classes and challanges.",
  image: wireframesImg,
  textPosition: "left",   // "left" = text on left (as in your mockup), "right" = text on right
},



{
  type: "text-image-split",
  title: "",
  text: "Wireframes for routine setting and lives feature.",
  image: wireframesImg2,
  textPosition: "left",   // "left" = text on left (as in your mockup), "right" = text on right
},





{
  type: "rich-text-images",
  title: "Digital Wireframes",
  description:
    "As the plan is finished, I built and corrected some points. And, see what it might look like.",
  images: wireframesImg3,
},



      
{ type: "style-guide" },





{
  type: "text-image-split",
  title: "Users agree that the color on Statisic looks too hard",
  text: "Users thinks the green color on the dashboard is too hard. I decide to transform the original color to green gradient in order to improve overall visual look while maintaining the brand color.",
  image: beforeAfterimgOne,
  textPosition: "right",   // "left" = text on left (as in your mockup), "right" = text on right
},




{
  type: "text-image-split",
  title: "“My Routine” part needs to show progress",
  text: "Users want to know their progress during they are on their routine. When will the routine end? How far have we reached?",
  image: beforeAfterimgTwo,
  textPosition: "left",   // "left" = text on left (as in your mockup), "right" = text on right
},






{
  type: "text-image-split",
  title: "“My Routine” part needs to show progress",
  text: "Users want to know their progress during they are on their routine. When will the routine end? How far have we reached?",
  image: beforeAfterimgThree,
  textPosition: "right",   
},


{
  type: "text-image-split",
  title: "“My Routine” part needs to show progress",
  text: "Users want to know their progress during they are on their routine. When will the routine end? How far have we reached?",
  image: beforeAfterimgFour,
  textPosition: "left",   
},

{
  type: "text-image-split",
  title: "“My Routine” part needs to show progress",
  text: "Users want to know their progress during they are on their routine. When will the routine end? How far have we reached?",
  image: beforeAfterimgFive,
  textPosition: "right",   
},


{
  type: "text-image-split",
  title: "“My Routine” part needs to show progress",
  text: "Users want to know their progress during they are on their routine. When will the routine end? How far have we reached?",
  image: beforeAfterimgSix,
  textPosition: "left",   
},



{
  type: "text-image-split",
  title: "“My Routine” part needs to show progress",
  text: "Users want to know their progress during they are on their routine. When will the routine end? How far have we reached?",
  image: beforeAfterimgSeven,
  textPosition: "right",   
},


{
  type: "text-image-split",
  title: "“My Routine” part needs to show progress",
  text: "Users want to know their progress during they are on their routine. When will the routine end? How far have we reached?",
  image: beforeAfterimgEight,
  textPosition: "left",   
},




{
  type: "text-image-split",
  title: "“My Routine” part needs to show progress",
  text: "Users want to know their progress during they are on their routine. When will the routine end? How far have we reached?",
  image: beforeAfterimgNine,
  textPosition: "right",   
},




{
  type: "rich-text-images",
  title: "Digital Wireframes",
  description:
    "As the plan is finished, I built and corrected some points. And, see what it might look like.",
   images: beforeAfterimgTen,
},


{
  type: "text-image-split",
  title: "“My Routine” part needs to show progress",
  text: "Users want to know their progress during they are on their routine. When will the routine end? How far have we reached?",
  image: beforeAfterimgEleven,
  textPosition: "left",   
},



    ],

  
  }
];
