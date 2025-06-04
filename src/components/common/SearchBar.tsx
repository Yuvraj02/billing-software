function SearchBar({title}:{title:string}) {

    return (<>

    <input className= "border rounded-xl px-2 py-1 text-amber-50" type="text" placeholder={`Search via ${title}`}/>

    </>)
}

export default SearchBar