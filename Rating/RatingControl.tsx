/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import {
   ITheme,
   createTheme,
   getTheme,
   RatingBase,
   Rating,
   RatingSize,
   initializeIcons,
} from "@fluentui/react";
import { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";
import { useConst } from "@uifabric/react-hooks";
import MaskedInput from "./MaskedInput";

export interface IRatingControlProps {
   //properties : PCF =>
   rating: number | undefined;
   icon: string;
   unselectedicon: string;
   color: string;
   maxvalue: number;

   isReadonly: boolean;
   isMasked: boolean;

   //Callback function : => PCF
   onChange: (rating: number | undefined) => void;
}

const RatingControl = (props: IRatingControlProps): JSX.Element => {
   //REF Object
   const ratingRef = useRef<RatingBase>(null);

   //MEMO
   const componentTheme = useMemo<ITheme>(() => {
      console.log("useMemo : custom theme");
      const customTheme: ITheme = createTheme(getTheme());
      customTheme.palette.themeDark = props.color; //= hover
      customTheme.palette.themePrimary = props.color; //= hover contour
      customTheme.palette.neutralPrimary = props.color; // icon color
      return customTheme;
   }, [props.color]);

   //CUSTOM HOOK provided by FluentUI team :
   // https://github.com/microsoft/fluentui/tree/master/packages/react-hooks
   //Will run function once on first render, like a constructor.
   useConst(() => {
      console.log("useConst : initilize icons");
      initializeIcons();
   });

   //STATE HOOKS
   const [rating, setRating] = useState<number | undefined>(props.rating);

   //EFFECT HOOKS - side effect after render
   useEffect(() => {
      //if value is different from the one received from PROPS
      //Send value back to caller (PCF)
      if (rating !== props.rating) {
         console.log("useEffect: => props.onChange(" + rating + ")");
         props.onChange(rating);
      }
   }, [rating]); //WHEN rating changes,

   useEffect(() => {
      if (rating !== props.rating) {
         console.log("useEffect props.rating changed : " + props.rating);
         setRating(props.rating);
      }
   }, [props.rating]); //Props are changed

   //EVENT Handlers
   // const onChangeEvent = (ev: React.FocusEvent<HTMLElement>, newrating?: number): void => {
   //    //console.log("RatingControl - onStarChanged : " + rating)
   //    setRating(newrating); //=> use setter to update state variable
   // };

   //Hack to put value at zero if the selected value is clicked again
   const onClickEvent = (ev: React.MouseEvent<HTMLElement>): void => {
      if (ratingRef.current !== null) {
         
         const clickedRating = ratingRef.current.state.rating || undefined;

         console.log("CLICK : Previous value: " + rating + ", New value: " + clickedRating);
         //If clickedRating is the same as rating, means that the selected item was clicked => Clear the value
         //otherwise set to new value
         const newRating = clickedRating === rating ? undefined : clickedRating;

         setRating(newRating);
      }
   };

   if (props.isMasked) {
      return <MaskedInput />;
   } else {
      console.log("-->Component Rendering : rating = " + rating);
      return (
         <Rating
            componentRef={ratingRef}
            icon={props.icon}
            unselectedIcon={props.unselectedicon}
            min={0}
            max={props.maxvalue}
            size={RatingSize.Large}
            rating={rating ?? 0}
            allowZeroStars={true}
            //onChange={onChangeEvent}
            onClick={onClickEvent}
            theme={componentTheme}
            readOnly={props.isReadonly}
         />
      );
   }
};
export default RatingControl;
