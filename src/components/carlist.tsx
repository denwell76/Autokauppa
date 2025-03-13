import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);


type Car = {
    brand: string;
    model: string;
    color: string;
    fuel: string;
    modelYear: number;
    price: number;
};

export default function CarList() {
    const [cars, setCars] = useState<Car[]>([]);

    const [columnDefs] = useState<ColDef<Car>[]>([
        { field: "brand", filter: true },
        { field: "model", filter: true  },
        { field: "color", filter: true  },
        { field: "fuel", filter: true , width: 150 },
        { field: "modelYear" , filter: true , width: 120},
        { field: "price" , filter: true , width: 120},
    ]);


    const fetchCars = () => {
        fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars") 
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


    useEffect(() => {
        fetchCars();
    }, []); 

    return (
        <div style={{ width: "90%", height: 500 }}>
            <AgGridReact
                rowData={cars} 
                columnDefs={columnDefs} 
                pagination ={true}
                paginationAutoPageSize={true}
            />
        </div>
    );
}
