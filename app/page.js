import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="text-white flex flex-col justify-center items-center h-[44vh] gap-4 pt-4 px-4 text-center">
        <div className="font-bold text-3xl sm:text-4xl md:text-5xl flex justify-center items-center gap-2 flex-wrap">
          Buy me a chai
          <span>
            <img src="/tea.gif" width={60} className="inline-block" alt="tea" />
          </span>
        </div>

        <p className="max-w-xl text-sm sm:text-base">
          A crowdfunding platform for creators. Get funded by your fans and followers. Start now!
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href={"/login"}>
            <button
              type="button"
              className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Start Here
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white opacity-10 h-1 my-6"></div>

      {/* Features Section */}
      <div className="container mx-auto text-white pb-20 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center my-10">
          Your fans can Buy you a chai
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {[
            {
              img: "/man.gif",
              title: "Support as an Individual",
              desc: "Receive direct support from your fans and followers.",
            },
            {
              img: "/dollar.gif",
              title: "Monetary Contributions",
              desc: "Collect funds easily and securely for your creative work.",
            },
            {
              img: "/group.gif",
              title: "Grow Your Community",
              desc: "Build a loyal community that believes in your vision.",
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-3 flex flex-col items-center text-center">
              <img className="bg-slate-400 rounded-full p-2" width={88} src={item.img} alt={item.title} />
              <p className="font-bold">{item.title}</p>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white opacity-10 h-1 my-6"></div>

      {/* About Section */}
      <div className="container mx-auto text-white pb-20 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center my-10">Learn more about us</h2>
        <div className="mt-10 space-y-6">
          {[
            "At Get Me A Chai, we are dedicated to supporting developers, creators, and influencers by connecting them with their supporters. Our platform enables individuals to fund their projects and ideas, providing a space where creativity and innovation can thrive.",
            "Our mission is to empower talented individuals by facilitating financial support, allowing them to focus on what they do best - creating. Whether you&apos;re a developer coding the next big app, a content creator making engaging videos, or an influencer sharing your passion, Get Me A Chai is here to help you achieve your goals.",
            "We believe in the power of community and the impact of collective support. By providing a platform for patrons to contribute, we aim to transform dreams into reality and foster a culture of creativity and innovation.",
          ].map((text, idx) => (
            <p key={idx} className="text-gray-200 text-sm sm:text-base text-center font-sans px-2">
              {text}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}