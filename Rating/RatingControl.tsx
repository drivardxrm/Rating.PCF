import * as React from "react";
import { ITheme, createTheme, getTheme, RatingBase, Rating, RatingSize, IRating,initializeIcons } from "@fluentui/react"; 
import { useState, useEffect, useRef, useMemo, useLayoutEffect} from "react";
import {useConst} from "@uifabric/react-hooks";
import MaskedInput from "./MaskedInput"


export interface IProps {
    
    //properties
    rating: number|undefined;
    icon: string;
    unselectedicon:string;
    color: string;
    maxvalue:number;

    isReadonly:boolean,
    isMasked:boolean,

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
    },[props.color]);
    
    //CUSTOM HOOK provided by FluentUI team : https://github.com/microsoft/fluentui/tree/master/packages/react-hooks
    //Will run once on first render, like a constructor.    
    useConst(() => {
        initializeIcons();
    });
    
    //STATE HOOKS
    const [rating, setRating] = useState<number>(props.rating ?? 0);

    //EFFECT HOOKS - side effect after render
    useEffect(() => {

        //if value is different from the one received from PROPS
        //Send value back to caller (PCF)
        if(rating !== props.rating)
        {
            
            console.log("RatingControl - useEffect: => props.onChange(" + rating + ")");
            props.onChange(rating);
        }
        
    }, [rating]);  //WHEN rating changes, 
 
    //LAYOUTEFFECT HOOKS - side effect before render
    useLayoutEffect(() => {
        
        if(rating !== props.rating)
        {
            console.log("useLayoutEffect props.rating changed : " + props.rating);
            setRating(props.rating ?? 0)
        }
        
    }, [props.rating]); //Props are changed



    //EVENT Handlers
    const onStarChange = (ev: React.FocusEvent<HTMLElement>, rating?: number): void => {
        //console.log("RatingControl - onStarChanged : " + rating)
        setRating(rating ?? 0); //=> use setter to update state variable
    };

    //Hack to put value at zero if the selected value is clicked again
    const onClickEvent = (ev: React.MouseEvent<HTMLElement>): void => {
        console.log("Rating control Clicked : ");

        console.log("Previous value: " + rating);
        if(componentRef.current !== null){
            let current:RatingBase = componentRef.current as RatingBase;
            let newRating = current.state.rating ?? 0; 
            
            console.log("New value: " + newRating);
            //If newrating is the same as rating, means that the selected item was clicked => Clear the value
            //otherwise set to new value
            setRating(newRating === rating ? 0 : newRating);
        }

    };


    if(props.isMasked){
        return(
            <MaskedInput/>
        );
    }
    else{
        console.log("RatingControl - Rendering : rating = " + rating)
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
                readOnly={props.isReadonly}
                
            />
        );
    }       
     
}
export default RatingControl;



