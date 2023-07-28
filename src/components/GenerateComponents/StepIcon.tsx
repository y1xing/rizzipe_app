import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';

interface StepIconProps {
    active: boolean;
    completed: boolean;
    icon: React.ReactNode;
}

export default function StepIcon({ active, completed, icon }: StepIconProps) {
    const highlight: boolean = active || completed;

    return (
        <Avatar
            sx={{
        heigh: 40,
                width: 40,
                ...(highlight && {
                    backgroundColor: "#FC8745",
                    color: 'secondary.contrastText',
                })
            }}
            variant={"rounded"}
        >
            {
                completed ?
                    <CheckIcon fontSize={"small"}/>
                    :icon }
        </Avatar>
    );
}