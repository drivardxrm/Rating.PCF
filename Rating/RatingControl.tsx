import * as React from "react";
import { RatingBase, Rating, RatingSize, IRating,initializeIcons, IRatingProps } from "@fluentui/react"; 
import { useState, useEffect, useRef} from "react";
import {useConst} from "@uifabric/react-hooks";
import usePrevious from "./usePrevious"



export interface IProps {
    
    rating: number|undefined;   
    onChange: (rating:number|undefined) => void;
}


const RatingControl = (props:IProps): JSX.Element => {

    //REF Object
    const ratingRef = useRef<IRating>(null);
    
    //STATE VARIABLES
    const [rating, setRating] = useState<number>(props.rating ?? 0);
     
    //PREVIOUS 
    // Get the previous value (was passed into hook on last render)
    const previousRating = usePrevious(rating);
    
    //Will run once on first render, like a constructor
    useConst(() => {
        initializeIcons();
    });

    //EFFECT HOOKS
    useEffect(() => {
        //console.log("RatingControl - useEffect rating changed : " + rating);
        
        //if value is different from the one received from PROPS
        if(rating !== props.rating)
        {
            //Send value back to PCF
            //console.log("=> props.onChange(" + rating + ")");
            props.onChange(rating);
        }
        
    }, [rating]);  //WHEN rating changes, 

    useEffect(() => {
        //console.log("RatingControl - useEffect props changed : " + props.rating);
        if(rating !== props.rating)
        {
            setRating(props.rating ?? 0)
        }
        
    }, [props.rating]);  

    const onStarChange = (ev: React.FocusEvent<HTMLElement>, rating?: number): void => {
        //console.log("RatingControl - onStarChanged : " + rating)
        //setRating(rating ?? 0); //=> use setter to update state variable
    };

    const onClickEvent = (ev: React.MouseEvent<HTMLElement>): void => {
        console.log("Clicked : ");

        console.log("Previous: " + rating);
        if(ratingRef.current !== null){
            let current:RatingBase = ratingRef.current as RatingBase;
            let newRating = current.state.rating as number;
            console.log("New: " + newRating);

            setRating(newRating === rating ? 0 : newRating);
        }

    };

    

    console.log("RatingControl - Rendering : rating = " + rating)
    return (
    
        <Rating
            componentRef={ratingRef}    
            min={0} 
            max={5}
            size={RatingSize.Large}
            rating={rating}
            //onChange={onStarChange}
            allowZeroStars={true}
            onClick={onClickEvent}
            
        />
    );

            

         
     
}
export default RatingControl;



