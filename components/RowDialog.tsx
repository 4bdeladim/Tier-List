import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { ColorPicker } from "./ui/ColorPicker"
import { useDispatch } from "react-redux"
import { saveRow } from "@/store/slices/tier-list"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

interface RowDialog { 
	title: string,
	defaultRowName?: string,
	rowId?: string,
	defaultBg?: string,
	onConfirm: ActionCreatorWithPayload<any, any> ,
	button: JSX.Element,
	confirmBtnTitle: string
}


const RowDialog: React.FC<RowDialog> = ({onConfirm, title, defaultBg, defaultRowName, button, rowId, confirmBtnTitle}) => {
	const [background, setBackground] = useState('#B4D455')
	const [name, setName] = useState<string>("S Tier");
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const confirm = async () => {
		const newRow:List = {bg: background, id: rowId || uuid(), items: [], title: name}
		dispatch(onConfirm(newRow))
		setOpen(false)
	}
	useEffect(() => {
		if(defaultRowName && defaultBg){
			setBackground(defaultBg)
			setName(defaultRowName)
		}
	}, [defaultRowName, defaultBg])
	return (
		<Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger onClick={() => setOpen(true)} asChild>
					{ button }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Add a new tier list row
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input onChange={(e) => setName(e.target.value)} id="title" value={name} className="col-span-3" />
          </div>
						<ColorPicker background={background} setBackground={setBackground}  />
        </div>
				<DialogFooter>
			<Button onClick={confirm} type="submit">
				{confirmBtnTitle}
			</Button>
			</DialogFooter>
        
      </DialogContent>
			
			
    </Dialog>
	)
}


export default RowDialog