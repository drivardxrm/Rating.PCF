import * as React from "react";
import { ITheme, createTheme, getTheme, IRatingStyles, RatingBase, Rating, RatingSize, IRating,initializeIcons, IRatingProps } from "@fluentui/react"; 
import { useState, useEffect, useRef} from "react";
import {useConst} from "@uifabric/react-hooks";
//import  getStyles  from '@fluentui/react/lib/Rating';




export interface IProps {
    
    rating: number|undefined;   
    onChange: (rating:number|undefined) => void;
}


const customTheme: ITheme = createTheme(getTheme());
customTheme.palette.themeDark = "#ffbf00"; //= hover
customTheme.palette.themePrimary = "#ffbf00"; //= hover contour
customTheme.palette.neutralPrimary = "#ffbf00";   // icon color
//customTheme.palette.neutralSecondary = "#ffbf00"; // contour

const RatingControl = (props:IProps): JSX.Element => {

    //REF Object
    const componentRef = useRef<IRating>(null);
    
    //STATE VARIABLES
    const [rating, setRating] = useState<number>(props.rating ?? 0);
     
    
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
        setRating(rating ?? 0); //=> use setter to update state variable
    };

    const onClickEvent = (ev: React.MouseEvent<HTMLElement>): void => {
        console.log("Clicked : ");

        console.log("Previous: " + rating);
        if(componentRef.current !== null){
            let current:RatingBase = componentRef.current as RatingBase;
            let newRating = current.state.rating as number;
            console.log("New: " + newRating);

            setRating(newRating === rating ? 0 : newRating);
        }

    };

    //STYLES
    

    //console.log("RatingControl - Rendering : rating = " + rating)
    return (
    
        <Rating
            componentRef={componentRef}    
            min={0} 
            max={5}
            size={RatingSize.Large}
            rating={rating}            
            allowZeroStars={true}
            //onChange={onStarChange}
            onClick={onClickEvent}
            theme={customTheme}
            
        />
    );       
     
}
export default RatingControl;



