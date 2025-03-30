import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Car } from '../types';

type AddCarProps = {
    fetchCars: () => void;
}

export default function AddCar(props: AddCarProps) {
    const [car, setCar] = useState<Car>({} as Car);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        fetch(import.meta.env.VITE_API_URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("error when adding a new car")

                return response.json
            })
            .then(() => props.fetchCars)
            .then(() => handleClose)
            .catch(err => console.error(err))
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add car
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add a new car</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        onChange={event => setCar({ ...car, brand: event.target.value })}
                        label="Brand"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="model"
                        value={car.model}
                        onChange={event => setCar({ ...car, model: event.target.value })}
                        label="model"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="color"
                        value={car.color}
                        onChange={event => setCar({ ...car, color: event.target.value })}
                        label="color"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        onChange={event => setCar({ ...car, fuel: event.target.value })}
                        label="fuel"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="modelYear"
                        type="number"
                        value={car.modelYear}
                        onChange={event => setCar({ ...car, modelYear: Number(event.target.value) })}
                        label="model year"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="price"
                        type="number"
                        value={car.price}
                        onChange={event => setCar({ ...car, price: Number(event.target.value) })}
                        label="price (€)"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleSave()}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
