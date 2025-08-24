import { Cityprops } from "@/interfaces";
import { useEffect, useState } from "react";

const Cityapi: React.FC=()=>{
    const[search, setSearch] = useState("")
    const[debouncedsearch, setDebouncedsearch] =useState("")
    const[cities, setCities]= useState<Cityprops[]>([])
    const[loading, setLoading] = useState(false)
    const[error, setError]= useState<Error|null>(null)

useEffect(()=>{
const timer = setTimeout(()=>{
    setDebouncedsearch(search)
},2000)
return()=>clearTimeout(timer)
},[search])

useEffect(()=>{
if(debouncedsearch) {

const fetchcities=async()=>{
setLoading(true)
setError(null)

const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${debouncedsearch}`;
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'e8626c0a74msh4e252dfa9e03cb3p143479jsnb7c47e762bcd',
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }
};

try {
    const response = await fetch(url, options);
    const result = await response.json();
    setCities(result.data|| [])
    console.log(result);
} catch (error) {
    console.error(error);
}finally{
    setLoading(false)
}
    
}
fetchcities()

}
},[debouncedsearch])

if(loading) return <p>Fetching cities information...</p>
if (error) return <p className="text red-600">Error {error.message} </p>


    return(
        <div className="p-4 max-w-6xl mx-auto bg-white rounded-xl shadow-md sm:p-6 lg:p-8 mt-8 border border-blue-200">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-blue-400 tracking-tight leading-tight mb-8 animate-bounce">Discover Cities Worldwide</h1>
        <div className="mb-4 bg-blue-100 p-4 rounded-lg">
            <form>
                <input 
                type="text" 
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search a city globally" className="w-full sm:w-40 md:w-80 lg:w-96 p-2 sm:p-3 border rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"/>
            </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-green-200 p-4 rounded-lg">
            {Array.isArray(cities) && cities.length >0?(
        cities.map((city)=>(
            <div key={city.id} className="mb-4 p-4 border rounded-lg shadow-sm bg-white hover:shadow-lg transition-shadow duration-200
">
            <p className="text-xl font-bold text-blue-700"><strong>Name</strong>: {city.name} </p>
            <p className="text-700 text-black"><strong>City</strong>:  {city.city}-{city.country} </p>
            <p className="text-600 text-black"><strong>Region</strong>:  {city.region} </p>
            <p className="text-600 text-black"><strong>Population</strong>:  {city.population} |{city.timezone} </p>
            

            </div>
        ))
        ):(
            !loading && <p> No cities Found</p>

        )}
        </div>

        </div>
    )
}
export default Cityapi;