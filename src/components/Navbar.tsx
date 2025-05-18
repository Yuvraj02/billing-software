import { useState} from "react";
import { MdMenu } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";


const products:string[] = ['Kurta', 'Salvaar', 'Churidar', 'Pant', 'Plazo', 'Blouse']

//Since this interface has just one piece, we will use the prop directly
// interface ExtendedNavBar{
//     handleOnNavExtended : () =>void, // Means this interface has a function that takes no arguements and returns void
// }

function Navbar(){

    const [navExtended, setNav] = useState<boolean>(false)

    const handleExtendNav = ():void => {
        setNav(true)
        console.log(navExtended)
    }

    const handleShrinkNav= ():void => {
        setNav(false)
        console.log(navExtended)
    }

    return (<>
      <div className="relative h-10 flex justify-between">
        <div>
        <MdMenu
          className={`absolute text-2xl cursor-pointer m-2 z-2 ${navExtended ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100  transition-opacity duration-300 ease-in-out'}`}
          onClick={handleExtendNav}
        />
        <div
          className={`absolute z-1 top-0 left-0 h-screen w-60  bg-black shadow-md transition-transform duration-300 ease-in-out transform ${
            navExtended ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <ExtendedNavBar handleShrinkNav={handleShrinkNav} />
        </div>
        </div>
        <div className="p-2 absolute left-1/2 -translate-x-1/2">
            <h1>LOGO</h1>
        </div>
        <div className="p-2">
            <h2>Account</h2>
        </div>
      </div>
      </>)

}

export default Navbar

function ExtendedNavBar({handleShrinkNav}:{handleShrinkNav:()=>void}) {

    return <div className="w-60 border-r rounded-xl flex-col h-screen">
        <div className="w-full  flex justify-end p-2 "><MdArrowBack onClick={handleShrinkNav} className="text-2xl cursor-pointer" /></div>
        <div className="my-2">
            <ul className="my-3 text-center" >
                {products.map((item, index) => {
                    return (<li key={index} className="border-b p-2 cursor-pointer hover:bg-neutral-900">{item}</li>);
                })}
                {/* <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li> */}
            </ul>
        </div>
    </div>;
}
