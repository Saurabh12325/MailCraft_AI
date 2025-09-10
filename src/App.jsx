import { useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'

function App() {
  const [emailContent, setEmailContent] = useState("")
  const [tone, setTone] = useState("")
   const[loading,setLoading] = useState(false)
   const[generatedReply,setGeneratedReply] = useState("")

   const paragraphRef = useRef(null);
const handleCopy = (ref) => {
    if (ref.current) {
      const text = ref.current.textContent;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.success("Copied to clipboard!");
        })
        .catch(() => {
          toast.error("Failed to copy!");
        });
    }
  };


   const handleClick = async() => {
    setLoading(true)
   try{
    const response =  await axios.post("https://mailcraftai.onrender.com/api/email/generate",{
    emailContent,
    tone
    
   })
   setGeneratedReply(response.data)
   console.log(response.data);
    toast.success("Email Generated Successfully")

   }catch(err){
    console.log(err);
     toast.error("Something went wrong!")
   }finally{
    setLoading(false)
  }
   }
  return (
    <>
      <div className=' h-screen relative bg-gradient-to-b from-black to-red-900  overflow-hidden overflow-y-scroll '>
        <h1 className='flex justify-center items-center mt-6 z-10 font-semibold text-3xl text-white   '> Welcome To MailCraft AI</h1>

        <div className=' relative h-[90vh]  w-[80vw] sm:w-[50vw] m-auto mt-10  backdrop-opacity-20 rounded-lg z-20 '>
          <h2 className='flex justify-center items-center mt-6 z-10 font-semibold text-2xl text-white   '> AI-powered instant email replies.</h2>
          <div className='backdrop-blur-2xl bg-white/20 opacity-60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] bg- rounded-lg shadow-lg flex flex-col justify-center items-center  '>
            <label className="text-2xl font-bold  text-white  ">
              Enter Email Content
            </label>

            <textarea
              className="w-[90%] h-[250px] overflow-y-scroll mt-5 p-3 rounded-lg outline-none text-black text-lg font-medium bg-white border-2 focus:border-blue-800 resize-none"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Write your email content here..."
            />
              <label className="block text-xl mt-4 font-semibold text-white mb-2">
            Select Email Tone
        </label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-[50%] rounded-lg border-2 border-grey-500 bg-white px-3 py-2 text-lg text-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        >
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="friendly">Friendly</option>
          <option value="formal">Formal</option>
          <option value="concise">Concise</option>
        </select>

        <button onClick={handleClick} className='backdrop-blur-2xl mt-5 h-[40px] px-1 bg-white/40 rounded-sm font-bold cursor-pointer'>
          
          {loading ? "Generating..." : "Generate Reply"}
          
        </button>
          </div>
        </div>
      {generatedReply && (
  <div className="relative w-[80vw] sm:w-[50vw] h-[50vh] sm:h-[50vh] m-auto mt-20 mb-5 p-5 backdrop-opacity-20 backdrop-blur-2xl text-white bg-red-200/15 rounded-lg z-20 overflow-y-scroll">
    <p ref={paragraphRef} className="text-lg whitespace-pre-wrap">
      {generatedReply}
    </p>

    <h3
      onClick={() => handleCopy(paragraphRef)}
      className="flex mb-2 gap-2 backdrop-blur-xl y-3 px-4 absolute top-2 right-2 cursor-pointer rounded-lg bg-black text-white"
    >
      Copy
    </h3>
  </div>
)}

{!generatedReply && (
  <p className="text-white font-black mt-2.5 text-2xl text-center">
    Your generated email reply will appear here...
  </p>
)}

        

      </div>
       <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App
