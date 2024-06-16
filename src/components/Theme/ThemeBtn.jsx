import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { lightTheme, darkTheme } from "../../store/ThemeSlice";

export default function ThemeBtn() {
    
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme.themeMode)

    const onButtonChange = (e) => {
        const darkStatus = e.currentTarget.checked
        if(darkStatus){
           dispatch(darkTheme())
        }
        else{
            dispatch(lightTheme())
        }
    }


    useEffect(() => {
        document.querySelector('html').classList.remove('light', 'dark');
        document.querySelector('html').classList.add(theme)
     }, [theme])



   return (
       <label className="relative inline-flex items-center cursor-pointer">
           <input
               type="checkbox"
               value=""
               className="sr-only peer"
               onChange={onButtonChange}
               checked={theme === 'dark'}
           />
           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
       </label>
   );
}

