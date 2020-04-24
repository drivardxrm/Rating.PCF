import  { useState, useEffect } from "react";
///EXAMPLE OF CUSTOM HOOK

function useInit(initfunction:()=>void) {
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        initfunction(); //Execute initialization function
        console.log("useInit - initfunction executed");
        setLoaded(true);
    }, []);
    console.log("useInit - return " + loaded)
    return {loaded};
} 
export default useInit;