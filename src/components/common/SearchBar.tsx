function SearchBar({title}:{title:string}) {

    return (<>

    <input id="input_field" className= "border rounded-xl px-2 py-1 text-amber-50" type="text" placeholder={`Search via ${title}`} maxLength={10}/>

    </>)
}

export default SearchBar