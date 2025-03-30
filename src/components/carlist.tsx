import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams, themeMaterial } from "ag-grid-community";
import Button from '@mui/material/Button';
import SnackBar from '@mui/material/Snackbar';
import AddCar from "./AddCar";
import { Car } from '../types';

ModuleRegistry.registerModules([AllCommunityModule]);



export default function CarList() {
    const [cars, setCars] = useState<Car[]>([]);
    const [open, setOpen] = useState(false);

    const [columnDefs] = useState<ColDef<Car>[]>([
        { field: "brand", filter: true },
        { field: "model", filter: true, width: 150 },
        { field: "color", filter: true, width: 150 },
        { field: "fuel", filter: true, width: 120 },
        { field: "modelYear", filter: true, width: 120 },
        { field: "price", filter: true, width: 120 },
        {
            width: 110,
            cellRenderer: (params: ICellRendererParams) =>

                <Button size="small" color="error" onClick={() => handleDelete(params)}>
                    Delete
                </Button>
        }
    ]);


    const fetchCars = () => {
        fetch(import.meta.env.VITE_API_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error when fetching cars");
                }
                return response.json();
            })
            .then((data) => {

                setCars(data._embedded?.cars || []);
            })
            .catch((err) => console.error("Fetch error: ", err));
    };

    const handleDelete = (params: ICellRendererParams) => {
        if (window.confirm("Are you sure")) {
            fetch(params.data._links.car.href, {
                method: "DELETE"
            })
                .then(Response => {
                    if (!Response.ok)
                        throw new Error("Error when deleting car");

                    return Response.json

                })
                .then(() => fetchCars())
                .then(() => setOpen(true))
                .catch(err => console.error(err))
        }
    }


    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <>
            <AddCar fetchCars={fetchCars} />
            <div style={{ width: "90%", height: 500 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    theme={themeMaterial}
                />
            </div>
            <SnackBar
                open={open}
                autoHideDuration={300}
                onClose={() => setOpen(false)}
                message="Car deleted successfully"
            />
        </>
    );
}
