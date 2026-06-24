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


     
    ],

  
  }
];