import * as React from "react";
import { Rating, RatingSize, } from "@fluentui/react/lib"; 
import { useState, useEffect} from "react";
import { initializeIcons} from '@fluentui/react/lib';
import useInit from "./useInit"


export interface IProps {
    
    rating: number|undefined;   
    onChange: (rating:number|undefined) => void;
}


const RatingControl = (props:IProps): JSX.Element => {

     //STATE VARIABLES
     const [rating, setRating] = useState<number|undefined>(props.rating);
     //const [isLoading, setIsLoading] = useState<boolean>(true);
    


    //EFFECT HOOKS
    //-Initialization : will happen only once = like a contructor
    // useEffect(() => {
    //     initializeIcons();
    //     console.log("useEffect - initialization");
    //     setIsLoading(false);
    // }, []); 

    const init = useInit(() => {
        initializeIcons();
    });

    //WHEN rating changes, 
    //if value is different from the one received from PROPS
    //Send value back to PCF
    useEffect(() => {
        console.log("RatingControl - useEffect rating changed : " + rating);
        if(rating !== props.rating)
        {
            console.log("=> props.onChange(" + rating + ")");
            props.onChange(rating);
        }
        
    }, [rating]);  

    useEffect(() => {
        console.log("RatingControl - useEffect props changed : " + props.rating);
        if(rating !== props.rating)
        {
            setRating(props.rating)
        }
        
    }, [props.rating]);  


    
    const onStarChange = (ev: React.FocusEvent<HTMLElement>, rating?: number): void => {
        console.log("RatingControl - onStarChanged : " + rating)
        setRating(rating);
    };


    console.log("RatingControl - Rendering : init.loaded = " + init.loaded)
    return <div>
            {init.loaded &&   
                <Rating
                    min={0} 
                    max={5}
                    size={RatingSize.Large}
                    rating={rating}
                    onChange={onStarChange}
                    allowZeroStars={true}
                />
            }
        </div>; //empty while loading 
     
}
export default RatingControl;



