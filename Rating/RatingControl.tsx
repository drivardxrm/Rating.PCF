import * as React from "react";
import { ITheme, createTheme, getTheme, RatingBase, Rating, RatingSize, IRating,initializeIcons, IRatingProps } from "@fluentui/react"; 
import { useState, useEffect, useRef, useMemo} from "react";
import {useConst} from "@uifabric/react-hooks";





export interface IProps {
    
    //properties
    rating: number|undefined;
    icon: string;
    unselectedicon:string;
    color: string;
    maxvalue:number;

    //return function
    onChange: (rating:number|undefined) => void;
}


const RatingControl = (props:IProps): JSX.Element => {

    //REF Object
    const componentRef = useRef<IRating>(null);

    //MEMO
    const componentTheme = useMemo<ITheme>(()=>{
        let customTheme: ITheme = createTheme(getTheme());
        customTheme.palette.themeDark = props.color; //= hover
        customTheme.palette.themePrimary = props.color; //= hover contour
        customTheme.palette.neutralPrimary = props.color;   // icon color
        return customTheme;
    },[]);
    
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
            let newRating = current.state.rating ?? 0; 
            console.log("New: " + newRating);

            setRating(newRating === rating ? 0 : newRating);
        }

    };

    //console.log("RatingControl - Rendering : rating = " + rating)
    return (
    
        <Rating
            componentRef={componentRef} 
            icon={props.icon}   
            unselectedIcon={props.unselectedicon}
            min={0} 
            max={props.maxvalue}
            size={RatingSize.Large}
            rating={rating}            
            allowZeroStars={true}
            //onChange={onStarChange}
            onClick={onClickEvent}
            theme={componentTheme}
            
        />
    );       
     
}
export default RatingControl;



