import React, { useContext, useEffect, useState } from "react";
import "../spinner.css";
import { Appcontext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
function ChapterPage() {
  const { chapter, chapternum, loading, setloading, setversenum, versenum } =
    useContext(Appcontext);
  const [verse, setverse] = useState([]);
  const [summary, setsummary] = useState();
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1072c052eamshd1ad69429be28d4p1df838jsnffaa29a46270",
      "X-RapidAPI-Host": "bhagavad-gita3.p.rapidapi.com",
    },
  };
  async function fetchVerse() {
    setloading(true);
    try {
      const res = await fetch(
        `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapternum}/verses/`,
        options
      );
      const data = await res.json();
      setverse(data);
    } catch (e) {
      console.log("error in fetching" + e);
    }
    setloading(false);
  }
  console.log(verse)
  useEffect(() => {
    fetchVerse();
    getSummary();
  }, []);
  const navigate = useNavigate();
  function clickHandler(event) {
    setversenum(event.currentTarget.id);
    navigate("/verse")
    
  }
  function getSummary() {
    chapter?.map((obj) => {
      if (obj?.chapter_number == chapternum) {
        setsummary(obj?.chapter_summary);
      }
    });
  }
  return (
    <center>
    <div className="w-full h-100 flex flex-col justify-center items-center mt-10 ">
      {loading ? (
        <div className="custom-loader"></div>
      ) : (
        <div className="">
          <div className="w-[800px] mb-7 bg-yellow-400 font-text p-2 rounded-xl shadow-lg ">{summary}</div>

          {
          verse?.map((data, index) => {
            return (
              <div onClick={clickHandler}  id={data?.verse_number}>
                <div
                  className="bg-yellow-400 w-[450px]  text-center rounded-md gap-3 mb-3 cursor-pointer hover:scale-100"
                >
                  <p className="text-2xl  text-white ">
                    Verse {data?.verse_number}
                  </p>
                  <hr />
                  <p className="mt-1">{data?.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </center>
  );
}

export default ChapterPage;
