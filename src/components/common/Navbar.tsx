import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import sanjhikala_logo from '../../assets/sanjhikala_logo.jpg'
import { MdOutlineAccountCircle } from "react-icons/md";
import { useAppSelector } from "../../hooks";
import DropDownMenu from "./DropdownMenu";
import { NavLink } from "react-router";

//Since this interface has just one piece, we will use the prop directly
// interface ExtendedNavBar{
//     handleOnNavExtended : () =>void, // Means this interface has a function that takes no arguements and returns void
// }

function Navbar() {

  const [navExtended, setNav] = useState<boolean>(false)

  const handleExtendNav = (): void => {
    setNav(true)
    //console.log(navExtended)
  }

  const handleShrinkNav = (): void => {
    setNav(false)
    //console.log(navExtended)
  }

  return (<>
    <div className="relative h-10 flex justify-between">
      <div>
        <MdMenu
          className={`absolute text-2xl cursor-pointer m-10 z-2 ${navExtended ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100  transition-opacity duration-300 ease-in-out'}`}
          onClick={handleExtendNav}
        />
        <div
          className={`absolute z-1 top-0 left-0 h-screen w-60  bg-black shadow-md transition-transform duration-300 ease-in-out transform ${navExtended ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <ExtendedNavBar handleShrinkNav={handleShrinkNav} />
        </div>
      </div>
      <div className="p-2 absolute left-1/2 -translate-x-1/2">
        <img src={sanjhikala_logo} className="h-25" alt="Sanjhikala Logo" />
      </div>
      <div className="p-2 m-9">
        <MdOutlineAccountCircle className="text-3xl font-light" />
      </div>
    </div>
  </>)

}

export default Navbar

function ExtendedNavBar({ handleShrinkNav }: { handleShrinkNav: () => void }) {

  const categories = useAppSelector((state) => state.categories.categories)
  const [trigger, setTrigger] = useState<boolean>(false)

  return <div className="w-60 border-r rounded-xl flex-col h-screen">
    <div className="w-full  flex justify-end p-2 "><MdArrowBack onClick={handleShrinkNav} className="m-2 text-2xl cursor-pointer" /></div>
    <div className="my-2">
      <ul className="my-3 text-center" >
        <NavLink to={"/"}><li className="border-t p-2 cursor-pointer hover:bg-neutral-900">Home</li></NavLink>
        <NavLink to={"/add_category"}><li className="border-t p-2 cursor-pointer hover:bg-neutral-900">Add Category</li></NavLink>
        <li className="">
          <div className="relative"><DropDownMenu className="border-t p-2 cursor-pointer hover:bg-neutral-900" buttonText="Categories" setTrigger={setTrigger} trigger={trigger}>
            {categories.map((value, index) => { if (value.category_name == "None") { return (<></>) } return (<div className="p-2 cursor-pointer hover:bg-neutral-800" key={index}>{value.category_name}</div>) })}
          </DropDownMenu></div></li>
      </ul>
    </div>
  </div>;
}
