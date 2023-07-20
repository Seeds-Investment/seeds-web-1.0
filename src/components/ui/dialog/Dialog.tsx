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
  bottomSheetOnSmall?: boolean
}

const Dialog: React.FC<Props> = ({ title, handleClose, isOpen, children, bottomSheetOnSmall=false }) => {
  const minWidth='400px';
  const maxWidth='420px';

  const bottomSheetOnSmallClass = `backdrop-blur-sm max-h-[90vh] self-end mb-0 sm:self-center sm:mb-4 max-w-full sm:min-w-[${minWidth}] sm:max-w-[${maxWidth}] md:min-w-[${minWidth}] md:max-w-[${maxWidth}] lg:min-w-[${minWidth}] lg:max-w-[${maxWidth}] xl:min-w-[${minWidth}] xl:max-w-[${maxWidth}] 2xl:min-w-[${minWidth}] 2xl:max-w-[${maxWidth}]`

  return (
    <TailwindDialog
      size="md"
      className={bottomSheetOnSmall ? bottomSheetOnSmallClass : undefined}
      open={isOpen}
      handler={handleClose}
    >
      <DialogHeader className="justify-between w-full">
        <Typography className="text-[#262626] text-md font-semibold">
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
