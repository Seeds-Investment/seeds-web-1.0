import {
  Dialog as TailwindDialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  children: React.ReactNode;
  title: string
  handleClose: () => void;
  isOpen: boolean;
}

const Dialog: React.FC<Props> = ({ title, handleClose, isOpen, children }) => {

  return (
    <TailwindDialog size="xs" open={isOpen} handler={handleClose}>
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
            {title}
        </Typography>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleClose}
        >
          <XMarkIcon strokeWidth={2} className="h-5 w-5" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="overflow-y-scroll pr-2">
        {children}
      </DialogBody>
    </TailwindDialog>
  );
};

export default Dialog;
