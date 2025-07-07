import Navbar from "./components/Navbar.jsx";
import RateLimitedUi from "./components/RateLimitedUi.jsx";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import NoteCard from "./components/NoteCard.jsx";
import api from "../lib/axios";
import NotesNotFound from "./components/NotesNotFound.jsx";

const HomepagePage = () => {
    const [isratelimited, setRatelimited] = useState(false);
    const[notes, setNote] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {

            try{
                const response = await api.get("/notes");
                console.log(response.data);
                setNote(response.data);
                setRatelimited(false)

            }
            catch(error){
                console.error("error in fetchData", error);
                if(error.response.status === 429){
                    setRatelimited(true)
                }
                else {
                    toast.error("Failed to get notes");
                }


            }
            finally{
                setLoading(false);
            }


        }
        fetchData()
    },[])
    return (
        <div className= "min-h-screen">
            <Navbar />
            {isratelimited && <RateLimitedUi />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary py-10">Loading...</div>}

                {notes.length === 0 && !isratelimited && <NotesNotFound />}

                {notes.length >0 && !isratelimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map(note => (
                            <NoteCard key ={note._id} note =  {note} setNote={setNote}  />
                        ))}

                    </div>
                )}

            </div>
        </div>
    )
}
export default HomepagePage;