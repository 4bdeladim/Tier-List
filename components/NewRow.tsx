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
import { useState } from "react"
import { v4 as uuid } from "uuid"
import { ColorPicker } from "./ui/ColorPicker"
import { useDispatch } from "react-redux"
import { saveRow } from "@/store/slices/tier-list"
const NewRow: React.FC = () => {
	const [background, setBackground] = useState('#B4D455')
	const [name, setName] = useState<string>("S Tier");
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const addRow = async () => {
		const newRow:List = {bg: background, id: uuid(), items: [], title: name}
		dispatch(saveRow(newRow))
		setOpen(false)
	}
	return (
		<Dialog open={open} >
      <DialogTrigger asChild>
				<Button className="self-end flex justify-center gap-2" onClick={() => setOpen(true)}>
					New Row <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="white" fillRule="evenodd" clipRule="evenodd"></path></svg>
				</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create row</DialogTitle>
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
			<Button onClick={addRow} type="submit">
				Add
			</Button>
			</DialogFooter>
        
      </DialogContent>
			
			
    </Dialog>
	)
}


export default NewRow