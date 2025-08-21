import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="text-white flex flex-col justify-center items-center h-[44vh] gap-4 pt-4">
        <div className="font-bold text-5xl flex justify-center items-center gap-2">Buy me a chai<span><img src="/tea.gif" width={70} alt="" /></span></div>


        <p>A crowdfunding platform for creators. Get funded by your fans and followers. Start now!</p>

        <div>
          <button type="button" className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>

          <button type="button" className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </div>

      </div>

      <div className="bg-white opacity-10 h-1"></div>

      <div className="container mx-auto text-white pb-32">
        <h2 className="text-3xl font-bold text-center my-14" >Your fans can Buy you a chai</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center">
            <img className="bg-slate-400 rounded-full p-2" width={88} src="/man.gif" alt="" />
            <p className="font-bold">Support as an Individual</p>
            <p className="text-center text-gray-400 text-sm">Receive direct support from your fans and followers.</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center">
            <img className="bg-slate-400 rounded-full p-2" width={88} src="/dollar.gif" alt="" />
            <p className="font-bold">Monetary Contributions</p>
            <p className="text-center text-gray-400 text-sm">Collect funds easily and securely for your creative work.</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center">
            <img className="bg-slate-400 rounded-full p-2" width={88} src="/group.gif" alt="" />
            <p className="font-bold">Grow Your Community</p>
            <p className=" text-gray-400 text-sm">Build a loyal community that believes in your vision.</p>
          </div>
        </div>
      </div>

      <div className="bg-white opacity-10 h-1"></div>

      <div className="container mx-auto text-white pb-32">
        <h2 className="text-3xl font-bold text-center my-14" >Learn more about us</h2>
        <div className="px-1 md:px-5 mt-20">
          <p className="p-4 text-gray-200 text-md text-center font-sans">At Get Me A Chai, we are dedicated to supporting developers, creators, and influencers by connecting them with their supporters. Our platform enables individuals to fund their projects and ideas, providing a space where creativity and innovation can thrive.</p>
          <p className="p-4 text-gray-200 text-md text-center font-sans">Our mission is to empower talented individuals by facilitating financial support, allowing them to focus on what they do best - creating. Whether you're a developer coding the next big app, a content creator making engaging videos, or an influencer sharing your passion, Get Me A Chai is here to help you achieve your goals.</p>
          <p className="p-4 text-gray-200 text-md text-center font-sans">We believe in the power of community and the impact of collective support. By providing a platform for patrons to contribute, we aim to transform dreams into reality and foster a culture of creativity and innovation.</p>
        </div>
      </div>
    </>
  );
}