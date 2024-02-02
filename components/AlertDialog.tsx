"use client"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import React from "react"
import { useDispatch } from "react-redux"
interface AlertDialogProps { 
	title: string,
	description: string,
	onConfirm: ActionCreatorWithPayload<any, any> ,
	params?: any,
	button: JSX.Element ,
}
const AlertDialogComponent:React.FC<AlertDialogProps> = ({title, description, onConfirm, params, button}) => {
	const dispatch = useDispatch();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        { button }
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => dispatch(onConfirm(params))} >Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertDialogComponent