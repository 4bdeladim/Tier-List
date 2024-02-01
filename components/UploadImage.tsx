"use client"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { Button } from "./ui/button";

interface UploadImageProps {
  setImages: ActionCreatorWithPayload<DroppableItem[]>
}
const UploadImage: React.FC<UploadImageProps> = ({ setImages }) => {
	const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const toBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result?.toString() || '');
			reader.onerror = (error) => reject(error);
		});
	};

  const openInputFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.click();
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const base64Images = await Promise.all(
        selectedFiles.map(async (file) => { return { img: await toBase64(file), id: uuid() } })
      );
      dispatch(setImages(base64Images))
    }
  };


  return (
    <div className="flex flex-col items-center mt-4">
      <form className="flex flex-col items-center">
        <div className="mb-4">
          <div className="relative flex justify-center">
            <input
              onChange={handleImageChange}
              className="border-gray-300 focus:ring-blue-600 block w-full overflow-hidden cursor-pointer border text-gray-800 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
              id="view_model_avatar"
              name="image"
              type="file"
              ref={inputRef}
              style={{ display: "none" }}
              multiple
            />
            <Button onClick={openInputFile} className="flex items-center gap-4">
						Upload Images
							<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="white" fillRule="evenodd" clipRule="evenodd"></path></svg>
              
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadImage;
