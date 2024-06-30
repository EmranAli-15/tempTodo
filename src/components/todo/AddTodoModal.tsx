import { FormEvent, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { DialogClose } from '@radix-ui/react-dialog'
import { useAppDispatch } from '../../redux/hooks'
import { addTodo } from '../../redux/features/todoSlice'
import { useAddTodoMutation } from '../../redux/api/api'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { setPriority } from 'os'

export default function AddTodoModal() {

    const [task, setTusk] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("high");

    // For local state management
    // const dispatch = useAppDispatch();

    const [addTodo, { isLoading, isSuccess, data, isError }] = useAddTodoMutation();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const randomString = Math.random().toString(36).substring(2, 7);

        const taskDetails = {
            title: task,
            description,
            isCompleted: false,
            priority
        };

        console.log(data)

        // For server
        addTodo(taskDetails);

        // For local state management
        // dispatch(addTodo(taskDetails));
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-primary-gradient">Add todo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogDescription>
                        Add your tasks that you want to finish.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="task" className="text-right">
                            Task
                        </Label>
                        <Input
                            onBlur={(e) => setTusk(e.target.value)}
                            id="task"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            onBlur={(e) => setDescription(e.target.value)}
                            id="description"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Priority
                        </Label>
                        <Select onValueChange={(value) => setPriority(value)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Priority</SelectLabel>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className='bg-primary-gradient' type="submit">ADD</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
