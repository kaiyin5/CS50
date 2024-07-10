import {
    ListItem,
    ListItemSuffix,
    IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import { ImInfo } from "react-icons/im";


export default function ListWithIcon({ task, idx }) {
    const timeText = `${task.duration >= 60 ? `${Math.floor(task.duration / 60)} hr` : ''} ${task.duration >= 60 ? task.duration % 60 : task.duration} mins`;
        return (
            <ListItem ripple={false} className="flex items-center leading-9 pt-1 pb-1 pr-1 pl-4 mt-1">
                <p><span className="font-bold">{task.name}</span> - <span className="text-sm">{timeText}</span></p>
                {/* <ListItemSuffix>
                    <IconButton variant="text" color="blue-gray" className="rounded-full">
                        <ImInfo />
                    </IconButton>
                </ListItemSuffix> */}
            </ListItem>
        );
}