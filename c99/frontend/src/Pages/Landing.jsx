import React from "react";
import bg from "../assets/bg2.png";
import tutor from "../assets/tutor.png";
import courses from "../assets/image.png";
import chat from "../assets/chat.png";
import personalTutor from "../assets/personalTutor.png";
import man from "../assets/man.png";
import star from "../assets/star.png";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Landing = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen overflow-auto">
        <div className="flex justify-center items-center mt-[10px] p-4">
          <div className="bg-yellow-200 w-full h-[350px] rounded-lg flex justify-between items-center">
            <div className="flex flex-col font-serif p-4 ml-5">
              <h1 className="font-bold text-[50px]">Learn from the</h1>
              <h1 className="font-bold text-[50px]">best platflorm</h1>
              <h1 className="font-bold text-[50px]">UPSKILL</h1>
              <Link
                to="/allCourses"
                className="bg-blue-500 w-[240px] text-center font-bold text-white rounded-lg p-2 mt-5 hover:opacity-80"
              >
                Explore
              </Link>
            </div>

            <img className="h-[390px] mr-5" src={bg} />
          </div>
        </div>

        <div className="flex justify-center items-center  p-4 mt-[10px]">
          <div className="bg-blue-100 w-full  rounded-[15px]  flex flex-col p-4 h-[570px]">
            <h1 className="font-bold text-[40px] font-serif text-center mt-[20px]">
              Features that we provide
            </h1>

            <div className="flex justify-evenly items-center mt-[50px]">
              <div className="bg-white rounded-[15px] shadow-xl  h-[400px] gap-2  w-[300px] flex flex-col ">
                <img className="rounded-[15px]" src={tutor} />
                <h1 className="text-center font-bold font-serif text-[20px]">
                  We have some of the best curated questions
                </h1>
              </div>
              <div className="bg-white rounded-[15px]  shadow-xl  h-[400px] gap-2  w-[300px] flex flex-col ">
                <img className="rounded-[15px]" src={courses} />
                <h1 className="text-center font-bold font-serif text-[20px]">
                  We have best teacher who create the questions
                </h1>
              </div>
              {/* <div className="bg-white rounded-[15px] shadow-xl h-[400px] gap-2 w-[300px] flex flex-col ">
                <img className="rounded-[15px]" src={chat} />
                <h1 className="text-center font-bold font-serif text-[20px]">
                  We have got Chat Support also so that you can chat with
                  other stude
                </h1>
              </div> */}
              <div className="bg-white rounded-[15px] shadow-xl h-[400px] gap-2 w-[300px] flex flex-col">
                <img className="rounded-[15px]" src={personalTutor} />
                <h1 className="text-center font-bold font-serif text-[20px]">
                  Get your personal AI curated questions now in just few clicks
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[10px] flex justify-center items-center p-4">
          <div className="bg-blue-800 w-full h-[500px] rounded-lg flex ">
            <img className="h-[500px] ml-20" src={man} />
            <h1 className="text-white font-bold text-[60px] font-serif text-center mt-[150px] ml-[100px]">
              We are 5 star rated platform
            </h1>
            <img className="w-[800px] h-[300px] place-self-center" src={star} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
