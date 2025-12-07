import React from "react";
import { getAppointments } from "../utils/storage";


export default function StoragePage() {
const apps = getAppointments();


return (
<div className="page-container">
<h2>Stored Data</h2>
<pre>{JSON.stringify(apps, null, 2)}</pre>
</div>
);
}