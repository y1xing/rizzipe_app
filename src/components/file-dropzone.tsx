import { useDropzone } from 'react-dropzone';
import { FC } from "react";
import {
    Box,
    Button,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import { bytesToSize } from "../utils/bytes-to-size";
import { fileToBase64 } from "../utils/file-to-base64"
import File from "react-dropzone";
import Image from "next/image";

interface File {
    path: string;
    name: string;
    size: number;
}

interface FileDropzoneProps {
    files?: File[];
    onRemove?: (file: File) => void;
    onRemoveAll?: () => void;
    onUpload?: () => void;
    accept?: Record<string, string[]>;
    disabled?: boolean;
    getFilesFromEvent?: () => void;
    maxFiles?: number;
    maxSize?: number;
    minSize?: number;
    noClick?: boolean;
    noDrag?: boolean;
    noDragEventsBubbling?: boolean;
    noKeyboard?: boolean;
    onDrop?: () => void;
    onDropAccepted?: () => void;
    onDropRejected?: () => void;
    onFileDialogCancel?: () => void;
    preventDropOnDocument?: boolean;
}

export const FileDropzone: FC<FileDropzoneProps> = (props) => {
    const {
        // Own props
        files = [],
        onRemove,
        onRemoveAll,
        onUpload,
        // DropzoneOptions props
        accept,
        disabled,
        getFilesFromEvent,
        maxSize,
        minSize,
        // multiple,
        maxFiles,
        // onDragEnter,
        // onDragLeave,
        // onDragOver,
        onDrop,
        onDropAccepted,
        onDropRejected,
        onFileDialogCancel,
        // onFileDialogOpen,
        // useFsAccessApi,
        // autoFocus,
        preventDropOnDocument,
        noClick,
        noKeyboard,
        noDrag,
        noDragEventsBubbling,
        // onError,
        // validator,
        ...other
    } = props;

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        maxFiles,
        maxSize,
        minSize,
        onDrop
    });

    return (
        <div {...other}>
            <Box
                sx={{
                    alignItems: 'center',
                    border: 1,
                    borderRadius: 1,
                    borderStyle: 'dashed',
                    borderColor: 'divider',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    outline: 'none',
                    width: '600px',
                    p: 6,
                    ...(isDragActive && {
                        backgroundColor: 'action.active',
                        opacity: 0.5
                    }),
                    '&:hover': {
                        backgroundColor: 'action.hover',
                        cursor: 'pointer',
                        opacity: 0.5
                    }
                }}
                {...getRootProps()}>
                <input {...getInputProps()} />
                <Box
                    sx={{
                        '& img': {
                            width: 100
                        }
                    }}
                >
                    <Image
                        alt="Select file"
                        src="/static/undraw_add_file2_gvbb.svg"
                        width={100}
                        height={100}
                    />
                </Box>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6">
                        {`Select file${(maxFiles && maxFiles === 1) ? '' : 's'}`}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1">
                            {`Drop file${(maxFiles && maxFiles === 1) ? '' : 's'}`}
                            {' '}
                            <Link underline="always">
                                browse
                            </Link>
                            {' '}
                            thorough your machine
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {files.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <List>
                        {files.map((file) => (
                            <ListItem
                                key={file.path}
                                sx={{
                                    border: 1,
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    '& + &': {
                                        mt: 1
                                    }
                                }}
                            >
                                <ListItemIcon>
                                    <ContentCopyIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={file.name}
                                    primaryTypographyProps={{
                                        color: 'textPrimary',
                                        variant: 'subtitle2'
                                    }}
                                    secondary={bytesToSize(file.size)}
                                />
                                <Tooltip title="Remove">
                                    <IconButton
                                        edge="end"
                                        onClick={() => onRemove?.(file)}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </ListItem>
                        ))}
                    </List>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            mt: 2
                        }}
                    >
                        <Button
                            onClick={onRemoveAll}
                            size="small"
                            type="button"
                        >
                            Remove All
                        </Button>

                    </Box>
                </Box>
            )}
        </div>
    );
};


// Path: src/components/file-dropzone.tsx

    