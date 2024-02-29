"use client"
import React, { useState } from "react";
import {
    Grid,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton
} from "@mui/material";
import style from "./Table.module.css";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import { message } from "antd";

const CustomTable = ({ tableData, tableHead, element, refetch }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editedItem, setEditedItem] = useState(null);

    const handleEditClick = (data) => {
        setSelectedItem(data);
        setEditedItem({ ...data });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleTextFieldChange = (e, field) => {
        setEditedItem({ ...editedItem, [field]: e.target.value });
    };

    const handleSaveChanges = async () => {
        try {
            const res = await axios.patch(`order/${editedItem._id}`, editedItem);
          
            if (res.data.success) {
                message.success("Quantity Updated Succesfully");
                refetch();
                handleCloseDialog();
            }
        } catch (error) {
            console.error("Error while PATCH request:", error);
        }
    };

    return (
        <Grid
            container
            sx={{
                bgcolor: "white",
                p: 1,
                position: "relative",
            }}
        >
            <table id={style.table}>
                <tbody>
                    <tr>
                        <th>No</th>
                        {tableHead?.map((data, index) => (
                            <th key={index}>{data}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                    {tableData?.map((data, index) => (
                        <tr key={index} style={{ cursor: "pointer" }}>
                            <td style={{ fontWeight: "bold" }}>{index + 1}</td>
                            {element.map((el, index) => (
                                <td key={index}>{data[el]}</td>
                            ))}
                            <td>
                                <IconButton>
                                    <EditIcon sx={{ color: "green" }} onClick={() => handleEditClick(data)} />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EditDialog
                open={openDialog}
                onClose={handleCloseDialog}
                item={selectedItem}
                editedItem={editedItem}
                onTextFieldChange={handleTextFieldChange}
                onSaveChanges={handleSaveChanges}
            />
        </Grid>
    );
};

const EditDialog = ({ open, onClose, item, editedItem, onTextFieldChange, onSaveChanges }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogContent>
                <Typography>Editing Item: {item && item.name}</Typography>
                <TextField
                    label="Quantity"
                    value={editedItem && editedItem.name}
                    onChange={(e) => onTextFieldChange(e, 'quantity')}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onSaveChanges}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomTable;
